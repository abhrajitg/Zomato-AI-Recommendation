# Food Tech AI Recommender (Sushi Edition)

A high-fidelity, vibe-coded restaurant discovery platform inspired by Zomato's **Sushi Design System**. Powered by the **Groq Llama-3.3-70b** model for intelligent, context-aware dining recommendations.

## ✨ Features

- **Sushi Sticky Header**: Impeccable navigation with scroll-state micro-interactions.
- **High-Scale Search Engine**: lightning-fast filtering across 12,000+ Bangalore restaurants.
- **Zomato AI Concierge**: Proactive "Top Picks" generated based on your locality, cuisine, and budget.
- **High-Density Sidebar**: Minimalist, space-efficient filter modules for professional discovery.
- **Elite Badge System**: Real-time AI recommendation badges and rating indicators.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Lucide-React, CSS3 (Sushi Standard).
- **Backend**: Node.js, Express, Groq SDK.
- **AI Model**: Llama-3-3-70b-versatile (via Groq).
- **Data**: Zomato Bangalore Dataset (https://huggingface.co/datasets/ManikaSaini/zomato-restaurant-recommendation).

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- A Groq API Key ([Get one here](https://console.groq.com/))

### 2. Installation
Clone this repository and run the unified installer from the root:
```bash
npm run install:all
```

### 3. Configuration
Navigate to the `/server` directory and set up your environment variables:
```bash
cd server
cp .env.example .env
# Open .env and add your GROQ_API_KEY
```

### 4. Launch
Run the entire platform (Client + Server) with one command from the project root:
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

  


https://github.com/user-attachments/assets/af22d1ea-d566-4210-8078-f748e17a4c2d




## 📂 Project Structure

- `/client`: React frontend containing the Sushi component library.
- `/server`: Node.js Express proxy with the local search engine and AI pipeline.
- `/server/data`: Curated Zomato dataset in JSON format.

## 🍱 Design Principles
This project strictly adheres to the Zomato Sushi Design System, focusing on:
- **Clean Typography**: High contrast hierarchy using Outfit/Inter.
- **Zomato Red (#E23744)**: Precise brand color application.
- **High Information Density**: Production-ready data layouts.

---
*Developed with ❤️ for the next generation of food discovery.*
