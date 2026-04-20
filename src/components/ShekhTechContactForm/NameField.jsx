// components/ContactForm/NameField.jsx
import React from 'react';
import { User } from 'lucide-react';

export default function NameField({ value, onChange, error }) {
  return (
    <div>
      <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2">
        Full Name *
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <User className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="name"
          value={value}
          onChange={onChange}
          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
      </div>
      {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
    </div>
  );
}