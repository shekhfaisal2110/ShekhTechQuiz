// src/components/analytics/TabNavigation.js
import React from 'react';
import { BookOpen, Users } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => setActiveTab('certificates')}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
          activeTab === 'certificates'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200'
            : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
        }`}
      >
        <BookOpen className="w-4 h-4" />
        <span>Certificate Analytics</span>
      </button>
      <button
        onClick={() => setActiveTab('users')}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
          activeTab === 'users'
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-200'
            : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
        }`}
      >
        <Users className="w-4 h-4" />
        <span>User Analytics</span>
      </button>
    </div>
  );
};

export default TabNavigation;