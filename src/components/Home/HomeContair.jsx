// src/pages/HomePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { courses } from '../../data/courses';

// ✅ IMPORTED COMPONENTS
import HeaderSection from './HeaderSection';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import FilteredCount from './FilteredCount';
import EmptyState from './EmptyState';
import CourseCard from './CourseCard';

// ✅ SKELETON COMPONENTS (memoized for performance)
const SkeletonHeader = React.memo(() => (
  <div className="relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-16">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="h-6 w-48 sm:w-64 mx-auto bg-gray-200 rounded-full animate-pulse mb-4 sm:mb-6" />
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="h-8 sm:h-10 w-3/4 mx-auto bg-gray-200 rounded animate-pulse" />
          <div className="h-8 sm:h-10 w-1/2 mx-auto bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-2 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 mx-auto bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/5 mx-auto bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-14 sm:h-16 w-64 sm:w-80 mx-auto bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse" />
      </div>
    </div>
  </div>
));

const SkeletonSearchAndFilter = React.memo(() => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 relative z-10">
    <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="h-12 w-full bg-gray-200 rounded-xl mb-6 sm:mb-8" />
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 sm:h-12 w-20 sm:w-28 bg-gray-200 rounded-lg sm:rounded-xl" />
        ))}
      </div>
    </div>
  </div>
));

const SkeletonFilteredCount = React.memo(() => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
    <div className="h-10 sm:h-12 w-64 sm:w-80 mx-auto bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse" />
  </div>
));

const SkeletonCourseGrid = React.memo(() => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="w-full">
          <div className="group relative bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="h-6 w-24 sm:w-32 bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-7 sm:h-8 w-3/4 bg-gray-200 rounded-lg mb-2"></div>
              <div className="h-5 w-20 bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-3"></div>
              <div className="h-12 sm:h-14 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true); // Global loading state

  // Simulate initial load (e.g., data fetching, hydration)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Show skeleton during loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <SkeletonHeader />
        <SkeletonSearchAndFilter />
        <SkeletonFilteredCount />
        <SkeletonCourseGrid />
      </div>
    );
  }

  // Show real content after loading
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <HeaderSection />

      {/* Search & Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 md:p-8">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            courses={courses}
          />
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        </div>
      </div>

      {/* Filtered Courses Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <FilteredCount count={filteredCourses.length} selectedCategory={selectedCategory} />
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredCourses.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="w-full">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            setSearchTerm={setSearchTerm} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}
      </div>
    </div>
  );
}