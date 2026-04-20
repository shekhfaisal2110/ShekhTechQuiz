// components/ContactForm/ContactMethodSelector.jsx
import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function ContactMethodSelector({ selected, onChange, error }) {
  return (
    <div>
      <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
        How should we contact you? *
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <button
          type="button"
          onClick={() => onChange({ target: { name: 'contactMethod', value: 'email' } })}
          className={`p-4 sm:p-6 rounded-lg sm:rounded-2xl border-2 transition-all duration-200 ${
            selected === 'email'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-base sm:text-lg">Email</div>
            </div>
          </div>
        </button>
        
        <button
          type="button"
          onClick={() => onChange({ target: { name: 'contactMethod', value: 'phone' } })}
          className={`p-4 sm:p-6 rounded-lg sm:rounded-2xl border-2 transition-all duration-200 ${
            selected === 'phone'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-base sm:text-lg">Phone Call</div>
            </div>
          </div>
        </button>
      </div>
      {error && <p className="text-red-500 text-xs sm:text-sm mt-2">{error}</p>}
    </div>
  );
}