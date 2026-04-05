import React from 'react';
import { MapPin, Navigation, Sparkles } from 'lucide-react';

const RestaurantCard = ({ restaurant, index }) => {
  const isAIRecommended = restaurant.isAIRecommended;
  
  // Staggered delay for the entrance animation (cycles 1-8)
  const staggerClass = `stagger-${(index % 8) + 1}`;

  // Consistent placeholders
  const getCuisineImage = (cuisines) => {
    const main = cuisines[0]?.toLowerCase() || "";
    if (main.includes('pizza') || main.includes('italian')) return "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400";
    if (main.includes('burger') || main.includes('fast')) return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400";
    if (main.includes('north') || main.includes('indian')) return "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=400";
    if (main.includes('chinese') || main.includes('asian')) return "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=400";
    if (main.includes('cafe') || main.includes('beverage')) return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400";
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400";
  };

  return (
    <div className={`restaurant-card fade-in-up ${staggerClass} ${isAIRecommended ? 'ai-highlight' : ''}`}>
      <div className="card-image-container">
        <img 
          src={getCuisineImage(restaurant.cuisines)} 
          alt={restaurant.name} 
          loading="lazy"
        />
        {isAIRecommended && (
          <div className="ai-medal-wrapper premium-badge">
            <div className="ai-medal-circle medal-glow">
              <Sparkles size={14} fill="#FFD700" color="#FFD700" />
              <div className="ai-ribbons-luxury">
                <div className="luxury-ribbon left"></div>
                <div className="luxury-ribbon right"></div>
              </div>
            </div>
            <div className="ai-label-pill label-glass">
              {restaurant.aiBadgeText || "Top Pick"}
            </div>
          </div>
        )}
        {restaurant.rating > 0 && (
          <div className="card-rating-badge">{restaurant.rating} ★</div>
        )}
      </div>
      <div className="card-info">
        <div className="card-header">
          <div className="card-title">{restaurant.name}</div>
          <div style={{ color: 'var(--zomato-gray-dark)', fontSize: '13px', fontWeight: '500' }}>
            ₹{restaurant.price_for_two} for two
          </div>
        </div>
        <div className="card-cuisine">
          {restaurant.cuisines.slice(0, 3).join(", ")}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--zomato-gray-med)', marginBottom: '12px' }}>
          <MapPin size={12} />
          {restaurant.location}
        </div>
        <div className="card-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--zomato-gray-med)' }}>
            <Navigation size={12} />
            2.3 km away
          </div>
          {restaurant.table_booking ? (
            <div style={{ color: 'var(--zomato-success)', fontWeight: '500' }}>Book Table</div>
          ) : (
            <div style={{ color: 'var(--zomato-gray-light)' }}>Walk-in only</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
