// components/QuizGuidelines/HeaderSection.jsx
import React from "react";
import { Shield, RotateCcw, UserCheck, Trophy } from "lucide-react";

export default function HeaderSection() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-2xl border border-blue-200 p-6 sm:p-8 mb-8 sm:mb-10 text-center">
      <div className="flex justify-center items-center mb-4">
        <Shield className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        Welcome to the ShekhTech Quiz Platform
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        Master your skills. Earn recognition. Compete with confidence!
      </p>

      {/* Key Features Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
        <div className="bg-green-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-200">
          <RotateCcw className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 mx-auto mb-2" />
          <p className="text-xs sm:text-sm font-semibold text-green-700">Unlimited Attempts</p>
          <p className="text-xxs sm:text-xs text-green-600">Practice as many times as you want</p>
        </div>
        <div className="bg-purple-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-200">
          <UserCheck className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-xs sm:text-sm font-semibold text-purple-700">No Login Required</p>
          <p className="text-xxs sm:text-xs text-purple-600">Start quizzing immediately</p>
        </div>
        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-orange-200">
          <Trophy className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600 mx-auto mb-2" />
          <p className="text-xs sm:text-sm font-semibold text-orange-700">Instant Certificates</p>
          <p className="text-xxs sm:text-xs text-orange-600">Get certified immediately</p>
        </div>
      </div>
    </div>
  );
}