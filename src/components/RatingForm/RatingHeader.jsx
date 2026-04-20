// components/RatingForm/RatingHeader.jsx
import React from "react";
import { ThumbsUp } from "lucide-react";

export default function RatingHeader() {
  return (
    <div className="text-center mb-4 sm:mb-6">
      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <ThumbsUp className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
      </div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
        Rate Your Experience
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 px-2">
        How would you rate your quiz experience today?
      </p>
    </div>
  );
}