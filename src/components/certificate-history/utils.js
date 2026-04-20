// src/components/certificate-history/utils.js
import { Crown, Medal, Award, Target } from 'lucide-react';

export const getPerformanceLevel = (percentage) => {
  if (percentage >= 90) return {
    level: 'Exceptional',
    icon: Crown,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    bgClass: 'bg-yellow-100'
  };
  if (percentage >= 80) return {
    level: 'Excellent',
    icon: Medal,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    bgClass: 'bg-purple-100'
  };
  if (percentage >= 70) return {
    level: 'Good',
    icon: Award,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'from-emerald-50 to-green-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    bgClass: 'bg-emerald-100'
  };
  return {
    level: 'Needs Improvement',
    icon: Target,
    color: 'from-red-500 to-red-600',
    bgColor: 'from-red-50 to-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    bgClass: 'bg-red-100'
  };
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown Date';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Invalid Date';
  }
};

export const formatTime = (seconds) => {
  if (!seconds || seconds === 0) return '0m';
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) return `${hrs}h ${mins % 60}m`;
  return `${mins}m`;
};