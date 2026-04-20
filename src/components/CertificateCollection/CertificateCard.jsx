import React from 'react';
import { Award, User, Calendar, Hash, Eye, Download, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CertificateCard({
  cert,
  isSelected,
  handleSelectCertificate,
  getPerformanceLevel,
  formatDate,
  isDownloading,
  certToDownload,
  setCertToDownload,
  setSelectedCertificate,
  moveToRecycleBin
}) {
  const performance = getPerformanceLevel(cert.percentage);
  const PerformanceIcon = performance.icon;

  return (
    <div
      key={cert.id}
      className={`group bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border overflow-hidden hover:shadow-xl sm:hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 ${
        isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200/50'
      }`}
    >
      <div className="relative h-36 sm:h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
          <Award className="w-12 sm:w-16 h-12 sm:h-16 text-indigo-400" />
        </div>

        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelectCertificate(cert.id)}
              className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-600 rounded bg-white/80 backdrop-blur-sm border-2 border-white shadow-md"
            />
          </label>
        </div>

        <div
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br ${performance.color} rounded-full flex items-center justify-center shadow-md`}
        >
          <PerformanceIcon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-300">
            {cert.courseTitle}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
            <p className="text-xs sm:text-sm font-semibold text-gray-600 truncate">{cert.userName || cert.name || 'Student'}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
            <span className="text-gray-500">{formatDate(cert.date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hash className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
            <span className="text-gray-500 font-mono text-xxs sm:text-xs truncate">{cert.certificateNumber}</span>
          </div>
        </div>

        <div
          className={`bg-gradient-to-r ${performance.bgColor} rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 border ${performance.borderColor}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg sm:text-2xl font-black text-gray-800">{cert.score}/{cert.total}</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-600">Score</p>
            </div>
            <div className="text-right">
              <p className="text-lg sm:text-2xl font-black text-gray-800">{cert.percentage}%</p>
              <p className={`text-xs sm:text-sm font-bold ${performance.textColor}`}>{performance.level}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <Link to={`/certificate/${cert.id}`} className="hidden lg:flex w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl items-center justify-center space-x-2 text-xs sm:text-sm">
            <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span>View Certificate</span>
          </Link>

          <button
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-md hover:shadow-xl flex items-center justify-center space-x-2 text-xs sm:text-sm"
            onClick={() => setCertToDownload(cert)}
            disabled={isDownloading && certToDownload?.id === cert.id}
          >
            {isDownloading && certToDownload?.id === cert.id ? (
              <>
                <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="hidden xs:inline">Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>Download PNG</span>
              </>
            )}
          </button>

          {!isSelected && (
            <button
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center space-x-2 text-xs sm:text-sm"
              onClick={() => moveToRecycleBin([cert.id])}
            >
              <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}