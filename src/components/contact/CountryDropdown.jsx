import React, { useState, useRef, useEffect } from 'react';
import FlagIcon  from "./FlagIcon";
import { ChevronDown } from 'lucide-react';

// Custom Country Dropdown Component
const CountryDropdown = ({ 
  selectedCountry, 
  onCountryChange, 
  countriesData, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Filter countries based on search term
  const filteredCountries = countriesData.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.phone.includes(searchTerm)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    onCountryChange(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Country Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-full w-full px-3 py-4 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm font-mono min-w-[140px] cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <FlagIcon 
            countryCode={selectedCountry?.code || 'IN'} 
            size={20}
            className="rounded-sm flex-shrink-0"
          />
          <span className="text-gray-900">{selectedCountry?.phone || '+91'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Countries List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full px-3 py-2 text-left hover:bg-blue-50 flex items-center space-x-3 transition-colors ${
                    selectedCountry?.code === country.code ? 'bg-blue-100 text-blue-700' : 'text-gray-900'
                  }`}
                >
                  <FlagIcon 
                    countryCode={country.code} 
                    size={20}
                    className="rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{country.name}</span>
                      <span className="text-sm text-gray-500 font-mono ml-2">{country.phone}</span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default CountryDropdown;