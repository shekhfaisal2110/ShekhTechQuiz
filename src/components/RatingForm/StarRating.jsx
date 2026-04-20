// components/RatingForm/StarRating.jsx
import React from "react";
import { Star, Frown, Meh, Smile, Trophy } from "lucide-react";

const getRatingText = (value) => {
  switch (value) {
    case 1:
      return (
        <span className="flex items-center justify-center space-x-1 sm:space-x-2 text-red-500 font-semibold text-sm sm:text-base">
          <Frown className="w-4 sm:w-5 h-4 sm:h-5" /> <span>Very Bad</span>
        </span>
      );
    case 2:
      return (
        <span className="flex items-center justify-center space-x-1 sm:space-x-2 text-orange-500 font-semibold text-sm sm:text-base">
          <Frown className="w-4 sm:w-5 h-4 sm:h-5" /> <span>Bad</span>
        </span>
      );
    case 3:
      return (
        <span className="flex items-center justify-center space-x-1 sm:space-x-2 text-yellow-500 font-semibold text-sm sm:text-base">
          <Meh className="w-4 sm:w-5 h-4 sm:h-5" /> <span>Average</span>
        </span>
      );
    case 4:
      return (
        <span className="flex items-center justify-center space-x-1 sm:space-x-2 text-green-500 font-semibold text-sm sm:text-base">
          <Smile className="w-4 sm:w-5 h-4 sm:h-5" /> <span>Good</span>
        </span>
      );
    case 5:
      return (
        <span className="flex items-center justify-center space-x-1 sm:space-x-2 text-emerald-600 font-semibold text-sm sm:text-base">
          <Trophy className="w-4 sm:w-5 h-4 sm:h-5" /> <span>Excellent</span>
        </span>
      );
    default:
      return "";
  }
};

export default function StarRating({
  rating,
  hoverRating,
  setRating,
  setHoverRating,
}) {
  return (
    <>
      {/* Stars */}
      <div className="flex justify-center space-x-1 sm:space-x-2 mb-4 sm:mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
            className="p-1 sm:p-2 transition-transform duration-200 hover:scale-105 sm:hover:scale-110 focus:outline-none"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 transition-colors duration-200 ${
                star <= (hoverRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Rating Text */}
      {(rating > 0 || hoverRating > 0) && (
        <p className="text-center text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">
          {getRatingText(hoverRating || rating)}
        </p>
      )}
    </>
  );
}