// src/components/UserHistory/Controls/SearchAndFilterControls.jsx
import React from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';

export default function SearchAndFilterControls({
  searchTerm,
  setSearchTerm,
  filterByStatus,
  setFilterByStatus,
  sortBy,
  setSortBy,
  sortDirection,
  toggleSortDirection
}) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by user name..."
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Filters and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="bg-white px-3 py-2 border border-gray-300 rounded-lg text-sm"
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
          >
            <option value="all">All Attempts</option>
            <option value="passed">Passed Only</option>
            <option value="failed">Failed Only</option>
          </select>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              className="bg-white px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="totalAttempts">Total Attempts</option>
              <option value="passedAttempts">Passed Attempts</option>
              <option value="failedAttempts">Failed Attempts</option>
              <option value="avgScore">Average Score</option>
              <option value="bestScore">Best Score</option>
            </select>
            <button
              onClick={toggleSortDirection}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sort direction"
            >
              {sortDirection === 'asc' ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}