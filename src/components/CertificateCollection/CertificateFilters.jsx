import React from 'react';
import { Search } from 'lucide-react';

export default function CertificateFilters({ searchTerm, setSearchTerm, filterBy, setFilterBy, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col gap-4 mb-6 sm:mb-8">
      <div className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-md w-full">
        <div className="flex items-center">
          <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search certificates or names..."
            className="w-full outline-none text-sm sm:text-base"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <select
          className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-md text-sm sm:text-base w-full sm:w-auto"
          value={filterBy}
          onChange={e => setFilterBy(e.target.value)}
        >
          <option value="all">All Certificates</option>
          <option value="exceptional">Exceptional</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
        </select>
        <select
          className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-md text-sm sm:text-base w-full sm:w-auto"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="score">Sort by Score</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
    </div>
  );
}