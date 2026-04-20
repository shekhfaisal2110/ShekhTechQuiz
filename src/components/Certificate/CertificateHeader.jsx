import React from 'react';
import ShaikhTechLogo from './ShaikhTechLogo';

export default function CertificateHeader() {
  return (
    <div className="text-center flex-shrink-0">
      <ShaikhTechLogo />
      <div className="mt-4 space-y-2">
        <h1
          className="text-2xl sm:text-3xl font-bold text-gray-600 tracking-wider"
          style={{ fontFamily: "serif", userSelect: 'none' }}
        >
          Certificate of Achievement
        </h1>
        <p className="text-sm sm:text-base text-gray-600 font-semibold" style={{ userSelect: 'none' }}>
          Congratulations!
        </p>
      </div>
    </div>
  );
}