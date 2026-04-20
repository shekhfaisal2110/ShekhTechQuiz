// src/components/UserHistory/StatsDashboard/StatCard.jsx
import React from 'react';
import { User, TrendingUp, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const iconMap = {
  users: User,
  attempts: TrendingUp,
  passed: CheckCircle,
  failed: AlertTriangle,
  time: Clock
};

const colorMap = {
  users: 'text-indigo-500',
  attempts: 'text-emerald-500',
  passed: 'text-green-500',
  failed: 'text-red-500',
  time: 'text-orange-500'
};

const bgColorMap = {
  users: 'text-indigo-700',
  attempts: 'text-emerald-700',
  passed: 'text-green-700',
  failed: 'text-red-700',
  time: 'text-orange-700'
};

export default function StatCard({ title, value, type, onClick, isButton = true }) {
  const Icon = iconMap[type] || User;
  const textColor = colorMap[type] || 'text-gray-500';
  const bgColor = bgColorMap[type] || 'text-gray-700';

  const cardContent = (
    <>
      <Icon className={`w-6 h-6 ${textColor} mb-2 mx-auto`} />
      <p className={`text-lg font-black ${bgColor} text-center`}>{value}</p>
      <p className="text-xs font-semibold text-gray-600 text-center">{title}</p>
    </>
  );

  if (!isButton) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
        {cardContent}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4 hover:scale-105 transition-transform duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={title}
    >
      {cardContent}
    </button>
  );
}