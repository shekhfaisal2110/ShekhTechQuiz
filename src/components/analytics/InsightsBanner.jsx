// src/components/analytics/InsightsBanner.js
import React from 'react';
import { Info } from 'lucide-react';
import { formatTimeForDisplay } from '../../utils/analyticsUtils';

const InsightsBanner = ({ analyticsData }) => {
  if (!analyticsData) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-8 border border-blue-200">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-blue-800 mb-1">Key Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {analyticsData.certificates.length} courses
              </span>
              <span>available for learners</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {analyticsData.overall.passRate}% pass rate
              </span>
              <span>across all assessments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                {analyticsData.users.length} active users
              </span>
              <span>engaged with the platform</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {formatTimeForDisplay(analyticsData.overall.avgTimePerAttempt)} avg time
              </span>
              <span>per assessment attempt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsBanner;