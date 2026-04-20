// components/RecycleBin/ConfirmationModal.jsx
import React, { useState, useEffect } from 'react';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmColor = 'red'
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only start timer if modal is open
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeleton for 2.5 seconds

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  // Show skeleton loader while loading
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-md sm:max-w-lg w-full mx-2 animate-pulse">
          {/* Skeleton: Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="h-6 sm:h-7 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Skeleton: Message Body */}
          <div className="p-4 sm:p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Skeleton: Footer Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-4 sm:p-6 bg-gray-50 rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl">
            <div className="h-10 sm:h-11 w-full sm:w-24 bg-gray-200 rounded-lg sm:rounded-2xl"></div>
            <div className="h-10 sm:h-11 w-full sm:w-28 bg-gray-200 rounded-lg sm:rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  // Determine button gradient based on confirmColor
  const gradient =
    confirmColor === 'green'
      ? 'from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600'
      : 'from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-md sm:max-w-lg w-full mx-2 transform animate-fadeIn scale-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">{title}</h3>
        </div>

        {/* Message Body */}
        <div className="p-4 sm:p-6 max-h-64 sm:max-h-80 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-gray-700 text-xs sm:text-sm leading-relaxed font-sans">
            {message}
          </pre>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-4 sm:p-6 bg-gray-50 rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl">
          <button
            onClick={onCancel}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg sm:rounded-2xl transition-all duration-200 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r ${gradient} text-white font-bold rounded-lg sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md sm:shadow-lg text-sm`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}