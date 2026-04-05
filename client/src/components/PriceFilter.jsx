import React from 'react';

const PriceFilter = ({ selectedRanges, onRangeChange }) => {
  const ranges = [
    { label: "Less than ₹500", min: 0, max: 500, id: "low" },
    { label: "Between ₹501 - ₹1000", min: 501, max: 1000, id: "mid" },
    { label: "More than ₹1000", min: 1001, max: 100000, id: "high" }
  ];

  const handleToggle = (id) => {
    if (selectedRanges.includes(id)) {
      onRangeChange(selectedRanges.filter(r => r !== id));
    } else {
      onRangeChange([...selectedRanges, id]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {ranges.map((range) => (
        <label
          key={range.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <input
            type="checkbox"
            checked={selectedRanges.includes(range.id)}
            onChange={() => handleToggle(range.id)}
            style={{
              accentColor: 'var(--zomato-red)',
              width: '16px',
              height: '16px',
              cursor: 'pointer'
            }}
          />
          <span style={{ color: selectedRanges.includes(range.id) ? 'var(--zomato-charcoal)' : 'var(--zomato-gray-med)' }}>
            {range.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default PriceFilter;
