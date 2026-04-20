import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Code,
  Server,
  Database,
  GitBranch,
  Layers,
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
  { id: 'frontend', name: 'Frontend', icon: Code, color: 'from-emerald-500 to-emerald-600' },
  { id: 'backend', name: 'Backend', icon: Server, color: 'from-purple-500 to-purple-600' },
  { id: 'database', name: 'Database', icon: Database, color: 'from-orange-500 to-orange-600' },
  { id: 'fullstack', name: 'Fullstack', icon: Layers, color: 'from-pink-500 to-pink-600' },
  { id: 'tools', name: 'Tools', icon: GitBranch, color: 'from-teal-500 to-teal-600' },
];

// Skeleton Item Component
const SkeletonCategory = ({ isMobile }) => (
  <div
    className={`animate-pulse rounded-xl ${
      isMobile
        ? 'h-12 w-24 sm:w-32 flex items-center justify-center'
        : 'h-10 w-28 flex items-center justify-center'
    } bg-gray-200`}
  />
);

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., waiting for data or hydration)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2.5 seconds

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {/* Mobile Skeleton */}
        <div className="lg:hidden">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((_, index) => (
              <SkeletonCategory key={index} isMobile={true} />
            ))}
          </div>
        </div>

        {/* Desktop Skeleton */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center ">
            {categories.map((_, index) => (
              <SkeletonCategory key={index} isMobile={false} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? `bg-gradient-to-r ${category.color} text-white shadow-2xl`
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 shadow-lg'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="hidden sm:inline font-bold">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-center">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 shadow-md'
                }`}
              >
                <Icon className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}