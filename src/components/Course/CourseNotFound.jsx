// components/CourseNotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-lg shadow-lg text-center max-w-xs sm:max-w-md w-full mx-4">
        <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4">Course not found</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base font-medium"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}