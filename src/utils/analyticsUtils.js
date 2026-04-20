// src/utils/analyticsUtils.js

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

export const getPerformanceLevel = (percentage) => {
  if (percentage >= 90) return 'Exceptional';
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 70) return 'Good';
  return 'Needs Improvement';
};

export const formatTime = (seconds) => {
  if (!seconds || seconds === 0) return '0m 0s';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

export const formatTimeForDisplay = (seconds) => {
  if (!seconds || seconds === 0) return '0m';
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) return `${hrs}h ${mins % 60}m`;
  return `${mins}m`;
};