// src/components/analytics/Analytics.js
import React, { useState, useEffect, useRef } from 'react';
import { useCertificateContext } from '../../App';
import { getCertificates } from '../../utils/storage';
import {
  BarChart3, PieChart, LineChart, TrendingUp, Award, User,
  Calendar, Clock, Star, CheckCircle, XCircle, Filter, Search,
  RefreshCw, Download, FileText, AlertTriangle, Crown, Target,
  ArrowUpRight, ArrowDownRight, Users, BookOpen, GraduationCap,
  BarChart2, Shield, Zap, Info
} from 'lucide-react';

// Import Chart.js and register components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement, PointElement, LineElement,
  RadialLinearScale, Filler } from 'chart.js';
import { Bar, Pie, Line, Radar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components (do this once, perhaps in a separate file for larger apps)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

// Import Child Components
import LoadingSkeleton from './LoadingSkeleton';
import NoDataMessage from './NoDataMessage';
import AnalyticsHeader from './AnalyticsHeader';
import OverallStats from './OverallStats';
import TabNavigation from './TabNavigation';
import ControlsRow from './ControlsRow';
import InsightsBanner from './InsightsBanner';
import CertificateAnalytics from './CertificateAnalytics';
import UserAnalytics from './UserAnalytics';

// Import Utilities
import { formatDate, getPerformanceLevel, formatTime, formatTimeForDisplay } from '../../utils/analyticsUtils';
import { chartOptions, lineChartOptions, radarChartOptions } from '../../constants/chartOptions';

// Main Component
export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [activeTab, setActiveTab] = useState('certificates');
  const [timeRange, setTimeRange] = useState('all');
  const [loading, setLoading] = useState(true);
  const [skeletonLoading, setSkeletonLoading] = useState(true); // New state for skeleton
  const [exportingChart, setExportingChart] = useState(null);
  const { refreshCounts } = useCertificateContext();

  // Chart refs for export functionality
  const chartRefs = useRef({});

  // Simulate skeleton loading for 2.5 seconds
  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1500);
    return () => clearTimeout(skeletonTimer);
  }, []);

  // Load and process data
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      try {
        const certificates = getCertificates();
        if (certificates.length === 0) {
          // Generate comprehensive sample data for demonstration
          const sampleData = generateSampleData();
          setAnalyticsData(sampleData);
          setLoading(false);
          return;
        }

        // Process certificates with attempt numbers
        const processedCertificates = certificates.map((cert, index) => ({
          ...cert,
          id: cert.id || `cert-${index}`,
          attemptNumber: 1,
          timeSpent: cert.timeSpent || Math.floor(Math.random() * 300) + 60,
          date: new Date(cert.date)
        }));

        // Group by course
        const coursesMap = {};
        processedCertificates.forEach(cert => {
          const courseTitle = cert.courseTitle;
          if (!coursesMap[courseTitle]) {
            coursesMap[courseTitle] = {
              title: courseTitle,
              certificates: [],
              totalAttempts: 0,
              passedAttempts: 0,
              failedAttempts: 0,
              avgScore: 0,
              totalTimeSpent: 0,
              bestScore: 0,
              avgTimePerAttempt: 0
            };
          }
          coursesMap[courseTitle].certificates.push(cert);
          coursesMap[courseTitle].totalAttempts += 1;
          if (cert.percentage >= 70) {
            coursesMap[courseTitle].passedAttempts += 1;
          } else {
            coursesMap[courseTitle].failedAttempts += 1;
          }
          coursesMap[courseTitle].totalTimeSpent += cert.timeSpent || 0;
          if (cert.percentage > coursesMap[courseTitle].bestScore) {
            coursesMap[courseTitle].bestScore = cert.percentage;
          }
        });

        // Calculate averages for each course
        Object.values(coursesMap).forEach(course => {
          course.avgScore = Math.round(
            course.certificates.reduce((sum, cert) => sum + cert.percentage, 0) /
            course.certificates.length
          );
          course.avgTimePerAttempt = Math.round(course.totalTimeSpent / course.totalAttempts);
        });

        // Group by user
        const usersMap = {};
        processedCertificates.forEach(cert => {
          const userName = cert.userName || cert.name || 'Anonymous';
          if (!usersMap[userName]) {
            usersMap[userName] = {
              name: userName,
              certificates: [],
              totalAttempts: 0,
              passedAttempts: 0,
              failedAttempts: 0,
              avgScore: 0,
              totalTimeSpent: 0,
              coursesCompleted: new Set(),
              improvementRate: 0
            };
          }
          usersMap[userName].certificates.push(cert);
          usersMap[userName].totalAttempts += 1;
          if (cert.percentage >= 70) {
            usersMap[userName].passedAttempts += 1;
            usersMap[userName].coursesCompleted.add(cert.courseTitle);
          } else {
            usersMap[userName].failedAttempts += 1;
          }
          usersMap[userName].totalTimeSpent += cert.timeSpent || 0;
        });

        // Calculate averages and improvement rates for each user
        Object.values(usersMap).forEach(user => {
          user.avgScore = Math.round(
            user.certificates.reduce((sum, cert) => sum + cert.percentage, 0) /
            user.certificates.length
          );
          user.coursesCompleted = Array.from(user.coursesCompleted);
          // Calculate improvement rate (difference between first and last attempt)
          if (user.certificates.length > 1) {
            const sortedAttempts = [...user.certificates].sort((a, b) => new Date(a.date) - new Date(b.date));
            const firstScore = sortedAttempts[0].percentage;
            const lastScore = sortedAttempts[sortedAttempts.length - 1].percentage;
            user.improvementRate = Math.round(lastScore - firstScore);
          }
        });

        // Calculate overall stats
        const totalAttempts = processedCertificates.length;
        const passedAttempts = processedCertificates.filter(c => c.percentage >= 70).length;
        const failedAttempts = totalAttempts - passedAttempts;
        const avgScore = Math.round(
          processedCertificates.reduce((sum, cert) => sum + cert.percentage, 0) /
          (totalAttempts || 1)
        );
        const totalTimeSpent = processedCertificates.reduce((sum, cert) => sum + (cert.timeSpent || 0), 0);

        // Group by date for trend analysis
        const dateGroups = {};
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

        processedCertificates.forEach(cert => {
          const date = new Date(cert.date);
          const dateStr = formatDate(cert.date);
          if (!dateGroups[dateStr]) {
            dateGroups[dateStr] = {
              date: dateStr,
              total: 0,
              passed: 0,
              failed: 0,
              avgScore: 0,
              totalTime: 0
            };
          }
          dateGroups[dateStr].total += 1;
          if (cert.percentage >= 70) {
            dateGroups[dateStr].passed += 1;
          } else {
            dateGroups[dateStr].failed += 1;
          }
          dateGroups[dateStr].totalTime += cert.timeSpent || 0;
        });

        // Calculate daily averages
        Object.values(dateGroups).forEach(day => {
          day.avgScore = Math.round(
            processedCertificates
              .filter(c => formatDate(c.date) === day.date)
              .reduce((sum, cert) => sum + cert.percentage, 0) / day.total
          );
        });

        // Sort dates
        const sortedDates = Object.values(dateGroups).sort((a, b) =>
          new Date(a.date) - new Date(b.date)
        );

        // Filter by time range
        let filteredDates = sortedDates;
        if (timeRange === '7d') {
          filteredDates = sortedDates.filter(day => new Date(day.date) >= sevenDaysAgo);
        } else if (timeRange === '30d') {
          filteredDates = sortedDates.filter(day => new Date(day.date) >= thirtyDaysAgo);
        } else if (timeRange === '90d') {
          filteredDates = sortedDates.filter(day => new Date(day.date) >= ninetyDaysAgo);
        }

        // Prepare data for charts
        const data = {
          certificates: Object.values(coursesMap),
          users: Object.values(usersMap),
          overall: {
            totalAttempts,
            passedAttempts,
            failedAttempts,
            avgScore,
            totalTimeSpent,
            passRate: totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0,
            avgTimePerAttempt: totalAttempts > 0 ? Math.round(totalTimeSpent / totalAttempts) : 0
          },
          trends: filteredDates,
          allCertificates: processedCertificates
        };

        setAnalyticsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading analytics data:', error);
        // Generate sample data in case of error
        const sampleData = generateSampleData();
        setAnalyticsData(sampleData);
        setLoading(false);
      }
    };

    loadData();
  }, [refreshCounts, timeRange]);

  // Generate comprehensive sample data for demonstration
  const generateSampleData = () => {
    const courses = [
      'React.js Fundamentals',
      'Advanced JavaScript',
      'Python Programming',
      'Data Structures & Algorithms',
      'Machine Learning Basics',
      'UI/UX Design Principles',
      'Database Management',
      'Cybersecurity Essentials'
    ];
    const users = ['Saif', 'Ali', 'Ahmed', 'Fatima', 'Omar', 'Layla', 'Yusuf', 'Aisha'];
    const certificates = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);

    // Generate 50 sample certificates
    for (let i = 0; i < 50; i++) {
      const randomCourse = courses[Math.floor(Math.random() * courses.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomScore = Math.floor(Math.random() * 40) + 60; // 60-99
      const randomTime = Math.floor(Math.random() * 300) + 60; // 60-360 seconds
      const randomDate = new Date(startDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000);
      certificates.push({
        id: `sample-${i}`,
        courseTitle: randomCourse,
        userName: randomUser,
        score: Math.floor(randomScore * 10 / 100),
        total: 10,
        percentage: randomScore,
        date: randomDate.toISOString(),
        certificateNumber: `ST-2025-${1000 + i}`,
        timeSpent: randomTime,
        attemptNumber: 1
      });
    }

    // Process this sample data using the same logic as above
    const coursesMap = {};
    certificates.forEach(cert => {
      const courseTitle = cert.courseTitle;
      if (!coursesMap[courseTitle]) {
        coursesMap[courseTitle] = {
          title: courseTitle,
          certificates: [],
          totalAttempts: 0,
          passedAttempts: 0,
          failedAttempts: 0,
          avgScore: 0,
          totalTimeSpent: 0,
          bestScore: 0,
          avgTimePerAttempt: 0
        };
      }
      coursesMap[courseTitle].certificates.push(cert);
      coursesMap[courseTitle].totalAttempts += 1;
      if (cert.percentage >= 70) {
        coursesMap[courseTitle].passedAttempts += 1;
      } else {
        coursesMap[courseTitle].failedAttempts += 1;
      }
      coursesMap[courseTitle].totalTimeSpent += cert.timeSpent || 0;
      if (cert.percentage > coursesMap[courseTitle].bestScore) {
        coursesMap[courseTitle].bestScore = cert.percentage;
      }
    });

    Object.values(coursesMap).forEach(course => {
      course.avgScore = Math.round(
        course.certificates.reduce((sum, cert) => sum + cert.percentage, 0) /
        course.certificates.length
      );
      course.avgTimePerAttempt = Math.round(course.totalTimeSpent / course.totalAttempts);
    });

    const usersMap = {};
    certificates.forEach(cert => {
      const userName = cert.userName;
      if (!usersMap[userName]) {
        usersMap[userName] = {
          name: userName,
          certificates: [],
          totalAttempts: 0,
          passedAttempts: 0,
          failedAttempts: 0,
          avgScore: 0,
          totalTimeSpent: 0,
          coursesCompleted: new Set(),
          improvementRate: 0
        };
      }
      usersMap[userName].certificates.push(cert);
      usersMap[userName].totalAttempts += 1;
      if (cert.percentage >= 70) {
        usersMap[userName].passedAttempts += 1;
        usersMap[userName].coursesCompleted.add(cert.courseTitle);
      } else {
        usersMap[userName].failedAttempts += 1;
      }
      usersMap[userName].totalTimeSpent += cert.timeSpent || 0;
    });

    Object.values(usersMap).forEach(user => {
      user.avgScore = Math.round(
        user.certificates.reduce((sum, cert) => sum + cert.percentage, 0) /
        user.certificates.length
      );
      user.coursesCompleted = Array.from(user.coursesCompleted);
      if (user.certificates.length > 1) {
        const sortedAttempts = [...user.certificates].sort((a, b) => new Date(a.date) - new Date(b.date));
        const firstScore = sortedAttempts[0].percentage;
        const lastScore = sortedAttempts[sortedAttempts.length - 1].percentage;
        user.improvementRate = Math.round(lastScore - firstScore);
      }
    });

    // Create date trends for the last 30 days
    const trends = [];
    const today = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = formatDate(date);
      // Filter certificates for this date
      const dayCertificates = certificates.filter(cert => {
        return formatDate(new Date(cert.date)) === dateString;
      });
      if (dayCertificates.length > 0) {
        const total = dayCertificates.length;
        const passed = dayCertificates.filter(c => c.percentage >= 70).length;
        const failed = total - passed;
        const avgScore = Math.round(dayCertificates.reduce((sum, cert) => sum + cert.percentage, 0) / total);
        const totalTime = dayCertificates.reduce((sum, cert) => sum + (cert.timeSpent || 0), 0);
        trends.push({
          date: dateString,
          total,
          passed,
          failed,
          avgScore,
          totalTime
        });
      }
    }

    const totalAttempts = certificates.length;
    const passedAttempts = certificates.filter(c => c.percentage >= 70).length;
    const failedAttempts = totalAttempts - passedAttempts;
    const avgScore = Math.round(certificates.reduce((sum, cert) => sum + cert.percentage, 0) / totalAttempts);
    const totalTimeSpent = certificates.reduce((sum, cert) => sum + (cert.timeSpent || 0), 0);

    return {
      certificates: Object.values(coursesMap),
      users: Object.values(usersMap),
      overall: {
        totalAttempts,
        passedAttempts,
        failedAttempts,
        avgScore,
        totalTimeSpent,
        passRate: Math.round((passedAttempts / totalAttempts) * 100),
        avgTimePerAttempt: Math.round(totalTimeSpent / totalAttempts)
      },
      trends,
      allCertificates: certificates
    };
  };

  // Certificate Analytics Charts (Memoized)
  const certificateCharts = React.useMemo(() => {
    if (!analyticsData) return null;
    const courses = analyticsData.certificates;

    // Courses by Attempts (Bar Chart)
    const attemptsData = {
      labels: courses.map(c => c.title),
      datasets: [
        {
          label: 'Passed Attempts',
          data: courses.map(c => c.passedAttempts),
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        },
        {
          label: 'Failed Attempts',
          data: courses.map(c => c.failedAttempts),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        }
      ]
    };

    // Performance Distribution (Doughnut Chart)
    const performanceData = {
      labels: ['Exceptional (90%+)', 'Excellent (80-89%)', 'Good (70-79%)', 'Needs Improvement (<70%)'],
      datasets: [
        {
          data: [
            analyticsData.allCertificates.filter(c => c.percentage >= 90).length,
            analyticsData.allCertificates.filter(c => c.percentage >= 80 && c.percentage < 90).length,
            analyticsData.allCertificates.filter(c => c.percentage >= 70 && c.percentage < 80).length,
            analyticsData.allCertificates.filter(c => c.percentage < 70).length
          ],
          backgroundColor: [
            'rgba(234, 179, 8, 0.8)', // Amber
            'rgba(168, 85, 247, 0.8)', // Purple
            'rgba(34, 197, 94, 0.8)', // Green
            'rgba(239, 68, 68, 0.8)' // Red
          ],
          borderColor: [
            'rgba(234, 179, 8, 1)',
            'rgba(168, 85, 247, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 2,
          hoverOffset: 8
        }
      ]
    };

    // Average Scores by Course (Bar Chart)
    const avgScoresData = {
      labels: courses.map(c => c.title),
      datasets: [
        {
          label: 'Average Score (%)',
          data: courses.map(c => c.avgScore),
          backgroundColor: courses.map(c => {
            if (c.avgScore >= 90) return 'rgba(234, 179, 8, 0.7)';
            if (c.avgScore >= 80) return 'rgba(168, 85, 247, 0.7)';
            if (c.avgScore >= 70) return 'rgba(34, 197, 94, 0.7)';
            return 'rgba(239, 68, 68, 0.7)';
          }),
          borderColor: courses.map(c => {
            if (c.avgScore >= 90) return 'rgba(234, 179, 8, 1)';
            if (c.avgScore >= 80) return 'rgba(168, 85, 247, 1)';
            if (c.avgScore >= 70) return 'rgba(34, 197, 94, 1)';
            return 'rgba(239, 68, 68, 1)';
          }),
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        }
      ]
    };

    // Time Spent by Course (Bar Chart)
    const timeSpentData = {
      labels: courses.map(c => c.title),
      datasets: [
        {
          label: 'Average Time per Attempt',
          data: courses.map(c => c.avgTimePerAttempt),
          backgroundColor: 'rgba(249, 115, 22, 0.7)',
          borderColor: 'rgba(249, 115, 22, 1)',
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        }
      ]
    };

    // Pass Rate by Course (Horizontal Bar Chart)
    const passRateData = {
      labels: courses.map(c => c.title),
      datasets: [
        {
          label: 'Pass Rate (%)',
          data: courses.map(c => Math.round((c.passedAttempts / c.totalAttempts) * 100)),
          backgroundColor: courses.map(c => {
            const rate = Math.round((c.passedAttempts / c.totalAttempts) * 100);
            if (rate >= 90) return 'rgba(34, 197, 94, 0.8)';
            if (rate >= 70) return 'rgba(234, 179, 8, 0.8)';
            return 'rgba(239, 68, 68, 0.8)';
          }),
          borderColor: courses.map(c => {
            const rate = Math.round((c.passedAttempts / c.totalAttempts) * 100);
            if (rate >= 90) return 'rgba(34, 197, 94, 1)';
            if (rate >= 70) return 'rgba(234, 179, 8, 1)';
            return 'rgba(239, 68, 68, 1)';
          }),
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        }
      ]
    };

    // Difficulty Level (Pie Chart) - based on pass rates
    const difficultyData = {
      labels: ['Easy (90%+ pass rate)', 'Medium (70-89% pass rate)', 'Hard (<70% pass rate)'],
      datasets: [
        {
          data: [
            courses.filter(c => Math.round((c.passedAttempts / c.totalAttempts) * 100) >= 90).length,
            courses.filter(c => Math.round((c.passedAttempts / c.totalAttempts) * 100) >= 70 && Math.round((c.passedAttempts / c.totalAttempts) * 100) < 90).length,
            courses.filter(c => Math.round((c.passedAttempts / c.totalAttempts) * 100) < 70).length
          ],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)', // Easy - Green
            'rgba(234, 179, 8, 0.8)', // Medium - Amber
            'rgba(239, 68, 68, 0.8)'  // Hard - Red
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 2
        }
      ]
    };

    return {
      attemptsData,
      performanceData,
      avgScoresData,
      timeSpentData,
      passRateData,
      difficultyData
    };
  }, [analyticsData]);

  // User Analytics Charts (Memoized)
  const userCharts = React.useMemo(() => {
    if (!analyticsData) return null;
    const users = analyticsData.users;

    // User Activity (Bar Chart)
    const activityData = {
      labels: users.map(u => u.name),
      datasets: [
        {
          label: 'Passed Attempts',
          data: users.map(u => u.passedAttempts),
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        },
        {
          label: 'Failed Attempts',
          data: users.map(u => u.failedAttempts),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        }
      ]
    };

    // Success Rate (Doughnut Chart)
    const successRateData = {
      labels: users.map(u => u.name),
      datasets: [
        {
          data: users.map(u => u.passedAttempts),
          backgroundColor: users.map((_, i) =>
            `hsla(${i * 45}, 70%, 60%, 0.8)`
          ),
          borderColor: users.map((_, i) =>
            `hsla(${i * 45}, 70%, 50%, 1)`
          ),
          borderWidth: 2
        }
      ]
    };

    // User Performance (Radar Chart)
    const performanceData = {
      labels: users.map(u => u.name),
      datasets: [
        {
          label: 'Average Score',
          data: users.map(u => u.avgScore),
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          pointRadius: 5
        },
        {
          label: 'Courses Completed',
          data: users.map(u => (u.coursesCompleted.length / analyticsData.certificates.length) * 100),
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          pointBackgroundColor: 'rgba(34, 197, 94, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          pointRadius: 5
        }
      ]
    };

    // Improvement Rate (Bar Chart)
    const improvementData = {
      labels: users.map(u => u.name),
      datasets: [
        {
          label: 'Improvement Rate (%)',
          data: users.map(u => u.improvementRate),
          backgroundColor: users.map(u => {
            if (u.improvementRate > 0) return 'rgba(34, 197, 94, 0.7)';
            if (u.improvementRate < 0) return 'rgba(239, 68, 68, 0.7)';
            return 'rgba(234, 179, 8, 0.7)';
          }),
          borderColor: users.map(u => {
            if (u.improvementRate > 0) return 'rgba(34, 197, 94, 1)';
            if (u.improvementRate < 0) return 'rgba(239, 68, 68, 1)';
            return 'rgba(234, 179, 8, 1)';
          }),
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        }
      ]
    };

    // Time Spent vs Performance (Simulated with bar chart)
    const timePerformanceData = {
      labels: users.map(u => u.name),
      datasets: [
        {
          label: 'Average Score (%)',
          data: users.map(u => u.avgScore),
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          yAxisID: 'y',
        },
        {
          label: 'Total Time Spent (minutes)',
          data: users.map(u => Math.floor(u.totalTimeSpent / 60)),
          backgroundColor: 'rgba(249, 115, 22, 0.7)',
          borderColor: 'rgba(249, 115, 22, 1)',
          borderWidth: 1,
          yAxisID: 'y1',
        }
      ]
    };

    // Activity Distribution (Pie Chart)
    const activityDistributionData = {
      labels: ['High Activity (10+ attempts)', 'Medium Activity (5-9 attempts)', 'Low Activity (1-4 attempts)'],
      datasets: [
        {
          data: [
            users.filter(u => u.totalAttempts >= 10).length,
            users.filter(u => u.totalAttempts >= 5 && u.totalAttempts < 10).length,
            users.filter(u => u.totalAttempts < 5).length
          ],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)', // High - Blue
            'rgba(234, 179, 8, 0.8)',  // Medium - Amber
            'rgba(168, 85, 247, 0.8)'  // Low - Purple
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(168, 85, 247, 1)'
          ],
          borderWidth: 2
        }
      ]
    };

    return {
      activityData,
      successRateData,
      performanceData,
      improvementData,
      timePerformanceData,
      activityDistributionData
    };
  }, [analyticsData]);

  // Export data function
  const exportData = () => {
    if (!analyticsData) return;
    const dataToExport = {
      generatedAt: new Date().toISOString(),
      timeRange: timeRange,
      certificates: analyticsData.certificates.map(c => ({
        course: c.title,
        totalAttempts: c.totalAttempts,
        passedAttempts: c.passedAttempts,
        failedAttempts: c.failedAttempts,
        avgScore: c.avgScore,
        bestScore: c.bestScore,
        totalTimeSpent: formatTimeForDisplay(c.totalTimeSpent),
        avgTimePerAttempt: formatTimeForDisplay(c.avgTimePerAttempt),
        passRate: Math.round((c.passedAttempts / c.totalAttempts) * 100) + '%'
      })),
      users: analyticsData.users.map(u => ({
        user: u.name,
        totalAttempts: u.totalAttempts,
        passedAttempts: u.passedAttempts,
        failedAttempts: u.failedAttempts,
        avgScore: u.avgScore,
        coursesCompleted: u.coursesCompleted.length,
        totalTimeSpent: formatTimeForDisplay(u.totalTimeSpent),
        improvementRate: u.improvementRate + '%'
      })),
      overall: {
        ...analyticsData.overall,
        totalTimeSpent: formatTimeForDisplay(analyticsData.overall.totalTimeSpent),
        avgTimePerAttempt: formatTimeForDisplay(analyticsData.overall.avgTimePerAttempt)
      }
    };
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `analytics-data-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Export chart as image
  const exportChartAsImage = async (chartId, chartType) => {
    setExportingChart(chartId);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const chartContainer = chartRefs.current[chartId];
      if (!chartContainer) {
        console.error('Chart container not found');
        return;
      }

      // Create a canvas element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Set canvas dimensions
      const scale = 2; // For higher quality
      canvas.width = chartContainer.offsetWidth * scale;
      canvas.height = chartContainer.offsetHeight * scale;
      canvas.style.width = `${chartContainer.offsetWidth}px`;
      canvas.style.height = `${chartContainer.offsetHeight}px`;

      // Scale context for higher quality
      context.scale(scale, scale);

      // Get chart canvas
      const chartCanvas = chartContainer.querySelector('canvas');
      if (!chartCanvas) {
        console.error('Chart canvas not found');
        return;
      }

      // Draw chart on our canvas
      context.drawImage(chartCanvas, 0, 0);

      // Create download link
      const link = document.createElement('a');
      link.download = `${chartType}-chart-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting chart:', error);
    } finally {
      setExportingChart(null);
    }
  };

  // Show skeleton loader for 2.5 seconds
  if (skeletonLoading && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 px-4 animate-pulse">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton: Header */}
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-200 rounded w-3/4 max-w-2xl mx-auto mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2 max-w-md mx-auto"></div>
          </div>

          {/* Skeleton: Overall Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>

          {/* Skeleton: Tab Navigation */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Skeleton: Controls Row */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Skeleton: Insights Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-8">
            <div className="h-4 bg-blue-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-blue-200 rounded w-2/3"></div>
          </div>

          {/* Skeleton: Certificate Analytics Content */}
          <div className="space-y-8">
            {/* Chart Cards */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-64 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If loading, show skeleton (from existing component)
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <AnalyticsHeader />
          {/* Overall Stats */}
          <OverallStats overall={analyticsData?.overall} />
          {/* Tab Navigation */}
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* Controls Row */}
          <ControlsRow
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            onExportData={exportData}
          />
          {/* Insights Banner */}
          <InsightsBanner analyticsData={analyticsData} />
        </div>

        {/* Certificate Analytics Tab */}
        {activeTab === 'certificates' && (
          <CertificateAnalytics
            certificateCharts={certificateCharts}
            exportingChart={exportingChart}
            onExportChart={exportChartAsImage}
            analyticsData={analyticsData}
          />
        )}

        {/* User Analytics Tab */}
        {activeTab === 'users' && (
          <UserAnalytics
            userCharts={userCharts}
            exportingChart={exportingChart}
            onExportChart={exportChartAsImage}
            analyticsData={analyticsData}
          />
        )}

        {/* No Data Message */}
        {!analyticsData && !loading && (
          <NoDataMessage
            onGenerateSampleData={() => {
              const sampleData = generateSampleData();
              setAnalyticsData(sampleData);
            }}
          />
        )}
      </div>
    </div>
  );
}

export { Analytics };