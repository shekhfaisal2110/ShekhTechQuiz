// src/components/certificate-history/TableView.jsx
import React from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp, CheckCircle, XCircle, Download } from 'lucide-react';
import { getPerformanceLevel, formatDate, formatTime } from './utils';

const TableView = ({ 
  attempts, 
  selectedAttempts, 
  onSelectAttempt, 
  onDownload, 
  isDownloading,
  sortBy,
  sortDirection,
  toggleSortDirection,
  isLoading = false // <<< New optional prop
}) => {
  // Skeleton loader (only shown if isLoading=true)
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3"><div className="w-4 h-4 bg-gray-300 rounded"></div></th>
                <th className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-20"></div></th>
                <th className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-16"></div></th>
                <th className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-16"></div></th>
                <th className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-24"></div></th>
                <th className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-16"></div></th>
                <th className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-14"></div></th>
                <th className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-12"></div></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="w-4 h-4 bg-gray-300 rounded"></div></td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-12"></div>
                  </td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-20"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-28"></div></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-300 rounded w-20"></div></td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-300 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-12"></div>
                  </td>
                  <td className="px-4 py-3"><div className="w-8 h-8 bg-gray-300 rounded"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // >>> ORIGINAL CODE BELOW — COMPLETELY UNCHANGED <<<
  const getSortIcon = (column) => {
    if (sortBy !== column) return <ArrowUpDown className="w-4 h-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const handleHeaderClick = (column) => {
    if (sortBy === column) {
      toggleSortDirection();
    } else {
      // In a real app, you would set the sortBy state here
      // For this example, we'll just toggle direction
      toggleSortDirection();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={attempts.length > 0 && selectedAttempts.size === attempts.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Select all logic would go here
                    } else {
                      // Deselect all logic would go here
                    }
                  }}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
              </th>
              <th 
                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleHeaderClick('course')}
              >
                <div className="flex items-center gap-1">
                  Course {getSortIcon('course')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleHeaderClick('score')}
              >
                <div className="flex items-center gap-1">
                  Score {getSortIcon('score')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleHeaderClick('date')}
              >
                <div className="flex items-center gap-1">
                  Date {getSortIcon('date')}
                </div>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Certificate ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                User
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attempts.map((attempt) => {
              const performance = getPerformanceLevel(attempt.percentage);
              const isPassed = attempt.percentage >= 70;
              return (
                <tr key={attempt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedAttempts.has(attempt.id)}
                      onChange={() => onSelectAttempt(attempt.id)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {attempt.courseTitle}
                    <div className="text-xs text-gray-500 mt-1">
                      Attempt #{attempt.attemptNumber}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-gray-900">{attempt.score}/{attempt.total}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${performance.bgClass} ${performance.textColor}`}>
                        {attempt.percentage}%
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatTime(attempt.timeSpent || 0)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(attempt.date)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {attempt.certificateNumber}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {attempt.userName || attempt.name || 'Anonymous'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isPassed ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Passed
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-1" />
                          Failed
                        </>
                      )}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {performance.level}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => onDownload(attempt)}
                        disabled={isDownloading && isDownloading.id === attempt.id}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors disabled:opacity-50"
                        title="Download Certificate"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;