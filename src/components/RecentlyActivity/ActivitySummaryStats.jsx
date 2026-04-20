// src/components/activity/ActivitySummaryStats.jsx
import React from 'react';
import { FaHistory } from 'react-icons/fa';

const ActivitySummaryStats = ({ activities, selectedUser }) => {
  const earnedCount = activities.filter(a => a.type === 'certificate_earned').length;
  const deletedCount = activities.filter(a => a.type === 'certificate_deleted').length;
  const totalCount = activities.length;

  const userEarned = selectedUser
    ? activities.filter(a => a.type === 'certificate_earned' && a.user.name === selectedUser).length
    : earnedCount;
  const userDeleted = selectedUser
    ? activities.filter(a => a.type === 'certificate_deleted' && a.user.name === selectedUser).length
    : deletedCount;
  const userTotal = selectedUser
    ? activities.filter(a => a.user.name === selectedUser).length
    : totalCount;

  return (
    <div className="mt-8 hidden sm:block">
      <div className="bg-white rounded-xl shadow p-5 sm:p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <FaHistory className="mr-2 text-indigo-600" />
          {selectedUser ? `${selectedUser}'s Activity` : 'Activity Summary'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-yellow-700">{userEarned}</div>
            <div className="text-xs sm:text-sm font-medium text-yellow-800 mt-1">Certificates Earned</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-red-700">{userDeleted}</div>
            <div className="text-xs sm:text-sm font-medium text-red-800 mt-1">Certificates Deleted</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-gray-700">{userTotal}</div>
            <div className="text-xs sm:text-sm font-medium text-gray-800 mt-1">Total Activities</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummaryStats;