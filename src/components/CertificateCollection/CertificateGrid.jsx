import React from 'react';
import CertificateCard from './CertificateCard';

export default function CertificateGrid({
  certificates,
  selectedCerts,
  handleSelectCertificate,
  getPerformanceLevel,
  formatDate,
  isDownloading,
  certToDownload,
  setCertToDownload,
  setSelectedCertificate,
  moveToRecycleBin
}) {
  if (certificates.length === 0) {
    return null; // Handled by EmptyState
  }

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {certificates.map(cert => (
        <CertificateCard
          key={cert.id}
          cert={cert}
          isSelected={selectedCerts.has(cert.id)}
          handleSelectCertificate={handleSelectCertificate}
          getPerformanceLevel={getPerformanceLevel}
          formatDate={formatDate}
          isDownloading={isDownloading}
          certToDownload={certToDownload}
          setCertToDownload={setCertToDownload}
          setSelectedCertificate={setSelectedCertificate}
          moveToRecycleBin={moveToRecycleBin}
        />
      ))}
    </div>
  );
}