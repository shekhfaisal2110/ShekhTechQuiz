// src/components/SearchBar/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

// Skeleton version of the SearchBar
const SkeletonSearchBar = () => {
  return (
    <div className="relative group mb-6 animate-pulse">
      <div className="relative">
        <div className="h-12 sm:h-14 w-full bg-gray-200 rounded-xl sm:rounded-2xl" />
      </div>
      {/* Optional: skeleton for suggestions area (not shown by default) */}
    </div>
  );
};

export default function SearchBar({ searchTerm, setSearchTerm, courses = [] }) {
  const [loading, setLoading] = useState(true); // Local loading state
  const formRef = useRef(null);

  // Simulate loading delay (e.g., waiting for hydration or data readiness)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const clear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  // Show skeleton while loading
  if (loading) {
    return <SkeletonSearchBar />;
  }

  return (
    <div className="relative group mb-6">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 sm:w-6 h-5 sm:h-6" />
          <input
            type="text"
            placeholder="Search for your next challenge..."
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-sm sm:text-base placeholder-gray-400 bg-white/50"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value.trim()) {
                setShowSuggestions(true);
              } else {
                setShowSuggestions(false);
              }
            }}
            onFocus={() => {
              if (searchTerm.trim()) setShowSuggestions(true);
            }}
            onBlur={(e) => {
              setTimeout(() => {
                if (!formRef.current?.contains(document.activeElement)) {
                  setShowSuggestions(false);
                }
              }, 150);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setShowSuggestions(false);
              }
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clear}
              className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          )}
        </div>
      </form>

     
    </div>
  );
}