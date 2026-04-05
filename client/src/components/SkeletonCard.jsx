import React from 'react';

const SkeletonCard = ({ index }) => {
  // Staggered delay for the animation
  const staggerClass = `stagger-${(index % 8) + 1}`;

  return (
    <div className={`restaurant-card fade-in-up ${staggerClass}`}>
      <div className="card-image-container shimmer-bg">
        {/* Shimmer Image Placeholder */}
      </div>
      <div className="card-info">
        <div className="card-header">
          <div className="skeleton-text shimmer-bg" style={{ width: '70%', height: '20px' }}></div>
          <div className="skeleton-text shimmer-bg" style={{ width: '40px', height: '18px' }}></div>
        </div>
        <div className="skeleton-text shimmer-bg" style={{ width: '90%' }}></div>
        <div className="skeleton-text shimmer-bg" style={{ width: '50%' }}></div>
        <div className="card-footer" style={{ borderTop: 'none', padding: 0 }}>
          <div className="skeleton-text shimmer-bg" style={{ width: '30%', marginTop: '10px' }}></div>
          <div className="skeleton-text shimmer-bg" style={{ width: '40%', marginTop: '10px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
