// src/components/analytics/ControlsRow.js
import React from 'react';
import { Calendar, Download } from 'lucide-react';

const ControlsRow = ({ timeRange, setTimeRange, onExportData }) => {
  const timeRanges = [
    { value: 'all', label: 'All Time', icon: <Calendar className="w-3 h-3" /> },
    { value: '90d', label: '90 Days', icon: <Calendar className="w-3 h-3" /> },
    { value: '30d', label: '30 Days', icon: <Calendar className="w-3 h-3" /> },
    { value: '7d', label: '7 Days', icon: <Calendar className="w-3 h-3" /> }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      {/* Time Range Filter */}
      <div className="bg-white/90 backdrop-blur-xl rounded-lg shadow-md p-2 flex flex-wrap gap-1">
        {timeRanges.map(range => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
              timeRange === range.value
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {range.icon}
            <span>{range.label}</span>
          </button>
        ))}
      </div>
      {/* Export Button */}
      <button
        onClick={onExportData}
        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <Download className="w-4 h-4" />
        <span>Export Data</span>
      </button>
    </div>
  );
};

export default ControlsRow;