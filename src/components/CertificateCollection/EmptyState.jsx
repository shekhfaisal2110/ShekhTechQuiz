import React from 'react';
import { Archive } from 'lucide-react';

export default function EmptyState({ searchTerm, setSearchTerm, setFilterBy }) {
  return (
    <div className="text-center py-12 sm:py-20">
      <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-xl">
        <Archive className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">No Certificates Found</h3>
      <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-2">
        {searchTerm ? 'Try adjusting your search terms or filters.' : "You don't have any certificates yet. Complete a quiz to earn one!"}
      </p>
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            setFilterBy('all');
          }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl text-sm sm:text-base"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}