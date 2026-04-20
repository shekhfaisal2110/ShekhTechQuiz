// src/components/activity/ActivityHeader.jsx
import React from 'react';
import { FaHistory } from 'react-icons/fa';

export default function ActivityHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
            <FaHistory className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
             Recent Activity
            </h1>
          </div>
        </div>
  );
}