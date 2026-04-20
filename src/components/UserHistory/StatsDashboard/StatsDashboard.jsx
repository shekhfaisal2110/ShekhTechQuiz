// src/components/UserHistory/StatsDashboard/StatsDashboard.jsx
import React from 'react';
import StatCard from './StatCard';
import { X } from 'lucide-react';

const formatDate = (dateString) => {
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

const formatTime = (seconds) => {
  if (!seconds || seconds === 0) return '0m';
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) return `${hrs}h ${mins % 60}m`;
  return `${mins}m`;
};

export default function StatsDashboard({ userAttempts, detailedStatView, setDetailedStatView }) {
  // Function to get detailed data for a specific stat
  const getDetailedData = (statType) => {
    switch (statType) {
      case 'users':
        return userAttempts.map(user => ({
          ...user,
          type: 'User',
          detail: `${user.totalAttempts} total attempts (${user.passedAttempts} passed, ${user.failedAttempts} failed)`
        }));
      case 'attempts':
        return userAttempts.flatMap(user => 
          user.attempts.map(attempt => ({
            ...attempt,
            userName: user.userName,
            type: 'Attempt',
            detail: `Attempt #${attempt.attemptNumber} on ${formatDate(attempt.date)}`
          }))
        );
      case 'passed':
        return userAttempts.flatMap(user => 
          user.attempts
            .filter(attempt => attempt.percentage >= 70)
            .map(attempt => ({
              ...attempt,
              userName: user.userName,
              type: 'Passed Attempt',
              detail: `Scored ${attempt.percentage}% on ${formatDate(attempt.date)}`
            }))
        );
      case 'failed':
        return userAttempts.flatMap(user => 
          user.attempts
            .filter(attempt => attempt.percentage < 70)
            .map(attempt => ({
              ...attempt,
              userName: user.userName,
              type: 'Failed Attempt',
              detail: `Scored ${attempt.percentage}% on ${formatDate(attempt.date)}`
            }))
        );
      default:
        return [];
    }
  };

  if (detailedStatView) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {detailedStatView === 'users' && 'All Users'}
            {detailedStatView === 'attempts' && 'All Attempts'}
            {detailedStatView === 'passed' && 'Passed Attempts'}
            {detailedStatView === 'failed' && 'Failed Attempts'}
          </h2>
          <button
            onClick={() => setDetailedStatView(null)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close detailed view"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {getDetailedData(detailedStatView).map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {detailedStatView === 'users' ? (
                <>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{item.userName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.detail}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div className="bg-white p-2 rounded border">
                      <div className="font-medium text-gray-700">Total Attempts</div>
                      <div className="text-lg font-bold text-indigo-600">{item.totalAttempts}</div>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="font-medium text-gray-700">Passed</div>
                      <div className="text-lg font-bold text-green-600">{item.passedAttempts}</div>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="font-medium text-gray-700">Failed</div>
                      <div className="text-lg font-bold text-red-600">{item.failedAttempts}</div>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="font-medium text-gray-700">Avg Score</div>
                      <div className="text-lg font-bold text-purple-600">{item.avgScore}%</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{item.courseTitle}</h3>
                      <p className="text-sm text-gray-600">{item.detail}</p>
                      <p className="text-xs text-gray-500">By: {item.userName}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-gray-800">{item.score}/{item.total}</div>
                      <div className={`text-sm font-medium ${
                        item.percentage >= 70 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Certificate ID: {item.certificateNumber}</span>
                    <span>{formatTime(item.timeSpent || 0)}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-6">
      <StatCard
        title="Total Users"
        value={userAttempts.length}
        type="users"
        onClick={() => setDetailedStatView('users')}
      />
      <StatCard
        title="Total Attempts"
        value={userAttempts.reduce((sum, u) => sum + u.totalAttempts, 0)}
        type="attempts"
        onClick={() => setDetailedStatView('attempts')}
      />
      <StatCard
        title="Passed Attempts"
        value={userAttempts.reduce((sum, u) => sum + u.passedAttempts, 0)}
        type="passed"
        onClick={() => setDetailedStatView('passed')}
      />
      <StatCard
        title="Failed Attempts"
        value={userAttempts.reduce((sum, u) => sum + u.failedAttempts, 0)}
        type="failed"
        onClick={() => setDetailedStatView('failed')}
      />
      <StatCard
        title="Total Time"
        value={formatTime(userAttempts.reduce((sum, u) => sum + u.totalTimeSpent, 0))}
        type="time"
        isButton={false}
      />
    </div>
  );
}