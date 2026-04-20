// src/components/certificate-history/ViewModeToggle.jsx
import React from 'react';
import { Grid, Table, List } from 'lucide-react';

const ViewModeToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode('grid')}
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
          viewMode === 'grid' 
            ? 'bg-white text-indigo-700 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span className="hidden sm:inline">Grid</span>
      </button>
      <button
        onClick={() => setViewMode('table')}
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
          viewMode === 'table' 
            ? 'bg-white text-indigo-700 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <Table className="w-4 h-4" />
        <span className="hidden sm:inline">Table</span>
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
          viewMode === 'list' 
            ? 'bg-white text-indigo-700 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
};

export default ViewModeToggle;