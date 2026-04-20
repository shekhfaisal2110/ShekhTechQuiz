import React from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';

export default function CertificateActionsBar({
  selectedCerts,
  sortedCertificates,
  handleDeselectAll,
  handleSelectAll,
  moveToRecycleBin
}) {
  if (selectedCerts.size === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200/70 py-3 px-4 sm:px-6 z-40 transition-opacity duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-600" />
          <span className="text-base sm:text-lg font-bold text-gray-800">
            {selectedCerts.size} selected
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="flex justify-between w-full sm:w-auto">
            <button
              onClick={handleDeselectAll}
              className="text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-800 underline"
            >
              Deselect All
            </button>
            <button
              onClick={handleSelectAll}
              className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 underline"
            >
              Select All ({sortedCertificates.length})
            </button>
          </div>
          <div className="mt-2 sm:mt-0 w-full sm:w-auto">
            <button
              onClick={() => moveToRecycleBin(Array.from(selectedCerts))}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center space-x-2 text-xs sm:text-sm"
            >
              <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>Delete ({selectedCerts.size})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}