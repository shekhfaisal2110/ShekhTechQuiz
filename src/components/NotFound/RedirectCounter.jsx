// components/NotFound/RedirectCounter.jsx
import React from 'react';
import { Clock } from 'lucide-react';

export default function RedirectCounter({ countdown, isRedirecting }) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mb-8 border-2 border-purple-200">
      <div className="flex items-center justify-center space-x-4">
        <div className="relative">
          <div className={`w-16 h-16 rounded-full border-4 border-purple-200 flex items-center justify-center ${
            countdown <= 2 ? 'animate-pulse border-red-400' : ''
          }`}>
            <span className={`text-2xl font-bold ${
              countdown <= 2 ? 'text-red-600' : 'text-purple-600'
            }`}>
              {countdown}
            </span>
          </div>
          <div className="absolute -inset-2 rounded-full border-2 border-purple-300 animate-ping opacity-30"></div>
        </div>
        <div className="text-center">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className={`w-5 h-5 ${countdown <= 2 ? 'text-red-500' : 'text-purple-500'}`} />
            <h3 className={`text-lg font-bold ${countdown <= 2 ? 'text-red-600' : 'text-purple-600'}`}>
              Auto-Redirect Active
            </h3>
          </div>
          <p className="text-gray-600">
            Taking you back to home in <span className="font-bold text-purple-600">{countdown}</span> seconds
          </p>
        </div>
      </div>
    </div>
  );
}