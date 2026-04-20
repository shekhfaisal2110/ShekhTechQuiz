// components/ContactForm/PhoneField.jsx
import React from 'react';
import { Phone } from 'lucide-react';
import CountryDropdown from '../contact/CountryDropdown';
import FlagIcon from '../contact/FlagIcon';

export default function PhoneField({
  phone,
  selectedCountry,
  onPhoneChange,
  onCountryChange,
  error,
  countriesData,
  getPhonePlaceholder
}) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
        Phone Number *
      </label>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2">
          <CountryDropdown
            selectedCountry={selectedCountry}
            onCountryChange={onCountryChange}
            countriesData={countriesData}
          />
        </div>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={onPhoneChange}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className={`flex-1 p-3 sm:p-4 border rounded-lg sm:rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={getPhonePlaceholder()}
          maxLength={selectedCountry?.maxLength || 15}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
      
      <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs">
        <div className="flex items-center space-x-2 mb-1 sm:mb-0">
          <FlagIcon 
            countryCode={selectedCountry?.code || 'IN'} 
            size={14}
            className="rounded-sm"
          />
          <span className="text-gray-600">
            {selectedCountry?.name} ({selectedCountry?.phone})
          </span>
        </div>
        <span className="text-gray-500">
          {phone.length}/{selectedCountry?.maxLength} digits
        </span>
      </div>
      
      {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
    </div>
  );
}