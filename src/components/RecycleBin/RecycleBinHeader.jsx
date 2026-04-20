// components/RecycleBin/RecycleBinHeader.jsx
import React, { useState, useEffect } from 'react';
import { Recycle, AlertCircle } from 'lucide-react';

export default function RecycleBinHeader({ count, onEmptyBin, onRestoreAll }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeleton for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Skeleton: Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            {/* Skeleton: Icon Circle */}
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-red-200 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"></div>
            
            {/* Skeleton: Title & Subtitle */}
            <div className="text-center sm:text-left">
              <div className="h-8 sm:h-10 bg-gradient-to-r from-red-200 to-pink-200 rounded w-48 sm:w-64 mx-auto sm:mx-0 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-40 sm:w-56 mx-auto sm:mx-0"></div>
            </div>
          </div>

          {/* Skeleton: Warning Banner (always shown in skeleton) */}
          <div className="bg-amber-50 border-l-4 border-amber-200 p-3 sm:p-4 mb-6 sm:mb-8 rounded-lg sm:rounded-xl shadow-md">
            <div className="flex items-start sm:items-center">
              <div className="w-5 sm:w-6 h-5 sm:h-6 bg-amber-200 rounded-full mr-2 sm:mr-3 flex-shrink-0 mt-0.5"></div>
              <div>
                <div className="h-4 bg-amber-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-amber-200 rounded w-full"></div>
                <div className="h-3 bg-amber-200 rounded w-5/6 mt-1"></div>
              </div>
            </div>
          </div>

          {/* Skeleton: Stats */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="h-8 sm:h-10 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl py-3 sm:py-4 px-6 sm:px-8 inline-block shadow-md border border-gray-200/50 w-48 sm:w-64"></div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div>
      {/* Title Section */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
            <Recycle className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Recycle Bin
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-2">Deleted certificates (30 days retention)</p>
          </div>
        </div>

        {/* Warning Banner */}
        {count > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 sm:p-4 mb-6 sm:mb-8 rounded-lg sm:rounded-xl shadow-md">
            <div className="flex items-start sm:items-center">
              <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6 text-amber-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-amber-800">Important Notice</h3>
                <p className="text-amber-700 mt-1 text-sm sm:text-base">
                  Certificates in the recycle bin are automatically deleted after 30 days.
                  Restore them before they're permanently removed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {count > 0 && (
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-gray-700 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl py-3 sm:py-4 px-6 sm:px-8 inline-block shadow-md border border-gray-200/50">
              <span className="font-black text-xl sm:text-2xl text-red-600">{count}</span>{' '}
              certificate{count !== 1 ? 's' : ''} in recycle bin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}