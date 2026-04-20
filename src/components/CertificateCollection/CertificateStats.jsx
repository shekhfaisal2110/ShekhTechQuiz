import React from 'react';
import { Trophy, BarChart3, Clock, Crown } from 'lucide-react';

export default function CertificateStats({ totalCertificates, averageScore, totalStudyTime, exceptionalCount, formatTime }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-12">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-center">
        <Trophy className="w-8 sm:w-12 h-8 sm:h-12 text-indigo-500 mb-2" />
        <p className="text-2xl sm:text-3xl font-black text-indigo-700">{totalCertificates}</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-600">Total Certificates</p>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-center">
        <BarChart3 className="w-8 sm:w-12 h-8 sm:h-12 text-emerald-500 mb-2" />
        <p className="text-2xl sm:text-3xl font-black text-emerald-700">{averageScore}%</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-600">Average Score</p>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-center">
        <Clock className="w-8 sm:w-12 h-8 sm:h-12 text-purple-500 mb-2" />
        <p className="text-2xl sm:text-3xl font-black text-purple-700">{formatTime(totalStudyTime)}</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-600">Study Time</p>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 hover:scale-105 transition-transform duration-300 flex flex-col items-center">
        <Crown className="w-8 sm:w-12 h-8 sm:h-12 text-yellow-500 mb-2" />
        <p className="text-2xl sm:text-3xl font-black text-yellow-700">{exceptionalCount}</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-600">Exceptional</p>
      </div>
    </div>
  );
}