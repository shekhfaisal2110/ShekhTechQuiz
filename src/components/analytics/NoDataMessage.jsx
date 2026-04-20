// src/components/analytics/NoDataMessage.js
import React from 'react';
import { BarChart3 } from 'lucide-react';

const NoDataMessage = ({ onGenerateSampleData }) => {
  return (
    <div className="text-center py-12 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50">
      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <BarChart3 className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No Analytics Data Available</h3>
      <p className="text-gray-600 mb-6">Start generating certificates to see comprehensive analytics here!</p>
      <button
        onClick={onGenerateSampleData}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
      >
        Load Sample Data
      </button>
    </div>
  );
};

export default NoDataMessage;