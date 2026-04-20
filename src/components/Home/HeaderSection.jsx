import React, { useState, useEffect } from 'react';
import { Zap, Award } from 'lucide-react';

// Skeleton version of the HeaderSection
const SkeletonHeaderSection = () => {
  return (
    <div className="relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Skeleton badge */}
          <div className="h-6 w-48 sm:w-64 mx-auto bg-gray-200 rounded-full animate-pulse mb-4 sm:mb-6" />

          {/* Skeleton title (2 lines) */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="h-8 sm:h-10 w-3/4 mx-auto bg-gray-200 rounded animate-pulse" />
            <div className="h-8 sm:h-10 w-1/2 mx-auto bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Skeleton description */}
          <div className="space-y-2 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 mx-auto bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 mx-auto bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Skeleton score box */}
          <div className="h-14 sm:h-16 w-64 sm:w-80 mx-auto bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default function HeaderSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., waiting for fonts, data, or hydration)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <SkeletonHeaderSection />;
  }

  // Show actual header after loading
  return (
    <div className="relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-100 text-indigo-800 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            <Zap className="w-3 sm:w-4 h-3 sm:h-4 mr-1.5 sm:mr-2" />
            Free Certificates Available
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight">
            Master Tech Skills - 
            <br className="sm:hidden" />
            <span className="relative text-red-600">
              Free Certification Quiz
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-indigo-200 to-purple-200 -skew-x-12 -z-10" />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
            Take interactive quizzes designed by industry experts to test your programming knowledge and earn
            professional certificates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 text-base sm:text-lg bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md mx-auto shadow-lg border border-gray-200/50">
            <span className="text-gray-600 font-medium text-sm sm:text-base">Score</span>
            <span className="font-black text-xl sm:text-2xl text-emerald-600 bg-emerald-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-inner text-sm sm:text-base">≥ 7/10</span>
            <span className="text-gray-600 font-medium text-sm sm:text-base">to earn</span>
            <Award className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}