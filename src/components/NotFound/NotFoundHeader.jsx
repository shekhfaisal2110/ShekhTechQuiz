// components/NotFound/NotFoundHeader.jsx
import React from 'react';
import { Compass } from 'lucide-react';

export default function NotFoundHeader({ isRedirecting }) {
  return (
    <div className="relative mb-12">
      <div className="flex items-center justify-center space-x-4 mb-8">
        {/* Animated 404 Numbers */}
        <div className="relative">
          <span className="text-9xl sm:text-[12rem] font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            4
          </span>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        
        {/* Animated Compass in place of 0 */}
        <div className="relative mx-8">
          <div className={`w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-2xl ${
            !isRedirecting ? 'animate-spin-slow' : ''
          }`}>
            <Compass className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
        </div>
        
        <div className="relative">
          <span className="text-9xl sm:text-[12rem] font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse delay-300">
            4
          </span>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-ping delay-700"></div>
        </div>
      </div>
    </div>
  );
}