// components/Quiz/QuestionCard.jsx
import React from 'react';
import {
  CheckCircle,
  Zap,
} from 'lucide-react';

export default function QuestionCard({
  question,
  questionIndex,
  selectedAnswer,
  answers,
  onAnswerSelect,
  onMouseEnterAnswer
}) {
  const isSelected = (index) => answers[question.id] === index;
  const isHovered = (index) => selectedAnswer === index;

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm sm:text-lg">{questionIndex + 1}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500" />
            <span className="text-xs sm:text-sm font-semibold text-gray-600 bg-yellow-100 px-2 sm:px-3 py-1 rounded-full">Challenge Question</span>
          </div>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
          {question.text}
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            onMouseEnter={() => onMouseEnterAnswer(index)}
            onMouseLeave={() => onMouseEnterAnswer(null)}
            className={`group w-full text-left p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.01] sm:hover:scale-[1.02] ${
              isSelected(index)
                ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-900 shadow-md sm:shadow-lg'
                : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 hover:shadow-sm sm:hover:shadow-md'
            }`}
            style={{ userSelect: 'none' }}
          >
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
              <div className={`relative w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isSelected(index)
                  ? 'border-indigo-500 bg-indigo-500 shadow-sm'
                  : 'border-gray-300 group-hover:border-indigo-400'
              }`}>
                {isSelected(index) && (
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-white" />
                )}
                {!isSelected(index) && isHovered(index) && (
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-indigo-400 opacity-50" />
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">{option}</span>
              </div>
              {isSelected(index) && (
                <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}