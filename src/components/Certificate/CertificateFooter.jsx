import React from 'react';
import SignatureSVG from './SignatureSVG';

export default function CertificateFooter({ date, certificateNumber }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end mt-6 flex-shrink-0 px-2 sm:px-0">
      {/* Date */}
      <div className="text-center sm:text-left">
        <p className="text-xs sm:text-sm text-gray-500 mb-1" style={{ userSelect: 'none' }}>Date:</p>
        <p className="text-sm sm:text-base font-bold text-gray-800 truncate" style={{ userSelect: 'none' }}>{date}</p>
      </div>

      {/* Signature - Center */}
      <div className="text-center">
        <div className="mb-2">
          <SignatureSVG />
        </div>
        <div className="w-24 h-0.5 bg-gray-400 mx-auto mb-2"></div>
        <p className="text-xs sm:text-sm text-gray-600 font-bold truncate" style={{ userSelect: 'none' }}>ShaikhTech Academy</p>
        <p className="text-xs sm:text-xs text-gray-500" style={{ userSelect: 'none' }}>Program Director</p>
      </div>

      {/* Certificate Number */}
      <div className="text-center sm:text-right">
        <p className="text-xs sm:text-sm text-gray-500 mb-1" style={{ userSelect: 'none' }}>Certificate No:</p>
        <p className="text-sm sm:text-base font-bold text-gray-800 font-mono truncate mb-3" style={{ userSelect: 'none' }}>
          {certificateNumber}
        </p>
      </div>
    </div>
  );
}