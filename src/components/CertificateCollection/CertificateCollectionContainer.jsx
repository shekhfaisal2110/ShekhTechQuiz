import React, { useState, useRef, useEffect } from 'react';
import {
  Download, Trash2, Award, Calendar, Trophy, Medal, Crown, Eye,
  Search, Archive, BarChart3, Clock, CheckCircle, User, Hash, FileText,
  RefreshCw, Recycle, Star, MessageSquare, X, ThumbsUp
} from 'lucide-react';
import RatingForm from '../../pages/RatingForm';
import CertificateDOMDownloader from '../CertificateDownload/CertificatePDFDownloader';
import {
  getCertificates,
  setCertificates,
  moveToRecycleBin as moveToRecycleBinUtil,
  getRecycledCount
} from '../../utils/storage';
import downloadCertificate from '../CertificateDownload/downloadCertificate';
import { useCertificateContext } from '../../App';
import CertificateStats from './CertificateStats';
import CertificateFilters from './CertificateFilters';
import CertificateGrid from './CertificateGrid';
import EmptyState from './EmptyState';
import CertificateModal from './CertificateModal';
import CertificateActionsBar from './CertificateActionsBar';

// ✅ Skeleton Loader Component
function SkeletonCollection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="relative z-10 px-4 sm:px-6 py-6 sm:py-12 max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-8 sm:mb-12 animate-pulse">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gray-200 rounded-2xl"></div>
            <div className="text-center sm:text-left">
              <div className="h-8 sm:h-10 bg-gray-200 rounded w-64 mx-auto sm:mx-0 mb-2"></div>
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-40 mx-auto sm:mx-0"></div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200/50">
                <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>

          {/* Filters Skeleton */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6">
            <div className="h-10 sm:h-12 bg-gray-200 rounded-xl w-full sm:w-64"></div>
            <div className="h-10 sm:h-12 bg-gray-200 rounded-xl w-full sm:w-40"></div>
            <div className="h-10 sm:h-12 bg-gray-200 rounded-xl w-full sm:w-40"></div>
          </div>

          {/* Count Badge Skeleton */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="h-8 sm:h-10 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl w-64 mx-auto"></div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden animate-pulse">
                <div className="h-36 sm:h-48 bg-gray-200"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between mb-4">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="h-16 bg-gray-100 rounded-xl mb-4 border border-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-10 bg-gray-200 rounded-xl"></div>
                    <div className="h-10 bg-gray-200 rounded-xl"></div>
                    <div className="h-10 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionCertificate() {
  // ✅ Add loading state for skeleton
  const [isLoading, setIsLoading] = useState(true);

  const [certificates, setCertificatesState] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [certToDownload, setCertToDownload] = useState(null);
  const [selectedCerts, setSelectedCerts] = useState(new Set());
  const [recycledCount, setRecycledCount] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const { refreshCounts } = useCertificateContext();
  const certRef = useRef();

  // Show skeleton for 2.5 seconds on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Load certificates
  useEffect(() => {
    if (isLoading) return; // Only load after skeleton

    const loadCertificates = () => {
      try {
        const certs = getCertificates();
        setCertificatesState(certs);

        if (certs.length === 0) {
          const sampleCerts = [
            {
              id: '1',
              userName: 'Saif',
              courseTitle: 'Advanced React Development',
              score: 10,
              total: 10,
              percentage: 100,
              date: new Date().toISOString(),
              certificateNumber: 'ST-2025-2110',
            }
          ];
          setCertificatesState(sampleCerts);
          setCertificates(sampleCerts);
        }
      } catch (error) {
        console.error('Error loading certificates:', error);
        setCertificatesState([]);
      }
      refreshCounts();
    };

    loadCertificates();
  }, [refreshCounts, isLoading]);

  // Recycled count
  useEffect(() => {
    const updateRecycledCount = () => setRecycledCount(getRecycledCount());
    updateRecycledCount();
    window.addEventListener('focus', updateRecycledCount);
    return () => window.removeEventListener('focus', updateRecycledCount);
  }, []);

  // Handle download
  useEffect(() => {
    if (certToDownload && certRef.current) {
      requestAnimationFrame(async () => {
        setIsDownloading(true);
        try {
          await downloadCertificate(
            certRef.current,
            `${certToDownload.userName || certToDownload.name}-${certToDownload.courseTitle}.png`
          );
          showNotification('success', '✅ Certificate downloaded successfully!');
        } catch (err) {
          showNotification('error', '❌ Failed to download certificate.');
        } finally {
          setIsDownloading(false);
          setCertToDownload(null);
        }
      });
    }
  }, [certToDownload]);

  // Helper functions
  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Exceptional', icon: Crown, color: 'from-yellow-400 to-orange-500', bgColor: 'from-yellow-50 to-orange-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' };
    if (percentage >= 80) return { level: 'Excellent', icon: Medal, color: 'from-purple-500 to-indigo-600', bgColor: 'from-purple-50 to-indigo-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' };
    if (percentage >= 70) return { level: 'Good', icon: Award, color: 'from-emerald-500 to-green-600', bgColor: 'from-emerald-50 to-green-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200' };
    return { level: 'Passed', icon: CheckCircle, color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    try { return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch { return 'Invalid Date'; }
  };

  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return '0m';
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) return `${hrs}h ${mins % 60}m`;
    return `${mins}m`;
  };

  const handleSelectCertificate = (certId) => {
    const newSelected = new Set(selectedCerts);
    newSelected.has(certId) ? newSelected.delete(certId) : newSelected.add(certId);
    setSelectedCerts(newSelected);
  };

  const handleSelectAll = () => setSelectedCerts(new Set(sortedCertificates.map(cert => cert.id)));
  const handleDeselectAll = () => setSelectedCerts(new Set());

  const moveToRecycleBin = (certIds) => {
    try {
      const result = moveToRecycleBinUtil(certIds);
      if (result.success) {
        setCertificatesState(getCertificates());
        setSelectedCerts(new Set());
        setRecycledCount(getRecycledCount());
        refreshCounts();
        showNotification('success', `✅ ${result.movedCount} certificate${result.movedCount > 1 ? 's' : ''} moved to recycle bin`);
      } else {
        showNotification('error', `❌ Failed to move certificates: ${result.error}`);
      }
    } catch (error) {
      console.error('Error moving to recycle bin:', error);
      showNotification('error', '❌ Failed to move certificates');
    }
  };

  const showNotification = (type, message) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  // Filter & Sort
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cert.userName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cert.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'exceptional') return matchesSearch && cert.percentage >= 90;
    if (filterBy === 'excellent') return matchesSearch && cert.percentage >= 80 && cert.percentage < 90;
    if (filterBy === 'good') return matchesSearch && cert.percentage >= 70 && cert.percentage < 80;
    return matchesSearch;
  });

  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.date) - new Date(a.date);
      case 'score': return b.percentage - a.percentage;
      case 'title': return a.courseTitle.localeCompare(b.courseTitle);
      default: return 0;
    }
  });

  // Stats
  const totalCertificates = certificates.length;
  const averageScore = certificates.length > 0 ? Math.round(certificates.reduce((sum, cert) => sum + cert.percentage, 0) / certificates.length) : 0;
  const totalStudyTime = certificates.reduce((sum, cert) => sum + (cert.timeSpent || 0), 0);
  const exceptionalCount = certificates.filter(c => c.percentage >= 90).length;

  // ✅ Show skeleton while loading
  if (isLoading) {
    return <SkeletonCollection />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Rating Modal */}
      {showRatingModal && (
        <RatingForm
          onSubmit={(rating, feedback) => {
            console.log("User rating:", rating, "Feedback:", feedback);
            setShowRatingModal(false);
          }}
          onClose={() => setShowRatingModal(false)}
        />
      )}

      <div className="relative z-10 px-4 sm:px-6 py-6 sm:py-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Archive className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Certificates
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mt-2">Achievement Gallery</p>
            </div>
          </div>

          {/* ✅ COMPONENTS */}
          <CertificateStats
            totalCertificates={totalCertificates}
            averageScore={averageScore}
            totalStudyTime={totalStudyTime}
            exceptionalCount={exceptionalCount}
            formatTime={formatTime}
          />

          <CertificateFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="text-center mb-6 sm:mb-8">
            <p className="text-base sm:text-xl text-gray-700 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-8 inline-block shadow-lg border border-gray-200/50">
              Showing <span className="font-black text-xl sm:text-2xl text-indigo-600">{sortedCertificates.length}</span>{' '}
              certificate{sortedCertificates.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Grid or Empty State */}
          {sortedCertificates.length === 0 ? (
            <EmptyState searchTerm={searchTerm} setSearchTerm={setSearchTerm} setFilterBy={setFilterBy} />
          ) : (
            <CertificateGrid
              certificates={sortedCertificates}
              selectedCerts={selectedCerts}
              handleSelectCertificate={handleSelectCertificate}
              getPerformanceLevel={getPerformanceLevel}
              formatDate={formatDate}
              isDownloading={isDownloading}
              certToDownload={certToDownload}
              setCertToDownload={setCertToDownload}
              setSelectedCertificate={setSelectedCertificate}
              moveToRecycleBin={moveToRecycleBin}
            />
          )}
        </div>

        {/* Modals & Bars */}
        <CertificateModal
          selectedCertificate={selectedCertificate}
          setSelectedCertificate={setSelectedCertificate}
          setCertToDownload={setCertToDownload}
          isDownloading={isDownloading}
          certToDownload={certToDownload}
        />

        <CertificateActionsBar
          selectedCerts={selectedCerts}
          sortedCertificates={sortedCertificates}
          handleDeselectAll={handleDeselectAll}
          handleSelectAll={handleSelectAll}
          moveToRecycleBin={moveToRecycleBin}
        />

        {/* Hidden Downloader */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          {certToDownload && (
            <div ref={certRef}>
              <CertificateDOMDownloader
                name={certToDownload.userName || certToDownload.name || 'Student'}
                courseTitle={certToDownload.courseTitle}
                score={certToDownload.score}
                total={certToDownload.total}
                percentage={certToDownload.percentage}
                date={certToDownload.date}
                certificateNumber={certToDownload.certificateNumber}
              />
            </div>
          )}
        </div>

        {/* Rate Button */}
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40">
          <button
            onClick={() => setShowRatingModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 flex items-center space-x-2"
            title="Rate Your Experience"
          >
            <Star className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
            <span className="hidden sm:inline text-xs sm:text-sm">Rate Experience</span>
          </button>
        </div>
      </div>
    </div>
  );
}