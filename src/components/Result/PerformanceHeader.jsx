// components/Result/PerformanceHeader.jsx
import React from 'react';

export default function PerformanceHeader({ performanceData, courseTitle }) {
  const Icon = performanceData.icon;

  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className={`w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r ${performanceData.color} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl mx-auto mb-4 sm:mb-6`}>
        <Icon className="w-8 sm:w-12 h-8 sm:h-12 text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
        Quiz Complete!
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 font-semibold px-2">
        {courseTitle}
      </p>
    </div>
  );
}