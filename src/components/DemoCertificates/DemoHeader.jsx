// components/DemoCertificates/DemoHeader.jsx
import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

// Skeleton Loader Component
export const DemoHeaderSkeleton = () => {
  return (
    <div className="text-center mb-10 sm:mb-16 animate-pulse">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
        {/* Skeleton Trophy Icon */}
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-300 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl"></div>

        {/* Skeleton Text Content */}
        <div className="text-center sm:text-left w-full max-w-md">
          <div className="h-8 sm:h-10 bg-gray-300 rounded w-3/4 mx-auto sm:mx-0 mb-3"></div>
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-1/2 mx-auto sm:mx-0"></div>
        </div>
      </div>
    </div>
  );
};

// Main DemoHeader Component
export default function DemoHeader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (2.5 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DemoHeaderSkeleton />;
  }

  return (
    <div className="text-center mb-10 sm:mb-16">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl">
          <Trophy className="w-8 sm:w-12 h-8 sm:h-12 text-white" />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Demo Certificates
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-2">See What You Can Achieve</p>
        </div>
      </div>
    </div>
  );
}