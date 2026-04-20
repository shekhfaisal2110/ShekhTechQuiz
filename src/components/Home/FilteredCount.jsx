import React, { useState, useEffect } from 'react';

// Skeleton version of the FilteredCount
const SkeletonFilteredCount = () => {
  return (
    <div className="text-center">
      <div className="h-10 sm:h-12 w-64 sm:w-80 mx-auto bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse shadow-md" />
    </div>
  );
};

export default function FilteredCount({ count, selectedCategory }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., waiting for course data to filter)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [count, selectedCategory]); // Re-run if inputs change (optional but safe)

  // Show skeleton while loading
  if (loading) {
    return <SkeletonFilteredCount />;
  }

  // Show actual count after loading
  return (
    <div className="text-center">
      <p className="text-base sm:text-lg text-gray-700 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-8 inline-block shadow-md border border-gray-200/50">
        Showing <span className="font-black text-lg sm:text-2xl text-indigo-600">{count}</span>{' '}
        <span className="mx-1 sm:mx-2">premium course{count !== 1 ? 's' : ''}</span>
        {selectedCategory !== 'all' && (
          <span>
            in <span className="font-bold capitalize text-purple-600">{selectedCategory}</span>
          </span>
        )}
      </p>
    </div>
  );
}