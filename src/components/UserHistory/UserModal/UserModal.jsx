// src/components/UserHistory/UserModal/UserModal.jsx
import React from 'react';
import { XCircle } from 'lucide-react';
import UserStats from './UserStats';
import RecentActivity from './RecentActivity';
import AttemptHistory from './AttemptHistory';

export default function UserModal({
  user,
  filterByStatus,
  onFilterChange,
  onDownload,
  isDownloading,
  onClose
}) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              User Activity: {user.userName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XCircle className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <UserStats user={user} />
              <RecentActivity attempts={user.attempts} />
            </div>
            <AttemptHistory
              attempts={user.attempts}
              filterByStatus={filterByStatus}
              onFilterChange={onFilterChange}
              onDownload={onDownload}
              isDownloading={isDownloading}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}