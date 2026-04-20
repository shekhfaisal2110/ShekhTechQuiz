// components/LoadingSpinner.jsx
import React from 'react';

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
        <p className="text-lg sm:text-xl text-gray-600">{message}</p>
      </div>
    </div>
  );
}