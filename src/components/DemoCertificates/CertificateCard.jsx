// components/DemoCertificates/CertificateCard.jsx
import React from 'react';
import { User, Eye } from 'lucide-react';
import PerformanceBadge from './PerformanceBadge';

// Skeleton Loader Component
export const CertificateCardSkeleton = () => {
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md sm:shadow-xl border border-gray-200/50 overflow-hidden animate-pulse">
      {/* Skeleton Header */}
      <div className="relative h-36 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-10 sm:w-12 h-10 sm:h-12 bg-gray-300 rounded-full"></div>
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 sm:w-12 h-10 sm:h-12 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <div className="bg-gray-300/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3">
            <div className="h-3 sm:h-4 bg-gray-400 rounded w-1/3 mb-2"></div>
            <div className="h-4 sm:h-5 bg-gray-400 rounded w-4/5"></div>
          </div>
        </div>
      </div>

      {/* Skeleton Content */}
      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
            <div className="h-5 w-20 bg-gray-300 rounded-lg"></div>
            <div className="h-5 w-16 bg-gray-300 rounded-lg"></div>
          </div>

          <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-2 sm:mb-3"></div>
          <div className="h-4 sm:h-5 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 sm:h-5 bg-gray-300 rounded w-5/6 mb-3 sm:mb-4"></div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 sm:w-4 h-3 sm:h-4 bg-gray-300 rounded-full"></div>
              <div className="h-3 sm:h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Performance Badge */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
        </div>
        <div className="h-2 bg-gray-300 rounded-full w-full mb-2"></div>

        {/* Skeleton Footer */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

// Main Certificate Card Component
export default function CertificateCard({
  cert,
  performance,
  formatDate,
  onClick
}) {
  const CourseIcon = cert.icon;
  const PerformanceIcon = performance.icon;

  return (
    <div
      className="group bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md sm:shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-lg md:hover:shadow-2xl hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Certificate Header */}
      <div className={`relative h-36 sm:h-48 bg-gradient-to-br ${cert.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white">
            <Eye className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-1 sm:mb-2" />
            <p className="text-base sm:text-lg font-bold">View Certificate</p>
          </div>
        </div>

        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
          <CourseIcon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
        </div>
        <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br ${performance.color} rounded-full flex items-center justify-center shadow-md`}>
          <PerformanceIcon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
        </div>

        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3">
            <p className="text-xs sm:text-sm opacity-90">Certificate Preview</p>
            <p className="font-bold text-sm sm:text-base truncate">{cert.courseTitle}</p>
          </div>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
            <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-lg">{cert.category}</span>
            <span className={`text-xs sm:text-sm font-bold ${performance.textColor}`}>{performance.level}</span>
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-indigo-700 transition-colors duration-300 leading-tight">
            {cert.courseTitle}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">{cert.description}</p>

          <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <div className="flex items-center space-x-1">
              <User className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="truncate">{cert.userName}</span>
            </div>
          </div>
        </div>

        <PerformanceBadge
          score={cert.score}
          total={cert.total}
          percentage={cert.percentage}
          performance={performance}
        />

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 text-center">
          <p className="text-xs sm:text-sm text-gray-500">Completed {formatDate(cert.date)}</p>
          <p className="text-xxs sm:text-xs text-gray-400 font-mono truncate">ID: {cert.certificateNumber}</p>
        </div>
      </div>
    </div>
  );
}