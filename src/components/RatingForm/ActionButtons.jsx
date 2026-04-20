// components/RatingForm/ActionButtons.jsx
import React from "react";
import { Star } from "lucide-react";

export default function ActionButtons({
  onClose,
  onSubmit,
  rating,
  isSubmitting,
}) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <button
        onClick={onClose}
        className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 text-gray-700 font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200"
      >
        Skip for Now
      </button>
      <button
        onClick={onSubmit}
        disabled={rating === 0 || isSubmitting}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl flex items-center justify-center space-x-1.5 sm:space-x-2 text-sm sm:text-base"
      >
        {isSubmitting ? (
          <>
            <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Submit Rating</span>
          </>
        )}
      </button>
    </div>
  );
}