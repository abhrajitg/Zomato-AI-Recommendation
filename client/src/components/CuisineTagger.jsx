import React, { useState } from 'react';
import { Tag as TagIcon, X } from 'lucide-react';

const CuisineTagger = ({ tags, onTagsChange }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const newTag = input.trim().replace(/,$/, '');
      if (newTag && !tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setInput("");
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        className="search-input"
        placeholder="Type cuisine & Space..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ 
          marginBottom: tags.length > 0 ? '12px' : '0',
          height: '40px',
          fontSize: '14px',
          padding: '0 12px'
        }}
      />
      <div className="tag-container" style={{ gap: '8px', marginTop: '10px' }}>
        {tags.map((tag, index) => (
          <div key={index} className="tag" style={{ padding: '2px 8px', fontSize: '12px' }}>
            <TagIcon size={10} style={{ color: 'var(--zomato-red)' }} />
            <span>{tag}</span>
            <X 
              size={12} 
              className="tag-remove" 
              onClick={() => removeTag(index)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuisineTagger;
