import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

const SearchableDropdown = ({ options, onSelect, placeholder = "Select locality" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
    setSearch("");
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    setSelected("");
    onSelect("");
  };

  return (
    <div className="search-dropdown" ref={dropdownRef}>
      <div 
        className="search-input" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          height: '40px',
          padding: '0 12px'
        }}
      >
        <span style={{ 
          color: selected ? 'var(--zomato-charcoal)' : 'var(--zomato-gray-light)',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {selected || placeholder}
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {selected && <X size={14} className="tag-remove" onClick={clearSelection} />}
          <ChevronDown size={16} style={{ color: 'var(--zomato-gray-light)' }} />
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          <div style={{ padding: '8px', borderBottom: '1px solid var(--zomato-border)' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--zomato-gray-light)' }} />
              <input
                autoFocus
                type="text"
                className="search-input"
                placeholder="Search localities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '32px', height: '36px', fontSize: '14px' }}
              />
            </div>
          </div>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, i) => (
                <div 
                  key={i} 
                  className="dropdown-item"
                  onClick={() => handleSelect(opt)}
                  style={{ padding: '8px 12px', fontSize: '14px' }}
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="dropdown-item" style={{ color: 'var(--zomato-gray-light)', cursor: 'default', padding: '12px', fontSize: '13px' }}>
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
