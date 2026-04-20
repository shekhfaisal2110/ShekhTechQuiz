// src/components/UserHistory/UserModal/UserStats.jsx
import React from 'react';

export default function UserStats({ user }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-2">Statistics</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Attempts:</span>
          <span className="font-bold">{user.totalAttempts}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Passed Attempts:</span>
          <span className="font-bold text-green-600">{user.passedAttempts}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Failed Attempts:</span>
          <span className="font-bold text-red-600">{user.failedAttempts}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Pass Rate:</span>
          <span className="font-bold">
            {user.totalAttempts > 0 
              ? Math.round((user.passedAttempts / user.totalAttempts) * 100) 
              : 0}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Average Score:</span>
          <span className="font-bold">{user.avgScore}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Best Score:</span>
          <span className="font-bold">{user.bestScore}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Time Spent:</span>
          <span className="font-bold">{user.totalTimeSpent}</span> {/* Format this */}
        </div>
      </div>
    </div>
  );
}