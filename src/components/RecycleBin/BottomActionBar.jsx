// components/RecycleBin/BottomActionBar.jsx
import React, { useState, useEffect } from 'react';
import { Check, RotateCcw, Trash2 } from 'lucide-react';

export default function BottomActionBar({
  selectedCount,
  totalCount,
  onDeselectAll,
  onSelectAll,
  onRestore,
  onDelete
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeleton for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-red-200 py-3 px-4 sm:px-6 z-40 transition-opacity duration-300 ease-in-out animate-pulse">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Skeleton: Selected count */}
          <div className="flex items-center space-x-2">
            <div className="w-5 sm:w-6 h-5 sm:h-6 bg-emerald-200 rounded-full"></div>
            <div className="h-5 sm:h-6 w-24 bg-gray-200 rounded"></div>
          </div>

          {/* Skeleton: Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="flex justify-between w-full sm:w-auto">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-indigo-200 rounded"></div>
            </div>
            <div className="mt-2 sm:mt-0 w-full sm:w-auto flex flex-col sm:flex-row gap-2">
              <div className="h-10 bg-emerald-200 rounded-lg sm:rounded-xl w-full sm:w-32"></div>
              <div className="h-10 bg-red-200 rounded-lg sm:rounded-xl w-full sm:w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-red-200 py-3 px-4 sm:px-6 z-40 transition-opacity duration-300 ease-in-out animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Check className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-600" />
          <span className="text-base sm:text-lg font-bold text-gray-800">
            {selectedCount} selected
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="flex justify-between w-full sm:w-auto">
            <button
              onClick={onDeselectAll}
              className="text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-800 underline"
            >
              Deselect All
            </button>
            <button
              onClick={onSelectAll}
              className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 underline"
            >
              Select All ({totalCount})
            </button>
          </div>
          <div className="mt-2 sm:mt-0 w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <button
              onClick={onRestore}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-2 px-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm sm:shadow-lg flex items-center justify-center space-x-2 w-full sm:w-auto text-xs sm:text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore ({selectedCount})</span>
            </button>
            <button
              onClick={onDelete}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm sm:shadow-lg flex items-center justify-center space-x-2 w-full sm:w-auto text-xs sm:text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete ({selectedCount})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}