// src/components/activity/ActivityFilters.jsx
import React from 'react';
import { FaHistory, FaAward, FaTrash } from 'react-icons/fa';

const ActivityFilters = ({ filter, setFilter, activities }) => {
  const tabs = [
    { key: 'all', label: 'All Activities', icon: FaHistory, count: activities.length },
    { key: 'earned', label: 'Certificates Earned', icon: FaAward, count: activities.filter(a => a.type === 'certificate_earned').length },
    { key: 'deleted', label: 'Certificates Deleted', icon: FaTrash, count: activities.filter(a => a.type === 'certificate_deleted').length },
  ];

  return (
    <div className="mb-6 overflow-x-auto pb-2">
      <div className="flex space-x-2 min-w-max sm:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center space-x-2 whitespace-nowrap px-4 py-2.5 rounded-lg font-medium transition-all ${
              filter === tab.key
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            <span
              className={`flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full ${
                filter === tab.key
                  ? 'bg-white text-indigo-600'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityFilters;