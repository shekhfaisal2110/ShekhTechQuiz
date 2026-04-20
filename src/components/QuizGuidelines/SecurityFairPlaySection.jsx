// components/QuizGuidelines/SecurityFairPlaySection.jsx
import React from "react";
import { Shield } from "lucide-react";

export default function SecurityFairPlaySection() {
  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-3 sm:mb-4 flex items-center">
        <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-red-600 mr-2" />
        Security & Fair Play
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <h4 className="font-semibold text-red-700 mb-2 text-sm sm:text-base">🔒 Security Measures:</h4>
          <ul className="text-xs sm:text-sm text-red-700 space-y-1">
            <li>• Real-time cheat detection</li>
            <li>• Tab switching monitoring</li>
            <li>• Screenshot prevention</li>
            <li>• Copy/paste blocking</li>
            <li>• Developer tools detection</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-700 mb-2 text-sm sm:text-base">⚖️ Fair Play Policy:</h4>
          <ul className="text-xs sm:text-sm text-red-700 space-y-1">
            <li>• Maximum 3 security violations allowed</li>
            <li>• Automatic quiz termination after violations</li>
            <li>• Violation history tracking</li>
            <li>• Progressive warning system</li>
            <li>• Immediate redirect for severe violations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}