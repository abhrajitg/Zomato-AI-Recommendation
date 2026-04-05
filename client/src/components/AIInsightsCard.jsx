import React from 'react';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

const AIInsightsCard = ({ recommendations, isLoading, error }) => {
  if (error) {
    return (
      <div className="filter-card" style={{ border: '1px solid #FFEBEB', background: '#FFF5F5' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--zomato-red)' }}>
          <Sparkles size={20} />
          <span style={{ fontWeight: '600' }}>AI Concierge Offline</span>
        </div>
        <p style={{ fontSize: '13px', marginTop: '8px', color: 'var(--zomato-gray-med)' }}>
          {error}. Please check your backend connection and GROQ_API_KEY.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="filter-card" style={{ border: '1px dashed var(--zomato-red)', background: 'rgba(226, 55, 68, 0.02)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Sparkles size={20} color="var(--zomato-red)" className="animate-pulse" />
          <span style={{ fontWeight: '600' }}>AI is analyzing the menu...</span>
        </div>
        <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '2px', marginTop: '16px', overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', background: 'var(--zomato-red)' }}></div>
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="filter-card" style={{ background: 'linear-gradient(135deg, #FFF5F6 0%, #FFFFFF 100%)', border: '1px solid #FFD1D6' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Sparkles size={22} color="var(--zomato-red)" fill="var(--zomato-red)" />
          <span style={{ fontWeight: '700', fontSize: '18px' }}>Zomato AI Top Picks</span>
        </div>
        <div className="live-insights-pill">
          <div className="live-dot"></div>
          <span className="live-text">Live Insights</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {recommendations.map((rec, j) => (
          <div key={j} style={{ borderLeft: '3px solid var(--zomato-red)', paddingLeft: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontWeight: '700', fontSize: '15px' }}>{rec.catchy_title || rec.name}</span>
              {rec.original_name && (
                <span style={{ fontSize: '11px', color: 'var(--zomato-gray-light)', fontStyle: 'italic' }}>
                  {rec.original_name}
                </span>
              )}
              <span style={{ fontSize: '10px', color: 'var(--zomato-red)', background: 'rgba(226, 55, 68, 0.08)', padding: '1px 8px', borderRadius: '4px', fontWeight: '600' }}>
                {rec.badge}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--zomato-gray-med)', lineHeight: '1.4' }}>
              {rec.reason}
            </p>
          </div>
        ))}
      </div>

      <button
        style={{
          marginTop: '20px',
          width: '100%',
          padding: '10px',
          background: 'white',
          border: '1px solid var(--zomato-border)',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        View Full Analysis <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default AIInsightsCard;
