// components/QuizGuidelines/BestPracticesSection.jsx
import React from "react";
import { Target } from "lucide-react";

export default function BestPracticesSection() {
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-4 sm:mb-6 flex items-center">
        <Target className="w-6 sm:w-7 h-6 sm:h-7 text-purple-500 mr-2" />
        Best Practices for Success
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <h4 className="font-semibold text-purple-700 mb-2 text-sm sm:text-base">📚 During the Quiz:</h4>
          <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
            <li>Read each question carefully before answering</li>
            <li>Answer to the best of your ability – guesses are better than blanks!</li>
            <li>Keep your device charged and maintain stable internet connection</li>
            <li>Track your timer and manage time effectively</li>
            <li>Stay focused and avoid distractions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-purple-700 mb-2 text-sm sm:text-base">🎯 Multiple Attempt Strategy:</h4>
          <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
            <li>Use first attempt to assess difficulty level</li>
            <li>Review results and identify weak areas</li>
            <li>Study missed topics before next attempt</li>
            <li>Take breaks between attempts for better focus</li>
            <li>Save your certificates immediately after success</li>
          </ul>
        </div>
      </div>
    </>
  );
}