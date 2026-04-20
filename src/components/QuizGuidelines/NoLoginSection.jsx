// components/QuizGuidelines/NoLoginSection.jsx
import React from "react";
import { UserCheck } from "lucide-react";

export default function NoLoginSection() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-purple-800 mb-3 sm:mb-4 flex items-center">
        <UserCheck className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 mr-2" />
        No Login Required - Anonymous Participation
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <h4 className="font-semibold text-purple-700 mb-2 text-sm sm:text-base">🚀 Benefits:</h4>
          <ul className="text-xs sm:text-sm text-purple-700 space-y-1">
            <li>• Start quizzing immediately</li>
            <li>• No account creation required</li>
            <li>• Complete privacy protection</li>
            <li>• No personal data collection</li>
            <li>• Focus purely on learning</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-purple-700 mb-2 text-sm sm:text-base">⚠️ Important Notes:</h4>
          <ul className="text-xs sm:text-sm text-purple-700 space-y-1">
            <li>• Results are session-based only</li>
            <li>• No progress tracking across devices</li>
            <li>• Certificates must be saved manually</li>
            <li>• Clear browser = lose history</li>
            <li>• Each session is independent</li>
          </ul>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-purple-100 rounded-lg">
        <p className="text-xs sm:text-sm text-purple-800">
          <strong>Remember:</strong> Since no login is required, make sure to download or screenshot your certificates immediately after completion!
        </p>
      </div>
    </div>
  );
}