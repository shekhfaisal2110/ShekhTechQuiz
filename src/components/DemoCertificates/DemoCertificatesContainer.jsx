// components/DemoCertificates/DemoCertificatesContainer.jsx
import React, { useState, useEffect } from 'react';
import DemoCertificatesData from '../../data/demoCertificates';
import DemoHeader, { DemoHeaderSkeleton } from './DemoHeader';
import CertificateCard, { CertificateCardSkeleton } from './CertificateCard';
import CertificateViewer from '../CertificateViewer/CertificateViewer';
import { getPerformanceLevel } from '../../hooks/usePerformanceLevel'; // ✅ Now a plain function

export default function DemoCertificatesContainer() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
          <DemoHeaderSkeleton />
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <CertificateCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
        <DemoHeader />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DemoCertificatesData.map((cert) => {
            const performance = getPerformanceLevel(cert.percentage); // ✅ Safe function call

            return (
              <CertificateCard
                key={cert.id}
                cert={cert}
                performance={performance}
                formatDate={formatDate}
                onClick={() => setSelectedCertificate(cert)}
              />
            );
          })}
        </div>
      </div>

      {selectedCertificate && (
        <CertificateViewer
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}