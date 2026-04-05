import React, { useState, useEffect } from 'react';
import SearchableDropdown from './components/SearchableDropdown';
import CuisineTagger from './components/CuisineTagger';
import PriceFilter from './components/PriceFilter';
import RestaurantGrid from './components/RestaurantGrid';
import AIInsightsCard from './components/AIInsightsCard';
import { MapPin, Search, Sparkles, Navigation, Info, Utensils, Bike, GlassWater } from 'lucide-react';

// PRODUCTION API CONFIGURATION
const API_BASE_URL = 'http://localhost:3001';

const App = () => {
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localities, setLocalities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Phase 11: Locality Discovery from Backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/localities`)
      .then(res => res.json())
      .then(data => setLocalities(data))
      .catch(err => console.error("Locality fetch error:", err));
  }, []);

  // Sushi Sticky Micro-Interaction Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Phase 11: High-Scale Data Fetcher (Server-Side Filtering)
  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (selectedLocality) params.append('location', selectedLocality);
    selectedCuisines.forEach(c => params.append('cuisines', c));
    selectedPriceRanges.forEach(p => params.append('priceRanges', p));

    fetch(`${API_BASE_URL}/api/restaurants?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setIsLoading(false)
      })
      .catch(err => {
        console.error("Restaurant fetch error:", err);
        setIsLoading(false);
      });
  }, [selectedLocality, selectedCuisines, selectedPriceRanges]);

  // Phase 9: Auto-Clear AI Picks on filter change
  useEffect(() => {
    setAiRecommendations([]);
  }, [selectedLocality, selectedCuisines, selectedPriceRanges]);

  const resetFilters = () => {
    setSelectedLocality("");
    setSelectedCuisines([]);
    setSelectedPriceRanges([]);
  };

  const getAIRecommendations = async () => {
    if (restaurants.length === 0) return;
    setIsAILoading(true);
    setAiError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topRestaurants: restaurants.slice(0, 10), 
          userContext: { 
            location: selectedLocality || "Bangalore",
            cuisines: selectedCuisines,
            priceRanges: selectedPriceRanges
          }
        })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      const aiMapped = restaurants.map(res => {
        const recData = data.recommendations.find(r => {
          const names = [r.original_name, r.catchy_title, r.name].filter(Boolean).map(n => n.toLowerCase().trim());
          const n = res.name.toLowerCase().trim();
          return names.some(an => n === an || n.includes(an) || an.includes(n));
        });
        return { 
          ...res, 
          isAIRecommended: !!recData, 
          aiBadgeText: recData?.badge || "Top Pick" 
        };
      });

      const sortedByAI = [...aiMapped].sort((a, b) => {
        if (a.isAIRecommended && !b.isAIRecommended) return -1;
        if (!a.isAIRecommended && b.isAIRecommended) return 1;
        return 0;
      });

      setRestaurants(sortedByAI);
      setAiRecommendations(data.recommendations);
    } catch (err) {
      setAiError(err.message || "Failed to connect to AI server");
    } finally {
      setIsAILoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '80px', maxWidth: '1100px' }}>
      
      {/* SUSHI STICKY NAV REENGINEERED FOR PRODUCTION */}
      <div className={`z-sticky-wrapper ${isScrolled ? 'sticky-scrolled' : ''}`}>
        <nav className={`zomato-navbar fade-in-up stagger-1 ${isScrolled ? 'compact' : ''}`}>
          <div className="z-logo">
            <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="Zomato" />
          </div>
          
          <div className="combined-search-container">
            <div className="loc-input-group">
              <MapPin size={20} color="#ff7e8b" fill="#ff7e8b" style={{ opacity: 0.8 }} />
              <span style={{ fontSize: '14px', color: '#1c1c1c' }}>Bangalore</span>
            </div>
            <div className="search-input-group">
              <Search size={18} color="#9c9c9c" />
              <input type="text" placeholder="Search for restaurant, cuisine or a dish" />
            </div>
          </div>

          <div className="auth-links">
            <a href="#">Log in</a>
            <a href="#">Sign up</a>
          </div>
        </nav>
      </div>

      <div className="breadcrumb-container fade-in-up stagger-2">
        <a href="#">Home</a> / <a href="#">India</a> / <span style={{ color: '#1c1c1c' }}>Bangalore Restaurants</span>
      </div>

      <div className="category-tabs-container fade-in-up stagger-3">
        <div className="category-tab active">
          <div className="tab-icon-outer">
            <Utensils size={30} color="#ff7e8b" />
          </div>
          <span>Dining Out</span>
        </div>
        <div className="category-tab">
          <div className="tab-icon-outer">
            <Bike size={30} color="#9C9C9C" />
          </div>
          <span>Delivery</span>
        </div>
        <div className="category-tab">
          <div className="tab-icon-outer">
            <GlassWater size={30} color="#9C9C9C" />
          </div>
          <span>Nightlife</span>
        </div>
      </div>

      <div className="app-layout" style={{ marginTop: '20px' }}>
        <aside className="sidebar fade-in-up stagger-4">
          <div style={{ padding: '0 5px 15px', borderBottom: '1px solid #f0f0f0', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: '500' }}>Filters</span>
          </div>

          <div className="filter-card">
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F4F4F', display: 'block', marginBottom: '10px' }}>Locality</span>
            <SearchableDropdown
              options={localities}
              selected={selectedLocality}
              onSelect={setSelectedLocality}
              placeholder="Search city/locality..."
            />
          </div>

          <div className="filter-card">
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F4F4F', display: 'block', marginBottom: '10px' }}>Cuisines</span>
            <CuisineTagger
              tags={selectedCuisines}
              onTagsChange={setSelectedCuisines}
            />
          </div>

          <div className="filter-card">
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F4F4F', display: 'block', marginBottom: '12px' }}>Price for two</span>
            <PriceFilter
              selectedRanges={selectedPriceRanges}
              onRangeChange={setSelectedPriceRanges}
            />
          </div>

          <AIInsightsCard
            recommendations={aiRecommendations}
            isLoading={isAILoading}
            error={aiError}
          />

          <button
            className="btn-primary"
            onClick={getAIRecommendations}
            disabled={isAILoading || restaurants.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '5px',
              background: '#EF4F5F',
              borderRadius: '8px',
              padding: '12px',
              color: 'white',
              border: 'none',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={18} />
            {isAILoading ? "Discovering..." : "Get AI Recommendations"}
          </button>

          <div style={{ padding: '16px', background: 'rgba(226, 55, 68, 0.05)', borderRadius: '12px', display: 'flex', gap: '12px', border: '1px dashed var(--zomato-red)', marginTop: '20px' }}>
            <Info size={24} color="var(--zomato-red)" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '13px', color: 'var(--zomato-gray-dark)' }}>
              <strong>AI Recommendation:</strong> Top Picks are generated based on your locality & cuisine choice.
            </p>
          </div>
        </aside>

        <main className="main-content fade-in-up stagger-5">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '500' }}>{selectedLocality || "All Bangalore"} Restaurants</h2>
            {!isLoading && (
              <span style={{ fontSize: '14px', color: 'var(--zomato-gray-light)' }}>
                {restaurants.length} results found
              </span>
            )}
          </div>
          
          <RestaurantGrid 
            restaurants={restaurants} 
            isLoading={isLoading} 
            onReset={resetFilters}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
