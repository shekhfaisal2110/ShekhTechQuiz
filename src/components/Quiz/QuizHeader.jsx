// components/Quiz/QuizHeader.jsx
import React from 'react';
// import { ArrowLeft, Shield, Timer, Target } from 'lucide-react';
import {
  ArrowLeft,
  Target,
  Brain,
  Timer,
  Shield,
} from 'lucide-react';
export default function QuizHeader({
  courseTitle,
  timeLeft,
  answeredCount,
  totalQuestions,
  isTabActive,
  onBackClick,
  getTimeColor,
  formatTime
}) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onBackClick}
              className="group flex items-center space-x-2 sm:space-x-3 text-gray-600 hover:text-indigo-600 transition-colors duration-300 bg-gray-100/80 hover:bg-indigo-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden sm:inline font-semibold text-xs">Exit Quiz</span>
            </button>
            <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-gray-200 to-gray-400 hidden sm:block" />
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Brain className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900">{courseTitle}</h1>
                <p className="text-xs sm:text-sm text-gray-500">Secure Assessment</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 mt-3 sm:mt-0">
            <div className="flex items-center space-x-2 bg-white/80 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 shadow-md border border-gray-200/50">
              <Shield className={`w-4 sm:w-5 h-4 sm:h-5 ${isTabActive ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`font-bold text-xs sm:text-sm ${isTabActive ? 'text-green-600' : 'text-red-600'}`}>
                {isTabActive ? 'Secure' : 'Monitoring'}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 shadow-md border border-gray-200/50">
              <Timer className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
              <span className={`font-mono text-base sm:text-lg font-bold ${getTimeColor()}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 shadow-md border border-gray-200/50">
              <Target className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
              <span className="font-bold text-xs sm:text-sm text-gray-700">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}