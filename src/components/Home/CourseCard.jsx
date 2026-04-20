import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Code,
  Server,
  Database,
  Award,
  Zap,
  Users,
  Star,
  GitBranch,
  Layers,
  TrendingUp
} from 'lucide-react';
import { getCertificates } from '../../utils/storage';

// Skeleton Course Card Component
const SkeletonCourseCard = () => {
  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Category badge skeleton */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
          <div className="flex-1 space-y-3">
            <div className="h-6 w-24 sm:w-32 bg-gray-200 rounded-xl"></div>
            <div className="h-7 sm:h-8 w-3/4 bg-gray-200 rounded-lg"></div>
            <div className="h-5 w-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4 sm:mb-6">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>

        {/* Stats skeleton */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 sm:w-4 h-3 sm:h-4 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="h-12 sm:h-14 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay (e.g., waiting for storage or API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // While loading, show skeleton
  if (loading) {
    return <SkeletonCourseCard />;
  }

  // After loading, show real course card
  const certificates = getCertificates();
  const isCompleted = certificates.some((cert) => cert.courseId === course.id);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'frontend':
        return 'from-emerald-500 to-emerald-600';
      case 'backend':
        return 'from-purple-500 to-purple-600';
      case 'database':
        return 'from-orange-500 to-orange-600';
      case 'fullstack':
        return 'from-pink-500 to-pink-600';
      case 'tools':
        return 'from-teal-500 to-teal-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'frontend':
        return <Code className="w-4 h-4" />;
      case 'backend':
        return <Server className="w-4 h-4" />;
      case 'database':
        return <Database className="w-4 h-4" />;
      case 'fullstack':
        return <Layers className="w-4 h-4" />;
      case 'tools':
        return <GitBranch className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl md:hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/30 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ padding: '1px' }}
      >
        <div className="w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl bg-white" />
      </div>

      <div className="relative p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
          <div className="flex-1">
            <div
              className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r ${getCategoryColor(
                course.category
              )} text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 shadow-md`}
            >
              {getCategoryIcon(course.category)}
              <span className="capitalize">{course.category}</span>
            </div>

            <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 mb-2 sm:mb-3 leading-tight">
              {course.title}
            </h3>

            <span
              className={`inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border ${getDifficultyColor(
                course.difficulty
              )}`}
            >
              <Zap className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
              {course.difficulty}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3">
          {course.description}
        </p>

        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-gray-500">
              <BookOpen className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="font-medium">{course.questions?.length || 0} questions</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 sm:w-4 h-3 sm:h-4 ${
                    i < Math.floor(course.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">
                {course.rating || 0}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 text-xs sm:text-sm">
              <Users className="w-3 sm:w-4 h-3 sm:h-4" />
            </div>
          </div>
        </div>

        <Link
          to={isCompleted ? '#' : `/course/${course.id}/quiz`}
          className={`group/btn w-full relative overflow-hidden font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-md md:shadow-lg hover:shadow-xl flex items-center justify-center space-x-1 sm:space-x-2 ${
            isCompleted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:bg-pos-100 bg-size-200'
          }`}
          aria-disabled={isCompleted}
        >
          <Award className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-sm sm:text-base">
            {isCompleted ? 'Completed' : 'Start Quiz'}
          </span>
          {!isCompleted && (
            <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          )}
          {!isCompleted && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;