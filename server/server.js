import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Phase 22: High-Scale Data Loading (Production Path)
let restaurants = [];
try {
  const dataPath = path.join(__dirname, 'data', 'zomato_full_cleaned.json');
  restaurants = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log(`💎 PRODUCTION LOAD: ${restaurants.length} unique restaurants in memory.`);
} catch (err) {
  console.error("❌ CRTIFICAL: Failed to load Zomato dataset in production:", err.message);
}

// Init Groq check
const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) return null;
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

// System Prompt for Zomato AI
const ZOMATO_SYSTEM_PROMPT = `
You are the Zomato AI Concierge, a premium, high-energy foodie expert. 
Your task is to review a provided list of top filtered restaurants and select exactly 3 to "WOW" the user with.

For each of the 3 selected restaurants, provide:
1. catchy_title: A creative, emoji-rich headline (e.g., "🍽️ The Continental King").
2. original_name: The EXACT name of the restaurant as provided in the list (CRITICAL for system matching).
3. badge: A short 1-2 word "Foodie Badge" (e.g., "Trending", "Spicy Expert").
4. reason: A 1-sentence catchy justification emphasizing why it's a top pick.

Return the result as a valid JSON object with a single "recommendations" key:
{
  "recommendations": [
    { "catchy_title": "...", "original_name": "...", "badge": "...", "reason": "..." }
  ]
}
Do not include any other text except the JSON.
`;

// NEW: Localities Discovery API
app.get('/api/localities', (req, res) => {
  const locations = [...new Set(restaurants.map(r => r.location))].sort();
  res.json(locations);
});

// NEW: High-Scale Search API
app.get('/api/restaurants', (req, res) => {
  let { location, cuisines, priceRanges, limit = 50 } = req.query;
  
  let filtered = restaurants;

  // 1. Locality Filter
  if (location) {
    filtered = filtered.filter(r => r.location === location);
  }

  // 2. Cuisine Filter
  if (cuisines) {
    const tags = Array.isArray(cuisines) ? cuisines : [cuisines];
    filtered = filtered.filter(r => 
      tags.some(tag => r.cuisines.some(c => c.toLowerCase().includes(tag.toLowerCase())))
    );
  }

  // 3. Price Filter
  if (priceRanges) {
    const ranges = Array.isArray(priceRanges) ? priceRanges : [priceRanges];
    filtered = filtered.filter(r => {
      return ranges.some(rangeId => {
        if (rangeId === 'low') return r.price_for_two <= 500;
        if (rangeId === 'mid') return r.price_for_two > 500 && r.price_for_two <= 1000;
        if (rangeId === 'high') return r.price_for_two > 1000;
        return true;
      });
    });
  }

  // 4. Sort by Rating
  filtered.sort((a, b) => b.rating - a.rating);

  res.json(filtered.slice(0, parseInt(limit)));
});

app.post('/api/recommend', async (req, res) => {
  const { topRestaurants, userContext } = req.body;
  const groq = getGroqClient();

  if (!groq) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured on the backend. Please add it to your .env file." });
  }

  if (!topRestaurants || topRestaurants.length === 0) {
    return res.status(400).json({ error: "No restaurants provided for recommendation." });
  }

  try {
    const { location, cuisines, priceRanges } = userContext;
    const cuisineContext = cuisines.length > 0 ? `the user is craving ${cuisines.join(", ")}` : "any cuisine";
    const priceContext = priceRanges.length > 0 ? `with a budget of ${priceRanges.join(", ")}` : "any budget";

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: ZOMATO_SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `In ${location}, ${cuisineContext} ${priceContext}. Based on these filters, here are the top matching restaurants: ${JSON.stringify(topRestaurants.slice(0, 10))}. 
          
          Select the absolute best 3 "Top Picks" and provide your specialized reasoning.`
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);
    res.json(aiResponse);

  } catch (error) {
    console.error("AI Recommendation Error:", error);
    res.status(504).json({ error: "AI failed to generate insights." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Zomato AI Production Backend listening at http://localhost:${port}`);
});
