// src/components/activity/ActivityItem.jsx
import React from 'react';
import { FaClock } from 'react-icons/fa';

const ActivityItem = ({ activity, formatTimeAgo, getActivityBadge, getIcon, setSelectedUser }) => {
  const badge = getActivityBadge(activity.type);
  const fullDate = activity.timestamp.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
          <div
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0 shadow-sm mb-3 sm:mb-0 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: activity.user.bgColor }}
            onClick={() => setSelectedUser(activity.user.name)}
            title={`View all activity by ${activity.user.name}`}
          >
            {activity.user.initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
              <div className="flex items-center flex-wrap gap-2">
                <h4
                  className="text-sm sm:text-base font-bold text-gray-900 cursor-pointer hover:text-indigo-600"
                  onClick={() => setSelectedUser(activity.user.name)}
                >
                  {activity.user.name}
                </h4>
                <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2 sm:mt-0">
                <FaClock className="mr-1 text-gray-400 flex-shrink-0" />
                <span className="truncate">{formatTimeAgo(activity.timestamp)}</span>
                <span className="ml-1 hidden sm:inline text-gray-400">|</span>
                <span className="ml-1 hidden sm:inline text-gray-500">{fullDate}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-3 flex items-start space-x-2">
              <span className="mt-0.5 opacity-80 flex-shrink-0">{getIcon(activity.type)}</span>
              <span className="flex-1">{activity.message}</span>
            </p>

            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
                <div>
                  <span className="font-medium text-gray-600">Course:</span>{' '}
                  <span className="text-gray-900 break-words">{activity.meta.courseTitle}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Certificate ID:</span>{' '}
                  <span className="font-mono text-gray-900 break-all">{activity.meta.certificateNumber}</span>
                </div>
                {activity.meta.score !== undefined && (
                  <>
                    <div>
                      <span className="font-medium text-gray-600">Score:</span>{' '}
                      <span className="font-bold text-indigo-600">
                        {activity.meta.score}/{activity.meta.total}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Percentage:</span>{' '}
                      <span
                        className={`font-bold ${
                          activity.meta.percentage >= 90
                            ? 'text-green-600'
                            : activity.meta.percentage >= 70
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {activity.meta.percentage}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;