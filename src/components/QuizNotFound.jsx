// components/QuizNotFound.jsx
import React from 'react';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 md:p-12 text-center max-w-xs sm:max-w-lg w-full mx-4">
        {/* Icon */}
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
          <XCircle className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Quiz Not Found
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
          The quiz you're looking for doesn't exist or has been removed.
        </p>

        {/* Back Button */}
        <Link
          to="/courses"
          className="w-full block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl text-sm sm:text-base hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Back to Courses
        </Link>
      </div>
    </div>
  );
}