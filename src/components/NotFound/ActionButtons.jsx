// components/NotFound/ActionButtons.jsx
import React from 'react';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ActionButtons({ isRedirecting, onManualRedirect, onGoBack }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        onClick={onManualRedirect}
        className="group flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        disabled={isRedirecting}
      >
        {isRedirecting ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        )}
        <span>{isRedirecting ? 'Redirecting...' : 'Go Home Now'}</span>
      </button>
      
      <button
        onClick={onGoBack}
        className="group flex items-center space-x-3 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-gray-200"
        disabled={isRedirecting}
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span>Go Back</span>
      </button>
    </div>
  );
}