// components/DemoCertificates/PerformanceBadge.jsx
import React from 'react';

export default function PerformanceBadge({ score, total, percentage, performance }) {
  return (
    <div className={`bg-gradient-to-r ${performance.bgColor} rounded-xl sm:rounded-2xl p-3 sm:p-4 border ${performance.borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-800">{score}/{total}</p>
          <p className="text-xs sm:text-sm font-semibold text-gray-600">Score</p>
        </div>
        <div className="text-right">
          <p className="text-lg sm:text-xl md:text-2xl font-black text-gray-800">{percentage}%</p>
          <p className={`text-xs sm:text-sm font-bold ${performance.textColor}`}>{performance.level}</p>
        </div>
      </div>
    </div>
  );
}