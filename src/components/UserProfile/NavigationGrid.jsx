// components/UserProfile/NavigationGrid.jsx
import React, { useState, useEffect } from 'react';
import { History, Award, BarChart3, Clock } from 'lucide-react';

export default function NavigationGrid({
  onNavigateToHistory,
  onNavigateToAnalytics,
  onNavigateToRecentlyActivity,
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
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[160px]"
          >
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-100 rounded-xl"></div>
              <div className="text-left">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2  gap-5 sm:gap-6">
      {/* ========== USER HISTORY ========== */}
      <button
        onClick={() => onNavigateToHistory('user')}
        className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-100 hover:border-gray-200 p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[160px]"
        aria-label="View User History"
      >
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
            <History className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl leading-tight">
              User History
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xs">
              View your activity and progress
            </p>
          </div>
        </div>
      </button>

      {/* ========== CERTIFICATE HISTORY ========== */}
      <button
        onClick={() => onNavigateToHistory('certificate')}
        className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-100 hover:border-gray-200 p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[160px]"
        aria-label="View Certificate History"
      >
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors duration-200">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl leading-tight">
              Certificate History
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xs">
              View your earned certificates
            </p>
          </div>
        </div>
      </button>

      {/* ========== ANALYTICS & PROGRESS ========== */}
      <button
        onClick={onNavigateToAnalytics}
        className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-100 hover:border-gray-200 p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[160px]"
        aria-label="View Analytics & Progress"
      >
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-200">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl leading-tight">
              Analytics & Progress
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xs">
              Track your learning progress
            </p>
          </div>
        </div>
      </button>

      {/* ========== RECENTLY ACTIVITY ========== */}
      <button
        onClick={onNavigateToRecentlyActivity}
        className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-100 hover:border-gray-200 p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[160px]"
        aria-label="View Recently Activity"
      >
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-200">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl leading-tight">
              Recently Activity
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xs">
              See your latest actions
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}