import React from 'react';
import { Award } from 'lucide-react';
import { TechLogos } from '../CertificateViewer/techIcons';

export default function CertificateBody({ name, courseTitle, score, total, percentage }) {
  return (
    <div className="text-center flex-grow flex flex-col justify-center space-y-4 py-4 px-2 sm:px-0">
      {/* Name Section */}
      <div className="mb-3">
        <h3 className="text-3xl sm:text-4xl font-bold text-cyan-600 px-4 py-2 relative truncate" style={{ userSelect: 'none' }}>
          {name}
        </h3>
        <div className="w-36 sm:w-48 h-0.5 bg-gray-400 mx-auto mt-2"></div>
      </div>

      <p className="text-base text-gray-700" style={{ userSelect: 'none' }}>
        You have successfully completed our quiz competition
      </p>

      {/* Course Title */}
      <div className="mb-3 px-4">
        <h4 className="text-xl sm:text-2xl font-bold text-black leading-tight truncate" style={{ userSelect: 'none' }}>
          {courseTitle}
        </h4>
      </div>

      <TechLogos courseTitle={courseTitle} />

      {/* Performance Badge */}
      <div className="flex justify-center mb-3">
        <div className="relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-2 border-orange-300">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="absolute -inset-1 border-2 border-dashed border-orange-300 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Score Display */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 max-w-xs mx-auto border border-gray-200">
        <p className="text-base sm:text-lg font-bold text-gray-800 mb-1 truncate" style={{ userSelect: 'none' }}>
          Score: {score}/{total} ({percentage}%)
        </p>
        <p className="text-xs sm:text-sm text-gray-600" style={{ userSelect: 'none' }}>Excellent Performance!</p>
      </div>
    </div>
  );
}