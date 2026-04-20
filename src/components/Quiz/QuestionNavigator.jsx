// components/Quiz/QuestionNavigator.jsx
import React from 'react';
import {
  CheckCircle,
  Target,
} from 'lucide-react';

export default function QuestionNavigator({
  questions,
  currentQuestion,
  answers,
  onQuestionSelect,
  violationCount
}) {
  const answeredCount = Object.keys(answers).length;
  const totalViolations = Object.values(violationCount).reduce((sum, count) => sum + count, 0);

  return (
    <div className="mt-6 sm:mt-8 bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center space-x-2 mb-3 sm:mb-0">
          <Target className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-600" />
          <span>Question Navigator</span>
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
            {answeredCount} of {questions.length} completed
          </div>
          <div className="text-xs sm:text-sm text-red-500 bg-red-100 px-3 py-1.5 rounded-full">
            Violations: {totalViolations}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
        {questions.map((_, index) => {
          const isAnswered = answers[questions[index].id] !== undefined;
          const isCurrent = index === currentQuestion;
          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`relative w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
                isCurrent
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md'
                  : isAnswered
                  ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300'
              }`}
            >
              <span className="relative z-10">{index + 1}</span>
              {isCurrent && (
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-white/30 to-transparent" />
              )}
              {isAnswered && !isCurrent && (
                <CheckCircle className="absolute -top-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 text-emerald-600 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded"></div>
          <span className="text-gray-600">Current</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded"></div>
          <span className="text-gray-600">Answered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded"></div>
          <span className="text-gray-600">Pending</span>
        </div>
      </div>
    </div>
  );
}