import React, { useState, useEffect } from 'react';
import { Search, TrendingUp } from 'lucide-react';

// Skeleton version of the EmptyState
const SkeletonEmptyState = () => {
  return (
    <div className="text-center py-12 sm:py-20 px-4">
      {/* Skeleton Circle */}
      <div className="relative mb-6 sm:mb-8 flex justify-center">
        <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto bg-gray-200 rounded-full animate-pulse shadow-md" />
        {/* Optional: pulsing dot (simplified as static gray for skeleton) */}
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 sm:w-8 h-6 sm:h-8 bg-gray-300 rounded-full animate-pulse" />
      </div>

      {/* Skeleton Title */}
      <div className="h-6 sm:h-8 w-48 sm:w-64 mx-auto bg-gray-200 rounded mb-3 sm:mb-4 animate-pulse" />

      {/* Skeleton Description */}
      <div className="space-y-2 mb-6 sm:mb-8 max-w-md mx-auto px-2">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-5/6 mx-auto bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Skeleton Button */}
      <div className="h-12 sm:h-14 w-48 sm:w-64 mx-auto bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse" />
    </div>
  );
};

export default function EmptyState({ setSearchTerm, setSelectedCategory }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., waiting for search results or hydration)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <SkeletonEmptyState />;
  }

  // Show actual empty state after loading
  return (
    <div className="text-center py-12 sm:py-20 px-4">
      <div className="relative mb-6 sm:mb-8">
        <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-md">
          <Search className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400" />
        </div>
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-ping opacity-75" />
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
        No courses found
      </h3>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-2">
        Try adjusting your search terms or explore different categories.
      </p>
      <button
        onClick={() => {
          setSearchTerm('');
          setSelectedCategory('all');
        }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl text-sm sm:text-base"
      >
        <div className="flex items-center justify-center space-x-2">
          <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5" />
          <span>Explore All Courses</span>
        </div>
      </button>
    </div>
  );
}