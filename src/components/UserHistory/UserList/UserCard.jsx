// src/components/UserHistory/UserList/UserCard.jsx
import React from 'react';
import { User, CheckCircle, AlertTriangle, Crown, Clock } from 'lucide-react';

export default function UserCard({ user, onOpenDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">{user.userName}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs text-gray-500">{user.totalAttempts} total attempts</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{user.passedAttempts} passed</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">{user.failedAttempts} failed</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800 text-lg">{user.avgScore}%</div>
            <div className="text-sm text-gray-600">Avg Score</div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{user.totalAttempts}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>{user.passedAttempts}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>{user.failedAttempts}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span>{user.bestScore}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{user.totalTimeSpent} second</span> {/* You should format this */}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onOpenDetails}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}