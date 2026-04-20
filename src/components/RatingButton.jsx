// components/RatingButton.jsx
import React from 'react';
import { Star } from 'lucide-react';

export default function RatingButton({ onClick }) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40">
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 flex items-center space-x-1 sm:space-x-2"
        title="Rate Your Experience"
      >
        <Star className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
        <span className="hidden sm:inline text-xs sm:text-sm">Rate Experience</span>
      </button>
    </div>
  );
}