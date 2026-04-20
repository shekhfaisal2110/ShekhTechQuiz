// components/QuizGuidelines/MultipleAttemptsSection.jsx
import React from "react";
import { RotateCcw } from "lucide-react";

export default function MultipleAttemptsSection() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4 flex items-center">
        <RotateCcw className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 mr-2" />
        Multiple Attempts Policy
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <h4 className="font-semibold text-green-700 mb-2 text-sm sm:text-base">✅ What's Allowed:</h4>
          <ul className="text-xs sm:text-sm text-green-700 space-y-1">
            <li>• Take any quiz multiple times</li>
            <li>• No limit on number of attempts</li>
            <li>• Practice and improve your score</li>
            <li>• Learn from previous mistakes</li>
            <li>• Each attempt is independent</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-green-700 mb-2 text-sm sm:text-base">📋 How It Works:</h4>
          <ul className="text-xs sm:text-sm text-green-700 space-y-1">
            <li>• Your highest score is recorded</li>
            <li>• Previous attempts remain visible</li>
            <li>• Each attempt gets a fresh timer</li>
            <li>• Questions may be randomized</li>
            <li>• Certificates issued for best score</li>
          </ul>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-100 rounded-lg">
        <p className="text-xs sm:text-sm text-green-800">
          <strong>Pro Tip:</strong> Use multiple attempts strategically! Review your results after each attempt to identify knowledge gaps and improve your performance.
        </p>
      </div>
    </div>
  );
}