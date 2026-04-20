// src/components/certificate-history/CertificateHistory.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search, Award, BarChart3, Clock, TrendingUp, Trash2, XCircle,
  Crown, Star, ChevronDown, ChevronUp, FileText, Download, X
} from 'lucide-react';
import { useCertificateContext } from '../../App';
import CertificateDOM from '../../pages/Certificate';
import CertificateDOMDownloader from '../CertificateDownload/CertificatePDFDownloader';
import { getCertificates, moveToRecycleBin as moveToRecycleBinUtil } from '../../utils/storage';
import downloadCertificate from '../CertificateDownload/downloadCertificate';
import RatingForm from '../../pages/RatingForm';

// Import Extracted Components
import ViewModeToggle from './ViewModeToggle';
import TableView from './TableView';
import GridView from './GridView';
import ListView from './ListView';
// Import Helper Functions
import { getPerformanceLevel, formatDate, formatTime } from './utils';

export default function CertificateHistory() {
  // >>> ALL HOOKS DECLARED UNCONDITIONALLY AT THE TOP <<<
  const [attempts, setAttempts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedAttempts, setSelectedAttempts] = useState(new Set());
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isDownloading, setIsDownloading] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [detailedStatView, setDetailedStatView] = useState(null);
  const [loading, setLoading] = useState(true); // <<< Skeleton loading state
  const certRef = useRef();

  const { refreshCounts } = useCertificateContext();

  // Load data + simulate loading
  useEffect(() => {
    const loadAttempts = () => {
      try {
        const certs = getCertificates();
        const attemptsWithNumbers = certs.map((cert, index) => ({
          ...cert,
          id: cert.id || `attempt-${index}-${Date.now()}`,
          attemptNumber: 1,
          timeSpent: cert.timeSpent || Math.floor(Math.random() * 300) + 60
        }));

        const groupedByCourse = {};
        attemptsWithNumbers.forEach(attempt => {
          const key = attempt.courseTitle;
          if (!groupedByCourse[key]) {
            groupedByCourse[key] = [];
          }
          groupedByCourse[key].push(attempt);
        });

        const finalAttempts = [];
        Object.values(groupedByCourse).forEach(courseAttempts => {
          courseAttempts.sort((a, b) => new Date(b.date) - new Date(a.date));
          courseAttempts.forEach((attempt, index) => {
            finalAttempts.push({
              ...attempt,
              attemptNumber: index + 1
            });
          });
        });

        setAttempts(finalAttempts);

        if (finalAttempts.length === 0) {
          const sampleAttempts = [
            {
              id: '1',
              userName: 'Saif',
              courseTitle: 'Advanced React Development',
              score: 10,
              total: 10,
              percentage: 100,
              date: new Date().toISOString(),
              certificateNumber: 'ST-2025-2110',
              attemptNumber: 1,
              timeSpent: 180
            },
            {
              id: '2',
              userName: 'Saif',
              courseTitle: 'Advanced React Development',
              score: 8,
              total: 10,
              percentage: 80,
              date: new Date(Date.now() - 86400000).toISOString(),
              certificateNumber: 'ST-2025-2109',
              attemptNumber: 2,
              timeSpent: 240
            },
            {
              id: '3',
              userName: 'Ali',
              courseTitle: 'JavaScript Fundamentals',
              score: 9,
              total: 10,
              percentage: 90,
              date: new Date(Date.now() - 172800000).toISOString(),
              certificateNumber: 'ST-2025-2108',
              attemptNumber: 1,
              timeSpent: 200
            },
          ];
          setAttempts(sampleAttempts);
        }
      } catch (error) {
        console.error('Error loading attempts:', error);
        setAttempts([]);
      }
    };

    loadAttempts();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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

  // >>> ALL useMemo HOOKS AFTER useState/useEffect, BEFORE JSX <<<
  const filteredAndSortedAttempts = useMemo(() => {
    let filtered = attempts.filter(attempt => {
      const matchesSearch =
        attempt.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (attempt.userName && attempt.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (attempt.name && attempt.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        attempt.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase());

      if (selectedCategory === 'all') return matchesSearch;
      if (selectedCategory === 'exceptional') return matchesSearch && attempt.percentage >= 90;
      if (selectedCategory === 'excellent') return matchesSearch && attempt.percentage >= 80 && attempt.percentage < 90;
      if (selectedCategory === 'good') return matchesSearch && attempt.percentage >= 70 && attempt.percentage < 80;
      if (selectedCategory === 'needs-improvement') return matchesSearch && attempt.percentage < 70;

      return matchesSearch;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'score':
          aValue = a.percentage;
          bValue = b.percentage;
          break;
        case 'course':
          aValue = a.courseTitle;
          bValue = b.courseTitle;
          break;
        case 'time':
          aValue = a.timeSpent || 0;
          bValue = b.timeSpent || 0;
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [attempts, searchTerm, selectedCategory, sortBy, sortDirection]);

  const stats = useMemo(() => {
    if (attempts.length === 0) return {
      totalAttempts: 0,
      totalCourses: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      bestScore: 0,
      passedAttempts: 0
    };

    const courseSet = new Set(attempts.map(a => a.courseTitle));
    const totalScore = attempts.reduce((sum, a) => sum + a.percentage, 0);
    const totalTimeSpent = attempts.reduce((sum, a) => sum + (a.timeSpent || 0), 0);
    const bestScore = Math.max(...attempts.map(a => a.percentage));
    const passedAttempts = attempts.filter(a => a.percentage >= 70).length;

    return {
      totalAttempts: attempts.length,
      totalCourses: courseSet.size,
      averageScore: Math.round(totalScore / attempts.length),
      totalTimeSpent,
      bestScore,
      passedAttempts
    };
  }, [attempts]);

  // >>> ALL HELPER FUNCTIONS (not hooks) <<<
  const handleSelectAttempt = (attemptId) => {
    const newSelected = new Set(selectedAttempts);
    if (newSelected.has(attemptId)) {
      newSelected.delete(attemptId);
    } else {
      newSelected.add(attemptId);
    }
    setSelectedAttempts(newSelected);
  };

  const handleSelectAll = () => {
    const allIds = filteredAndSortedAttempts.map(a => a.id);
    setSelectedAttempts(new Set(allIds));
  };

  const handleDeselectAll = () => {
    setSelectedAttempts(new Set());
  };

  const handleDelete = (attemptId) => {
    try {
      const result = moveToRecycleBinUtil([attemptId]);
      if (result.success) {
        const updatedAttempts = attempts.filter(a => a.id !== attemptId);
        setAttempts(updatedAttempts);
        setSelectedAttempts(new Set([...selectedAttempts].filter(id => id !== attemptId)));
        refreshCounts();
      }
    } catch (error) {
      console.error('Error deleting attempt:', error);
    }
  };

  const handleBulkDelete = () => {
    if (selectedAttempts.size === 0) return;
    try {
      const result = moveToRecycleBinUtil([...selectedAttempts]);
      if (result.success) {
        const updatedAttempts = attempts.filter(a => !selectedAttempts.has(a.id));
        setAttempts(updatedAttempts);
        setSelectedAttempts(new Set());
        refreshCounts();
      }
    } catch (error) {
      console.error('Error deleting attempts:', error);
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const getDetailedData = (statType) => {
    switch (statType) {
      case 'attempts':
        return attempts.map(attempt => ({
          ...attempt,
          type: 'Attempt',
          detail: `Attempt #${attempt.attemptNumber} on ${formatDate(attempt.date)}`
        }));
      case 'passed':
        return attempts.filter(attempt => attempt.percentage >= 70).map(attempt => ({
          ...attempt,
          type: 'Passed Attempt',
          detail: `Scored ${attempt.percentage}% on ${formatDate(attempt.date)}`
        }));
      case 'courses':
        const courseMap = {};
        attempts.forEach(attempt => {
          if (!courseMap[attempt.courseTitle]) {
            courseMap[attempt.courseTitle] = {
              courseTitle: attempt.courseTitle,
              attempts: [],
              bestScore: 0,
              totalAttempts: 0,
              passedAttempts: 0
            };
          }
          courseMap[attempt.courseTitle].attempts.push(attempt);
          courseMap[attempt.courseTitle].totalAttempts += 1;
          if (attempt.percentage >= 70) {
            courseMap[attempt.courseTitle].passedAttempts += 1;
          }
          if (attempt.percentage > courseMap[attempt.courseTitle].bestScore) {
            courseMap[attempt.courseTitle].bestScore = attempt.percentage;
          }
        });
        return Object.values(courseMap).map(course => ({
          ...course,
          id: course.courseTitle,
          type: 'Course',
          detail: `${course.passedAttempts} of ${course.totalAttempts} attempts passed. Best score: ${course.bestScore}%`
        }));
      default:
        return [];
    }
  };

  // >>> EARLY RETURN FOR SKELETON (SAFE NOW!) <<<
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-6 sm:mb-8 animate-pulse">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gray-300 rounded-xl sm:rounded-2xl"></div>
              <div className="text-center sm:text-left">
                <div className="h-8 sm:h-10 bg-gray-300 rounded w-48 sm:w-64 mx-auto sm:mx-0 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-64 sm:w-80 mx-auto sm:mx-0"></div>
              </div>
            </div>

            {/* Stats Dashboard Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4">
                  <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-12 mx-auto mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Search & Filter Skeleton */}
          <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 mb-6 animate-pulse">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl"></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl w-32"></div>
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl w-24"></div>
              </div>
            </div>
          </div>

          {/* Sort Controls Skeleton */}
          <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 mb-6 animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-48"></div>
            </div>
          </div>

          {/* Content Area Skeleton (Grid View) */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-xl rounded-xl shadow-md border border-gray-200/50 p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // >>> MAIN JSX (NO HOOKS HERE!) <<<
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-6 px-4">
      {showRatingModal && (
        <RatingForm
          onSubmit={(rating, feedback) => {
            console.log("User rating:", rating, "Feedback:", feedback);
            setShowRatingModal(false);
          }}
          onClose={() => setShowRatingModal(false)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
              <FileText className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Certificate History
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mt-2">Your complete record of achievements and attempts</p>
            </div>
          </div>

          {detailedStatView ? (
            <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {detailedStatView === 'attempts' && 'All Attempts'}
                  {detailedStatView === 'passed' && 'Passed Attempts'}
                  {detailedStatView === 'courses' && 'Course Breakdown'}
                </h2>
                <button
                  onClick={() => setDetailedStatView(null)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close detailed view"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {getDetailedData(detailedStatView).map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {detailedStatView === 'courses' ? (
                      <>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{item.courseTitle}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.detail}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                          <div className="bg-white p-2 rounded border">
                            <div className="font-medium text-gray-700">Total Attempts</div>
                            <div className="text-lg font-bold text-indigo-600">{item.totalAttempts}</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="font-medium text-gray-700">Passed</div>
                            <div className="text-lg font-bold text-green-600">{item.passedAttempts}</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="font-medium text-gray-700">Best Score</div>
                            <div className="text-lg font-bold text-purple-600">{item.bestScore}%</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="font-medium text-gray-700">Pass Rate</div>
                            <div className="text-lg font-bold text-blue-600">
                              {Math.round((item.passedAttempts / item.totalAttempts) * 100)}%
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-800">{item.courseTitle}</h3>
                            <p className="text-sm text-gray-600">{item.detail}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-black text-gray-800">{item.score}/{item.total}</div>
                            <div className={`text-sm font-medium ${getPerformanceLevel(item.percentage).textColor}`}>
                              {item.percentage}%
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <span>By: {item.userName || item.name || 'Anonymous'}</span>
                          <span>Certificate ID: {item.certificateNumber}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
              <button
                onClick={() => setDetailedStatView('attempts')}
                className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4 hover:scale-105 transition-transform duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <TrendingUp className="w-6 h-6 text-indigo-500 mb-2 mx-auto" />
                <p className="text-lg font-black text-indigo-700 text-center">{stats.totalAttempts}</p>
                <p className="text-xs font-semibold text-gray-600 text-center">Total Attempts</p>
              </button>
              <button
                onClick={() => setDetailedStatView('passed')}
                className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4 hover:scale-105 transition-transform duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <Award className="w-6 h-6 text-emerald-500 mb-2 mx-auto" />
                <p className="text-lg font-black text-emerald-700 text-center">{stats.passedAttempts}</p>
                <p className="text-xs font-semibold text-gray-600 text-center">Passed</p>
              </button>
              <button
                onClick={() => setDetailedStatView('courses')}
                className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4 hover:scale-105 transition-transform duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <Star className="w-6 h-6 text-purple-500 mb-2 mx-auto" />
                <p className="text-lg font-black text-purple-700 text-center">{stats.totalCourses}</p>
                <p className="text-xs font-semibold text-gray-600 text-center">Courses</p>
              </button>
              <div className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-blue-500 mb-2 mx-auto" />
                <p className="text-lg font-black text-blue-700 text-center">{stats.averageScore}%</p>
                <p className="text-xs font-semibold text-gray-600 text-center">Avg Score</p>
              </div>
              <div className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
                <Crown className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                <p className="text-lg font-black text-yellow-700 text-center">{stats.bestScore}%</p>
                <p className="text-xs font-semibold text-gray-600 text-center">Best Score</p>
              </div>
              <div className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-md border border-gray-200/50 p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
                <Clock className="w-6 h-6 text-orange-500 mb-2 mx-auto" />
                <p className="text-lg font-black text-orange-700 text-center">{formatTime(stats.totalTimeSpent)}</p>
                <p className="text-xs font-semibold text-gray-600 text-center">Total Time</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by course, user, or certificate ID..."
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                className="bg-white px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="exceptional">Exceptional (90%+)</option>
                <option value="excellent">Excellent (80-89%)</option>
                <option value="good">Good (70-79%)</option>
                <option value="needs-improvement">Needs Improvement (70%)</option>
              </select>
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                className="bg-white px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="score">Score</option>
                <option value="course">Course</option>
                <option value="time">Time Spent</option>
              </select>
              <button
                onClick={toggleSortDirection}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle sort direction"
              >
                {sortDirection === 'asc' ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <p className="text-sm text-gray-700 whitespace-nowrap">
                Showing <span className="font-bold text-indigo-600">{filteredAndSortedAttempts.length}</span> of{' '}
                <span className="font-bold text-indigo-600">{attempts.length}</span> records
              </p>
              {selectedAttempts.size > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleDeselectAll}
                    className="text-xs text-gray-600 hover:text-gray-800 underline"
                  >
                    Deselect All
                  </button>
                  <button
                    onClick={handleSelectAll}
                    className="text-xs text-indigo-600 hover:text-indigo-800 underline"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete ({selectedAttempts.size})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {filteredAndSortedAttempts.length === 0 ? (
          <div className="text-center py-12 bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 sm:w-10 h-8 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Records Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto px-4">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Start taking quizzes to see your history here!'}
            </p>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {viewMode === 'table' && (
              <TableView
                attempts={filteredAndSortedAttempts}
                selectedAttempts={selectedAttempts}
                onSelectAttempt={handleSelectAttempt}
                onDownload={setIsDownloading}
                onView={setSelectedCertificate}
                onDelete={handleDelete}
                isDownloading={isDownloading}
                sortBy={sortBy}
                sortDirection={sortDirection}
                toggleSortDirection={toggleSortDirection}
              />
            )}
            {viewMode === 'grid' && (
              <GridView
                attempts={filteredAndSortedAttempts}
                selectedAttempts={selectedAttempts}
                onSelectAttempt={handleSelectAttempt}
                onDownload={setIsDownloading}
                onView={setSelectedCertificate}
                onDelete={handleDelete}
                isDownloading={isDownloading}
              />
            )}
            {viewMode === 'list' && (
              <ListView
                attempts={filteredAndSortedAttempts}
                selectedAttempts={selectedAttempts}
                onSelectAttempt={handleSelectAttempt}
                onDownload={setIsDownloading}
                onView={setSelectedCertificate}
                onDelete={handleDelete}
                isDownloading={isDownloading}
              />
            )}
          </div>
        )}

        {selectedCertificate && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Certificate for {selectedCertificate.courseTitle}
                  </h2>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mb-6">
                  <div className="w-full max-w-3xl mx-auto">
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
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setIsDownloading(selectedCertificate)}
                    disabled={isDownloading && isDownloading.id === selectedCertificate.id}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center gap-2"
                  >
                    {isDownloading && isDownloading.id === selectedCertificate.id ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Download Certificate</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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

        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setShowRatingModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-2 px-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            title="Rate Your Experience"
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline text-xs">Rate</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { CertificateHistory };