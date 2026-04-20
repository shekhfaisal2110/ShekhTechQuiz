// components/Course/CourseActions.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseActions({ courseId }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <Link
        to={`/course/${courseId}/quiz`}
        className="flex-1 text-center px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-medium text-sm sm:text-base"
      >
        Start Quiz
      </Link>
      <Link
        to="/"
        className="flex-1 text-center px-5 sm:px-6 py-3 sm:py-4 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 font-medium text-sm sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  );
}