// components/ContactForm/RatingStars.jsx
import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating, onRating }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4">
        Rate your overall experience with ShekhTech Quiz
      </label>
      <div className="flex items-center space-x-2 sm:space-x-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRating(star)}
            className={`p-1.5 sm:p-2 transition-all duration-200 ${
              star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-300'
            } hover:text-yellow-400 hover:scale-110`}
          >
            <Star className="w-6 sm:w-8 h-6 sm:h-8 fill-current" />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 sm:ml-4 text-base sm:text-lg font-semibold text-gray-700">
            {rating} out of 5 stars
          </span>
        )}
      </div>
    </div>
  );
}