import React from 'react';
import { X, FileText } from 'lucide-react';
import CertificateDOM from '../../pages/Certificate'; // Adjust path as needed

export default function CertificateModal({
  selectedCertificate,
  setSelectedCertificate,
  setCertToDownload,
  isDownloading,
  certToDownload
}) {
  if (!selectedCertificate) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-auto relative">
        <div className="p-4 sm:p-8">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-inner w-full">
              <div className="w-full max-w-4xl sm:max-w-5xl mx-auto">
                <CertificateDOM
                  name={selectedCertificate.userName || selectedCertificate.name || 'Student'}
                  courseTitle={selectedCertificate.courseTitle}
                  score={selectedCertificate.score}
                  total={selectedCertificate.total}
                  percentage={selectedCertificate.percentage}
                  date={selectedCertificate.date}
                  certificateNumber={selectedCertificate.certificateNumber}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setCertToDownload(selectedCertificate)}
              disabled={isDownloading && certToDownload?.id === selectedCertificate.id}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-md hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base w-full sm:w-auto"
            >
              {isDownloading && certToDownload?.id === selectedCertificate.id ? (
                <>
                  <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating PNG...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>Download PNG</span>
                </>
              )}
            </button>
            <button
              onClick={() => setSelectedCertificate(null)}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl text-sm sm:text-base w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}