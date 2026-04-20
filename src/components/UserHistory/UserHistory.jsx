// src/components/UserHistory/UserHistory.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, User, Calendar, Clock, TrendingUp, BarChart3, Crown, CheckCircle, XCircle, Trash2, Download, Eye, ChevronUp, ChevronDown, FileText, AlertTriangle, X } from 'lucide-react';
import { useCertificateContext } from '../../App';
import { getCertificates } from '../../utils/storage';
import CertificateDOMDownloader from '../CertificateDownload/CertificatePDFDownloader';
import downloadCertificate from '../CertificateDownload/downloadCertificate';

import StatsDashboard from './StatsDashboard/StatsDashboard';
import SearchAndFilterControls from './Controls/SearchAndFilterControls';
import UserList from './UserList/UserList';
import UserModal from './UserModal/UserModal';

export default function UserHistory() {
  const [userAttempts, setUserAttempts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('totalAttempts');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDownloading, setIsDownloading] = useState(null);
  const [filterByStatus, setFilterByStatus] = useState('all'); // 'all', 'passed', 'failed'
  const [detailedStatView, setDetailedStatView] = useState(null); // 'users', 'attempts', 'passed', 'failed', or null
  const [skeletonLoading, setSkeletonLoading] = useState(true); // New state for skeleton
  const certRef = useRef();
  const { refreshCounts } = useCertificateContext();

  // Simulate skeleton loading for 2.5 seconds
  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1500);
    return () => clearTimeout(skeletonTimer);
  }, []);

  // Load user attempts on component mount
  useEffect(() => {
    const loadUserAttempts = () => {
      try {
        const allCertificates = getCertificates();
        const userAttemptsMap = new Map();
        allCertificates.forEach(cert => {
          const userId = cert.userId || cert.userName || cert.name || 'Anonymous';
          if (!userAttemptsMap.has(userId)) {
            userAttemptsMap.set(userId, []);
          }
          userAttemptsMap.get(userId).push({
            ...cert,
            id: cert.id || `attempt-${Date.now()}-${Math.random()}`,
            attemptNumber: 1,
            timeSpent: cert.timeSpent || Math.floor(Math.random() * 300) + 60
          });
        });

        const processedUsers = Array.from(userAttemptsMap.entries()).map(([userId, attempts]) => {
          attempts.sort((a, b) => new Date(b.date) - new Date(a.date));
          attempts.forEach((attempt, index) => {
            attempt.attemptNumber = index + 1;
          });

          const totalAttempts = attempts.length;
          const passedAttempts = attempts.filter(a => a.percentage >= 70).length;
          const failedAttempts = attempts.filter(a => a.percentage < 70).length;
          const avgScore = Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts);
          const bestScore = Math.max(...attempts.map(a => a.percentage));
          const totalTimeSpent = attempts.reduce((sum, a) => sum + (a.timeSpent || 0), 0);

          return {
            userId,
            userName: userId,
            totalAttempts,
            passedAttempts,
            failedAttempts,
            avgScore,
            bestScore,
            totalTimeSpent,
            attempts
          };
        });

        processedUsers.sort((a, b) => b.totalAttempts - a.totalAttempts);
        setUserAttempts(processedUsers);

        if (processedUsers.length === 0) {
          const sampleUsers = [
            {
              userId: 'saif',
              userName: 'Saif',
              totalAttempts: 5,
              passedAttempts: 4,
              failedAttempts: 1,
              avgScore: 85,
              bestScore: 95,
              totalTimeSpent: 1200,
              attempts: [
                { id: '1', userName: 'Saif', courseTitle: 'React.js for Beginners', score: 9, total: 10, percentage: 90, date: new Date().toISOString(), certificateNumber: 'ST-2025-4539', attemptNumber: 1, timeSpent: 0 },
                { id: '2', userName: 'Saif', courseTitle: 'Advanced React Development', score: 8, total: 10, percentage: 80, date: new Date(Date.now() - 86400000).toISOString(), certificateNumber: 'ST-2025-2109', attemptNumber: 2, timeSpent: 240 },
                { id: '3', userName: 'Saif', courseTitle: 'JavaScript Fundamentals', score: 7, total: 10, percentage: 70, date: new Date(Date.now() - 172800000).toISOString(), certificateNumber: 'ST-2025-4538', attemptNumber: 3, timeSpent: 180 },
                { id: '4', userName: 'Saif', courseTitle: 'HTML & CSS Mastery', score: 9, total: 10, percentage: 90, date: new Date(Date.now() - 259200000).toISOString(), certificateNumber: 'ST-2025-4537', attemptNumber: 4, timeSpent: 150 },
                { id: '5', userName: 'Saif', courseTitle: 'Node.js Basics', score: 6, total: 10, percentage: 60, date: new Date(Date.now() - 345600000).toISOString(), certificateNumber: 'ST-2025-4536', attemptNumber: 5, timeSpent: 200 }
              ]
            },
          ];
          setUserAttempts(sampleUsers);
        }
      } catch (error) {
        console.error('Error loading user attempts:', error);
        setUserAttempts([]);
      }
    };

    loadUserAttempts();
  }, [refreshCounts]);

  // Handle certificate download
  useEffect(() => {
    if (isDownloading && certRef.current) {
      requestAnimationFrame(async () => {
        try {
          await downloadCertificate(
            certRef.current,
            `${isDownloading.userName || isDownloading.name}-${isDownloading.courseTitle}-attempt${isDownloading.attemptNumber}.png`
          );
        } catch (err) {
          console.error(err);
        } finally {
          setIsDownloading(null);
        }
      });
    }
  }, [isDownloading]);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = userAttempts.filter(user => {
      return user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = a.userName;
          bValue = b.userName;
          break;
        case 'totalAttempts':
          aValue = a.totalAttempts;
          bValue = b.totalAttempts;
          break;
        case 'passedAttempts':
          aValue = a.passedAttempts;
          bValue = b.passedAttempts;
          break;
        case 'failedAttempts':
          aValue = a.failedAttempts;
          bValue = b.failedAttempts;
          break;
        case 'avgScore':
          aValue = a.avgScore;
          bValue = b.avgScore;
          break;
        case 'bestScore':
          aValue = a.bestScore;
          bValue = b.bestScore;
          break;
        default:
          aValue = a.totalAttempts;
          bValue = b.totalAttempts;
      }
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [userAttempts, searchTerm, sortBy, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Show skeleton loader for 2.5 seconds
  if (skeletonLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-6 px-4 animate-pulse">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton: Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-indigo-200 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"></div>
              <div className="text-center sm:text-left">
                <div className="h-8 sm:h-10 bg-gradient-to-r from-indigo-200 to-purple-200 rounded w-48 sm:w-64 mx-auto sm:mx-0 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-40 sm:w-56 mx-auto sm:mx-0"></div>
              </div>
            </div>

            {/* Skeleton: Stats Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton: Search and Filter Controls */}
          <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="h-10 bg-gray-100 rounded-lg"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-gray-100 rounded-lg"></div>
                <div className="h-10 w-28 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Skeleton: User List */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-8 w-20 bg-indigo-100 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
              <User className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                User Activity History
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mt-2">Track user progress and engagement across courses</p>
            </div>
          </div>

          {/* Stats Dashboard */}
          <StatsDashboard
            userAttempts={userAttempts}
            detailedStatView={detailedStatView}
            setDetailedStatView={setDetailedStatView}
          />
        </div>

        {/* Search, Filter and Sort Controls */}
        <SearchAndFilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterByStatus={filterByStatus}
          setFilterByStatus={setFilterByStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          toggleSortDirection={toggleSortDirection}
        />

        {/* Display Content */}
        <UserList
          users={filteredAndSortedUsers}
          onOpenUserDetails={setSelectedUser}
        />

        {/* User Details Modal */}
        {selectedUser && (
          <UserModal
            user={selectedUser}
            filterByStatus={filterByStatus}
            onFilterChange={setFilterByStatus}
            onDownload={setIsDownloading}
            isDownloading={isDownloading}
            onClose={() => setSelectedUser(null)}
          />
        )}

        {/* Hidden certificate downloader */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          {isDownloading && (
            <div ref={certRef}>
              <CertificateDOMDownloader
                name={isDownloading.userName || isDownloading.name || 'Student'}
                courseTitle={isDownloading.courseTitle}
                score={isDownloading.score}
                total={isDownloading.total}
                percentage={isDownloading.percentage}
                date={isDownloading.date}
                certificateNumber={isDownloading.certificateNumber}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}