// src/components/analytics/ChartCard.js
import React from 'react';
import { Download } from 'lucide-react';

const ChartCard = ({ title, children, onExport, exportingKey, currentExporting, icon: Icon }) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {title}
        </h3>
        <button
          onClick={onExport}
          disabled={currentExporting === exportingKey}
          className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {currentExporting === exportingKey ? 'Exporting...' : 'Export'}
        </button>
      </div>
      <div className="h-80">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;