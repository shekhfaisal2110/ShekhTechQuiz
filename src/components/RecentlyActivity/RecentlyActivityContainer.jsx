// src/components/activity/RecentlyActivityContainer.jsx
import React, { useState, useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
import ActivityFilters from './ActivityFilters';
import ActivitySummaryStats from './ActivitySummaryStats';
import EmptyActivityState from './EmptyActivityState';
import ActivityItem from './ActivityItem';
import ActivityHeader from './ActivityHeader';

const RecentlyActivityContainer = ({
  activities,
  filteredActivities,
  filter,
  setFilter,
  selectedUser,
  setSelectedUser,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeleton for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getActivityBadge = (type) => {
    switch (type) {
      case 'certificate_earned':
        return { label: 'Earned', color: 'bg-yellow-100 text-yellow-800' };
      case 'certificate_deleted':
        return { label: 'Deleted', color: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Activity', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'certificate_earned':
        return <span className="text-yellow-600">🏆</span>;
      case 'certificate_deleted':
        return <span className="text-red-600">🗑️</span>;
      default:
        return <span className="text-gray-500">🕒</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-6xl mx-auto">
          {/* Skeleton: Header */}
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-3/4 max-w-2xl"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </div>

          {/* Skeleton: User Filter Chip (hidden during load) */}
          {/* We skip rendering user chip skeleton since it's conditional */}

          {/* Skeleton: Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          {/* Skeleton: Activity Items */}
          <div className="space-y-5 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-48"></div>
                    </div>
                  </div>
                  <div className="h-5 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="h-5 w-20 bg-gray-200 rounded"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Skeleton: Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ActivityHeader />

        {/* User Filter Chip */}
        {selectedUser && (
          <div className="mb-4 flex items-center">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
              <span className="mr-2">👤</span>
              Viewing: <span className="font-semibold ml-1">{selectedUser}</span>
            </span>
            <button
              onClick={() => setSelectedUser(null)}
              className="ml-3 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full"
              title="Clear user filter"
              aria-label="Clear user filter"
            >
              ✕
            </button>
          </div>
        )}

        {/* Filters */}
        <ActivityFilters
          filter={filter}
          setFilter={setFilter}
          activities={activities}
        />

        {/* Feed or Empty State */}
        {filteredActivities.length === 0 ? (
          <EmptyActivityState
            selectedUser={selectedUser}
            filter={filter}
          />
        ) : (
          <div className="space-y-5">
            {filteredActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                formatTimeAgo={formatTimeAgo}
                getActivityBadge={getActivityBadge}
                getIcon={getIcon}
                setSelectedUser={setSelectedUser}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <ActivitySummaryStats
          activities={activities}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default RecentlyActivityContainer;