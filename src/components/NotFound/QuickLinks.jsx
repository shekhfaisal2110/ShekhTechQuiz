// components/NotFound/QuickLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Star, AlertTriangle, RefreshCw, Compass } from 'lucide-react';

export default function QuickLinks() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
        <Compass className="w-5 h-5 text-purple-600" />
        <span>Popular Destinations</span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/"
          className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-200 group"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
            <Home className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Home</span>
        </Link>
        
        <Link
          to="/certificates"
          className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-indigo-50 transition-colors duration-200 group"
        >
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
            <Star className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Certificates</span>
        </Link>
        
        <Link
          to="/QuizFAQ"
          className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-green-50 transition-colors duration-200 group"
        >
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
            <AlertTriangle className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">FAQ</span>
        </Link>
        
        <button
          onClick={() => window.location.reload()}
          className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-200 group"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
            <RefreshCw className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Refresh</span>
        </button>
      </div>
    </div>
  );
}