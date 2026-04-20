// components/Course/CourseHeader.jsx
import React from 'react';

export default function CourseHeader({ title, description }) {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
        {description}
      </p>
    </>
  );
}