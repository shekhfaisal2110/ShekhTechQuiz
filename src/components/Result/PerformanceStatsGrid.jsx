// components/Result/PerformanceStatsGrid.jsx
import React from 'react';
import { BarChart3, Star, Clock } from 'lucide-react';

export default function PerformanceStatsGrid({
  score,
  total,
  percentage,
  timeSpentFormatted,
  performanceData
}) {
  const PerformanceIcon = performanceData.icon;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-3 sm:p-6 text-center shadow-md border border-gray-200/50">
        <BarChart3 className="w-6 sm:w-8 h-6 sm:h-8 text-indigo-500 mx-auto mb-2 sm:mb-3" />
        <p className="text-lg sm:text-2xl md:text-3xl font-black text-indigo-700 mb-1 sm:mb-2">{score}/{total}</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Score</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-3 sm:p-6 text-center shadow-md border border-gray-200/50">
        <Star className="w-6 sm:w-8 h-6 sm:h-8 text-purple-500 mx-auto mb-2 sm:mb-3" />
        <p className="text-lg sm:text-2xl md:text-3xl font-black text-purple-700 mb-1 sm:mb-2">{percentage}%</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Percentage</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-3 sm:p-6 text-center shadow-md border border-gray-200/50">
        <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-500 mx-auto mb-2 sm:mb-3" />
        <p className="text-lg sm:text-2xl md:text-3xl font-black text-emerald-700 mb-1 sm:mb-2">{timeSpentFormatted}</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Time Spent</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-3 sm:p-6 text-center shadow-md border border-gray-200/50">
        <PerformanceIcon className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 sm:mb-3" style={{color: performanceData.textColor.replace('text-', '')}} />
        <p className={`text-lg sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2 ${performanceData.textColor}`}>{performanceData.level}</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">Level</p>
      </div>
    </div>
  );
}