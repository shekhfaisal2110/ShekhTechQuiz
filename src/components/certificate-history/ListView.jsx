// src/components/certificate-history/ListView.jsx
import React from 'react';
import { User, Calendar, Hash, Clock, CheckCircle, XCircle, Download } from 'lucide-react';
import { getPerformanceLevel, formatDate, formatTime } from './utils';

const ListView = ({ 
  attempts, 
  selectedAttempts, 
  onSelectAttempt, 
  onDownload, 
  onView, 
  isDownloading,
  isLoading = false // <<< New optional prop
}) => {
  // Skeleton loader (only shown if isLoading=true)
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 p-4">
                <div className="flex items-start sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div>
                      <div className="h-5 bg-gray-300 rounded w-48 mb-2"></div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                        <div className="h-4 bg-gray-300 rounded w-14"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-6 bg-gray-300 rounded w-12 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-10"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-14"></div>
                  </div>
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-gray-200 p-3 sm:p-4 bg-gray-50 sm:bg-white">
                <div className="flex flex-col gap-2">
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // >>> ORIGINAL CODE BELOW — COMPLETELY UNCHANGED <<<
  return (
    <div className="space-y-3">
      {attempts.map((attempt) => {
        const performance = getPerformanceLevel(attempt.percentage);
        const PerformanceIcon = performance.icon;
        const isPassed = attempt.percentage >= 70;
        return (
          <div 
            key={attempt.id} 
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Checkbox and main content */}
              <div className="flex-1 p-4">
                <div className="flex items-start sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAttempts.has(attempt.id)}
                      onChange={() => onSelectAttempt(attempt.id)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mt-1"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                        {attempt.courseTitle}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">Attempt #{attempt.attemptNumber}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isPassed ? 'Passed' : 'Failed'}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${performance.bgClass} ${performance.textColor}`}>
                          {performance.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-gray-800 text-lg">
                      {attempt.score}/{attempt.total}
                    </div>
                    <div className={`text-sm font-medium ${performance.textColor}`}>
                      {attempt.percentage}%
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                    <User className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-700 truncate">{attempt.userName || attempt.name || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-700">{formatDate(attempt.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-700">{formatTime(attempt.timeSpent || 0)}</span>
                  </div>
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded">
                    <Hash className="w-3 h-3 text-gray-500" />
                    <span className="font-mono text-xxs text-gray-700 truncate">{attempt.certificateNumber}</span>
                  </div>
                </div>
              </div>
              {/* Action buttons */}
              <div className="border-t sm:border-t-0 sm:border-l border-gray-200 p-3 sm:p-4 bg-gray-50 sm:bg-white">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onDownload(attempt)}
                    disabled={isDownloading && isDownloading.id === attempt.id}
                    className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-xs font-medium py-2 px-3 rounded transition-colors disabled:cursor-not-allowed"
                  >
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;