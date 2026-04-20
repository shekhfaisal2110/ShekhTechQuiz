// src/components/analytics/AnalyticsHeader.js
import React from 'react';
import { BarChart3 } from 'lucide-react';

const AnalyticsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
        <BarChart3 className="w-8 h-8 text-white" />
      </div>
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Advanced Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Deep insights into learning performance, user engagement, and platform metrics</p>
      </div>
    </div>
  );
};

export default AnalyticsHeader;