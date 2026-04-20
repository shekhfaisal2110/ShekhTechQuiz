// components/NotFound/NotFoundContent.jsx
import React from 'react';
import { MapPin, Search } from 'lucide-react';

export default function NotFoundContent() {
  return (
    <>
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600">
            Looks like this page got lost in cyberspace!
          </p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <p className="text-xl text-gray-700 leading-relaxed">
          Don't worry, even the best explorers sometimes take wrong turns. 
          The page you're looking for might have been moved, deleted, or is temporarily unavailable.
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Search className="w-5 h-5" />
          <span>But we're here to get you back on track!</span>
        </div>
      </div>
    </>
  );
}