// src/components/UserHistory/UserModal/RecentActivity.jsx
import React from 'react';

export default function RecentActivity({ attempts }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-2">Recent Activity</h3>
      <div className="space-y-2">
        {attempts.slice(0, 5).map((attempt, index) => (
          <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
            <span className="text-sm text-gray-600">{attempt.courseTitle}</span>
            <span className={`text-sm font-medium ${
              attempt.percentage >= 70 ? 'text-green-600' : 'text-red-600'
            }`}>
              {attempt.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}