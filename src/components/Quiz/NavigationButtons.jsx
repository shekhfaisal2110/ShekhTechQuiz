// components/Quiz/NavigationButtons.jsx
import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
} from 'lucide-react';

export default function NavigationButtons({
  currentQuestion,
  totalQuestions,
  answeredCount,
  onPrevious,
  onNext,
  onFinish
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className={`group flex items-center justify-center px-3 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
          currentQuestion === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-sm hover:shadow-md'
        }`}
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      
      {currentQuestion === totalQuestions - 1 ? (
        <button
          onClick={onFinish}
          disabled={answeredCount === 0}
          className={`group flex items-center justify-center px-3 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
            answeredCount === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white'
          }`}
        >
          <Award className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">Finish Quiz</span>
        </button>
      ) : (
        <button
          onClick={onNext}
          className="group relative overflow-hidden flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-3 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          <span className="relative hidden sm:inline">Next</span>
          <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}