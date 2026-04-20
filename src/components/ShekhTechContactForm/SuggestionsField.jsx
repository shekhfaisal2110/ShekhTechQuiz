// components/ContactForm/SuggestionsField.jsx
import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function SuggestionsField({ value, onChange }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5" />
          <span>Suggestions for ShekhTech Quiz Website (Optional)</span>
        </div>
      </label>
      <textarea
        name="suggestions"
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg"
        placeholder="Share your ideas for new features, improvements, or any changes you'd like to see..."
      />
    </div>
  );
}