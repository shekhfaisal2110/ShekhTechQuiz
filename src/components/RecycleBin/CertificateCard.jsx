// components/RecycleBin/CertificateCard.jsx
import React, { useState, useEffect } from 'react';
import { Award, User, RotateCcw, Trash2 } from 'lucide-react';

export default function CertificateCard({
  cert,
  isSelected,
  performance,
  daysLeft,
  formatDate,
  onSelect,
  onRestore,
  onDelete
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeleton for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="group bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md sm:shadow-xl border border-red-200/50 overflow-hidden animate-pulse">
        {/* Skeleton: Header Image Area */}
        <div className="relative h-36 sm:h-48 bg-gradient-to-br from-red-50 to-pink-100 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-200 rounded-full opacity-30"></div>
          </div>
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <div className="w-4 sm:w-5 h-4 sm:h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 sm:w-12 h-10 sm:h-12 bg-gray-200 rounded-full"></div>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-16 h-5 bg-orange-200 rounded-lg"></div>
        </div>

        {/* Skeleton: Content Area */}
        <div className="p-4 sm:p-6">
          <div className="mb-3 sm:mb-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          {/* Skeleton: Score Box */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-5 bg-gray-200 rounded w-12 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-10"></div>
              </div>
              <div className="text-right">
                <div className="h-5 bg-gray-200 rounded w-12 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-10"></div>
              </div>
            </div>
          </div>

          {/* Skeleton: Action Buttons */}
          <div className="space-y-2 sm:space-y-3">
            <div className="h-10 bg-emerald-200 rounded-xl sm:rounded-2xl"></div>
            <div className="h-10 bg-red-200 rounded-xl sm:rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  const isExpiringSoon = daysLeft <= 7;
  const PerformanceIcon = performance.icon;

  return (
    <div
      className={`group bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md sm:shadow-xl border overflow-hidden hover:shadow-lg sm:hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 ${
        isSelected ? 'border-red-500 ring-2 ring-red-200' : 'border-red-200/50'
      }`}
    >
      <div className="relative h-36 sm:h-48 bg-gradient-to-br from-red-50 to-pink-100 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <Award className="w-12 sm:w-16 h-12 sm:h-16 text-red-400 opacity-50" />
        </div>
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="w-4 sm:w-5 h-4 sm:h-5 text-red-600 rounded bg-white/80 backdrop-blur-sm border-2 border-white shadow-sm"
            />
          </label>
        </div>
        <div
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br ${performance.color} rounded-full flex items-center justify-center shadow-sm opacity-50`}
        >
          <PerformanceIcon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
        </div>
        <div
          className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-2 py-1 rounded-lg text-xs font-bold ${
            isExpiringSoon ? 'bg-red-600 text-white animate-pulse' : 'bg-orange-500 text-white'
          }`}
        >
          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-2 line-clamp-2">
            {cert.courseTitle}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
            <p className="text-xs sm:text-sm font-semibold text-gray-500">
              {cert.userName || cert.name || 'Student'}
            </p>
          </div>
          <div className="text-xs text-red-600 space-y-1">
            <p>Deleted: {formatDate(cert.deletedAt)}</p>
            <p>Original Date: {formatDate(cert.date)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-200 opacity-75">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg sm:text-xl font-black text-gray-600">{cert.score}/{cert.total}</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-500">Score</p>
            </div>
            <div className="text-right">
              <p className="text-lg sm:text-xl font-black text-gray-600">{cert.percentage}%</p>
              <p className="text-xs sm:text-sm font-bold text-gray-500">{performance.level}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <button
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-sm sm:shadow-lg flex items-center justify-center space-x-2 text-sm"
            onClick={onRestore}
          >
            <RotateCcw className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Restore</span>
          </button>
          <button
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-sm sm:shadow-lg flex items-center justify-center space-x-2 text-sm"
            onClick={onDelete}
          >
            <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Delete Forever</span>
          </button>
        </div>
      </div>
    </div>
  );
}