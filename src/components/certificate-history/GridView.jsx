// src/components/certificate-history/GridView.jsx
import React from 'react';
import { User, Calendar, Hash, Clock, CheckCircle, XCircle, Download } from 'lucide-react';
import { getPerformanceLevel, formatDate, formatTime } from './utils';

const GridView = ({ 
  attempts, 
  selectedAttempts, 
  onSelectAttempt, 
  onDownload, 
  onView, 
  onDelete, 
  isDownloading,
  isLoading = false // <<< New optional prop
}) => {
  // If parent wants to show skeleton via this component
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-8"></div>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 bg-gray-300 rounded w-12"></div>
                  <div className="h-5 bg-gray-300 rounded w-10"></div>
                </div>
                <div className="h-5 bg-gray-300 rounded w-16"></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-10"></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-12"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-28"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Original rendering logic (unchanged)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {attempts.map((attempt) => {
        const performance = getPerformanceLevel(attempt.percentage);
        const PerformanceIcon = performance.icon;
        const isPassed = attempt.percentage >= 70;
        return (
          <div 
            key={attempt.id} 
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedAttempts.has(attempt.id)}
                    onChange={() => onSelectAttempt(attempt.id)}
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">
                    {attempt.courseTitle}
                  </h3>
                </div>
                <span className="text-xs text-gray-500">
                  #{attempt.attemptNumber}
                </span>
              </div>
            </div>
            <div className="p-4">
              {/* Score and Performance */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-black text-gray-800">
                      {attempt.score}/{attempt.total}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${performance.bgClass} ${performance.textColor}`}>
                      {attempt.percentage}%
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isPassed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(attempt.timeSpent || 0)}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${performance.textColor}`}>
                    <PerformanceIcon className="w-3 h-3" />
                    <span>{performance.level}</span>
                  </div>
                </div>
              </div>
              {/* Details */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{attempt.userName || attempt.name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{formatDate(attempt.date)}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-xs text-gray-700">{attempt.certificateNumber}</span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onDownload(attempt)}
                  disabled={isDownloading && isDownloading.id === attempt.id}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-xs font-medium py-2 px-3 rounded transition-colors disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridView;