// src/components/analytics/PerformanceTable.js
import React from 'react';
import { Crown } from 'lucide-react';
import { getPerformanceLevel } from '../../utils/analyticsUtils';

const PerformanceTable = ({ data, type }) => {
  // `type` can be 'courses' or 'users' to determine columns and sorting
  const sortedData = [...data].sort((a, b) => b.avgScore - a.avgScore);

  const getColumns = () => {
    if (type === 'courses') {
      return [
        { key: 'title', label: 'Course', isBold: true },
        { key: 'avgScore', label: 'Avg Score', formatter: (val) => `${val}%`, className: 'text-green-600 font-bold' },
        { key: 'passRate', label: 'Pass Rate', formatter: (val, row) => `${Math.round((row.passedAttempts / row.totalAttempts) * 100)}%` },
        { key: 'totalAttempts', label: 'Total Attempts' },
        { key: 'bestScore', label: 'Best Score', formatter: (val) => `${val}%`, className: 'text-purple-600 font-bold' },
        { key: 'avgTimePerAttempt', label: 'Avg Time', formatter: (val) => formatTimeForDisplay(val) },
        { key: 'performance', label: 'Performance', isBadge: true, getBadgeProps: (row) => {
          const level = getPerformanceLevel(row.avgScore);
          let color = 'bg-red-100 text-red-800';
          if (row.avgScore >= 90) color = 'bg-amber-100 text-amber-800';
          else if (row.avgScore >= 80) color = 'bg-purple-100 text-purple-800';
          else if (row.avgScore >= 70) color = 'bg-green-100 text-green-800';
          return { level, color };
        }}
      ];
    } else {
      return [
        { key: 'name', label: 'User', isBold: true, withCrown: true },
        { key: 'totalAttempts', label: 'Total Attempts', className: 'text-blue-600 font-bold' },
        { key: 'passRate', label: 'Pass Rate', formatter: (val, row) => {
          const rate = row.totalAttempts > 0 ? Math.round((row.passedAttempts / row.totalAttempts) * 100) : 0;
          return `${rate}%`;
        }},
        { key: 'avgScore', label: 'Avg Score', formatter: (val) => `${val}%`, className: 'text-green-600 font-bold' },
        { key: 'coursesCompleted', label: 'Courses Completed', formatter: (val) => val.length },
        { key: 'improvementRate', label: 'Improvement', formatter: (val) => {
          return `${val > 0 ? '+' : ''}${val}%`;
        }, className: (val) => val > 0 ? 'text-green-600 font-bold' : val < 0 ? 'text-red-600 font-bold' : 'text-gray-600' },
        { key: 'totalTimeSpent', label: 'Total Time', formatter: (val) => formatTimeForDisplay(val) },
        { key: 'level', label: 'Level', isBadge: true, getBadgeProps: (row) => {
          const level = getPerformanceLevel(row.avgScore);
          let color = 'bg-red-100 text-red-800';
          if (row.avgScore >= 90) color = 'bg-amber-100 text-amber-800';
          else if (row.avgScore >= 80) color = 'bg-purple-100 text-purple-800';
          else if (row.avgScore >= 70) color = 'bg-green-100 text-green-800';
          return { level, color };
        }}
      ];
    }
  };

  const columns = getColumns();

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        {type === 'courses' ? (
          <>
            <Award className="w-5 h-5 text-green-600" />
            Top Performing Courses
          </>
        ) : (
          <>
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            User Performance Rankings
          </>
        )}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th key={col.key} className={`px-4 py-3 text-left ${index === 0 ? 'rounded-tl-lg' : ''} ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                {columns.map((col, colIndex) => {
                  let cellValue = row[col.key];
                  let className = '';
                  let content = cellValue;

                  if (col.formatter) {
                    content = col.formatter(cellValue, row);
                  }

                  if (col.className) {
                    className = typeof col.className === 'function' ? col.className(cellValue) : col.className;
                  }

                  if (col.isBadge && col.getBadgeProps) {
                    const { level, color } = col.getBadgeProps(row);
                    content = (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${color}`}>
                        {level}
                      </span>
                    );
                  }

                  if (col.withCrown && rowIndex === 0) {
                    content = (
                      <div className="flex items-center gap-2">
                        <span>{row.name}</span>
                        <Crown className="w-4 h-4 text-yellow-500" />
                      </div>
                    );
                  }

                  return (
                    <td key={col.key} className={`px-4 py-3 ${col.isBold ? 'font-medium' : ''} ${className}`}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function imported from utils
const formatTimeForDisplay = (seconds) => {
  if (!seconds || seconds === 0) return '0m';
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) return `${hrs}h ${mins % 60}m`;
  return `${mins}m`;
};

// Icons for the table header
import { Award, TrendingUp } from 'lucide-react';

export default PerformanceTable;