// components/Result/RetrySection.jsx
import React from 'react';
import { Brain, BookOpen } from 'lucide-react';

export default function RetrySection({ handleBackToCourses }) {
  return (
    <div className="space-y-6 sm:space-y-8 mb-8">
      <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 md:p-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full sm:rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-xl">
            <Brain className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to Try Again?</h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md sm:max-w-2xl mx-auto px-2">
            Don't be discouraged! Review the course material and try the quiz again to improve your score.
          </p>
        </div>

        <div className="max-w-lg mx-auto space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base"
              onClick={handleBackToCourses}
            >
              <BookOpen className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>Back to Courses</span>
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Tip: Review the course content before attempting the quiz again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}