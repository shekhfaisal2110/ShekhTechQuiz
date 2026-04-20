// components/RecycleBin/EmptyRecycleBin.jsx
import React, { useState, useEffect } from 'react';
import { Recycle } from 'lucide-react';

export default function EmptyRecycleBin({ onBack }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeleton for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12 sm:py-20 px-4 animate-pulse">
        {/* Skeleton: Icon Circle */}
        <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-md"></div>

        {/* Skeleton: Title */}
        <div className="h-8 sm:h-10 bg-gray-200 rounded w-3/4 max-w-md mx-auto mb-3 sm:mb-4"></div>

        {/* Skeleton: Description */}
        <div className="space-y-2 mb-6 sm:mb-8 max-w-md mx-auto">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
        </div>

        {/* Skeleton: Button */}
        <div className="h-12 sm:h-14 w-48 sm:w-64 mx-auto bg-gray-200 rounded-xl sm:rounded-2xl"></div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div className="text-center py-12 sm:py-20 px-4">
      <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-md">
        <Recycle className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Recycle Bin is Empty</h3>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
        Deleted certificates will appear here and be automatically removed after 30 days.
      </p>
      <button
        onClick={onBack}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md sm:shadow-lg text-sm sm:text-base"
      >
        ← Back to Certificates
      </button>
    </div>
  );
}