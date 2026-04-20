// src/components/UserHistory/UserModal/AttemptHistory.jsx
import React from 'react';
import { AlertTriangle, Calendar, Clock, Download } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown Date';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Invalid Date';
  }
};

const formatTime = (seconds) => {
  if (!seconds || seconds === 0) return '0m';
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) return `${hrs}h ${mins % 60}m`;
  return `${mins}m`;
};

export default function AttemptHistory({
  attempts,
  filterByStatus,
  onFilterChange,
  onDownload,
  isDownloading
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Detailed History</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 rounded text-xs font-medium ${
              filterByStatus === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({attempts.length})
          </button>
          <button
            onClick={() => onFilterChange('passed')}
            className={`px-3 py-1 rounded text-xs font-medium ${
              filterByStatus === 'passed' 
                ? 'bg-green-600 text-white' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Passed ({attempts.filter(a => a.percentage >= 70).length})
          </button>
          <button
            onClick={() => onFilterChange('failed')}
            className={`px-3 py-1 rounded text-xs font-medium ${
              filterByStatus === 'failed' 
                ? 'bg-red-600 text-white' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            Failed ({attempts.filter(a => a.percentage < 70).length})
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {attempts
          .filter(attempt => {
            if (filterByStatus === 'all') return true;
            if (filterByStatus === 'passed') return attempt.percentage >= 70;
            if (filterByStatus === 'failed') return attempt.percentage < 70;
            return true;
          })
          .map((attempt) => {
            const isPassed = attempt.percentage >= 70;
            return (
              <div key={attempt.id} className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg ${
                isPassed ? 'bg-gray-50' : 'bg-red-50 border-l-4 border-red-500'
              }`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{attempt.courseTitle}</span>
                    <span className="text-xs text-gray-500">Attempt #{attempt.attemptNumber}</span>
                    {!isPassed && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Failed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">{attempt.score}/{attempt.total}</span>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      isPassed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {attempt.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(attempt.date)}</span>
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(attempt.timeSpent || 0)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onDownload(attempt)}
                    disabled={isDownloading && isDownloading.id === attempt.id}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white text-xs font-medium py-1 px-3 rounded transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}