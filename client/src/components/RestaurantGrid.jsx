import React from 'react';
import RestaurantCard from './RestaurantCard';
import SkeletonCard from './SkeletonCard';
import { Search } from 'lucide-react';

const RestaurantGrid = ({ restaurants, isLoading, onReset }) => {
  if (isLoading) {
    return (
      <div className="restaurant-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={`skel-${i}`} index={i} />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="empty-state-container fade-in-up">
        <div className="empty-state-icon">
          <Search size={64} />
        </div>
        <h3 className="empty-state-title">No matching restaurants found</h3>
        <p className="empty-state-text">
          We couldn't find anything matching those filters. Try broadening your search or resetting constraints.
        </p>
        {onReset && (
          <button className="btn-outline" onClick={onReset}>
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="restaurant-grid">
      {restaurants.map((res, i) => (
        <RestaurantCard 
          key={`${res.name}-${res.location}-${i}`} 
          restaurant={res} 
          index={i}
        />
      ))}
    </div>
  );
};

export default RestaurantGrid;
