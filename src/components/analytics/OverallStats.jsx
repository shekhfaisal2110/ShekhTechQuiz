// src/components/analytics/OverallStats.js
import React from 'react';
import {
  FileText, TrendingUp, CheckCircle, ArrowUpRight, XCircle, ArrowDownRight,
  Star, Target, Clock, Zap, Shield, Crown
} from 'lucide-react';
import { formatTimeForDisplay } from '../../utils/analyticsUtils';

const OverallStats = ({ overall }) => {
  if (!overall) return null;

  const stats = [
    {
      label: 'Total Attempts',
      value: overall.totalAttempts,
      icon: FileText,
      color: 'indigo',
      trendIcon: TrendingUp
    },
    {
      label: 'Passed',
      value: overall.passedAttempts,
      icon: CheckCircle,
      color: 'green',
      trendIcon: ArrowUpRight
    },
    {
      label: 'Failed',
      value: overall.failedAttempts,
      icon: XCircle,
      color: 'red',
      trendIcon: ArrowDownRight
    },
    {
      label: 'Average Score',
      value: `${overall.avgScore}%`,
      icon: Star,
      color: 'yellow',
      trendIcon: Target
    },
    {
      label: 'Total Time',
      value: formatTimeForDisplay(overall.totalTimeSpent),
      icon: Clock,
      color: 'orange',
      trendIcon: Zap
    },
    {
      label: 'Pass Rate',
      value: `${overall.passRate}%`,
      icon: Shield,
      color: 'purple',
      trendIcon: Crown
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-white/90 backdrop-blur-xl rounded-xl shadow-md border border-gray-200/50 p-4 hover:scale-105 transition-transform duration-300 group`}>
          <div className="flex items-center justify-between">
            <stat.icon className={`w-6 h-6 text-${stat.color}-500 group-hover:scale-110 transition-transform`} />
            <div className={`bg-${stat.color}-100 p-1 rounded-full group-hover:bg-${stat.color}-200 transition-colors`}>
              <stat.trendIcon className={`w-4 h-4 text-${stat.color}-600`} />
            </div>
          </div>
          <p className={`text-2xl font-black text-${stat.color}-700 mt-2`}>{stat.value}</p>
          <p className="text-xs font-semibold text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default OverallStats;