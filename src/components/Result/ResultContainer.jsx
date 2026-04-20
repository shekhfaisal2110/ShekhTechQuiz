// components/Result/ResultContainer.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveCertificate } from '../../utils/storage';
import RatingForm from '../../pages/RatingForm';
import CelebrationEffect from './CelebrationEffect';
import PerformanceHeader from './PerformanceHeader';
import ResultSummaryCard from './ResultSummaryCard';
import PerformanceStatsGrid from './PerformanceStatsGrid';
import CertificateForm from './CertificateForm';
import RetrySection from './RetrySection';
import RatingButton from '../RatingButton';

export default function ResultContainer() {
  const navigate = useNavigate();
  const loc = useLocation();
  const data = loc.state || null;

  const [name, setName] = useState('');
  const [generating, setGenerating] = useState(false);
  const [certificateNumber, setCertificateNumber] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Handle browser back button
  useEffect(() => {
    window.history.pushState(null, document.title);
    const handlePopState = () => navigate('/');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  // Initialize data
  useEffect(() => {
    if (!data) {
      navigate('/');
      return;
    }

    const generateCertNumber = () => {
      const prefix = 'ST';
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `${prefix}-${year}-${random}`;
    };

    setCertificateNumber(generateCertNumber());

    if (data?.passed) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [data, navigate]);

  if (!data) return null;

  const courseTitle = data.course?.title || data.courseTitle || 'Untitled Course';
  const score = Number(data.score) || 0;
  const total = Number(data.totalQuestions) || 1;
  const passed = Boolean(data.passed);
  const timeLeft = Number(data.timeLeft) || 0;

  const percentage = Math.round((score / total) * 100);
  const timeSpent = 5 * 60 - timeLeft;
  const timeSpentFormatted = `${Math.floor(timeSpent / 60)}:${(timeSpent % 60).toString().padStart(2, '0')}`;

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { 
      level: 'Exceptional', 
      icon: Crown, 
      color: 'from-yellow-400 to-orange-500', 
      bgColor: 'from-yellow-50 to-orange-50',
      textColor: 'text-yellow-700',
      description: 'Outstanding performance! You\'ve mastered the subject matter.'
    };
    if (percentage >= 80) return { 
      level: 'Excellent', 
      icon: Medal, 
      color: 'from-purple-500 to-indigo-600', 
      bgColor: 'from-purple-50 to-indigo-50',
      textColor: 'text-purple-700',
      description: 'Excellent work! You have a strong understanding of the topic.'
    };
    if (percentage >= 70) return { 
      level: 'Good', 
      icon: Award, 
      color: 'from-emerald-500 to-green-600', 
      bgColor: 'from-emerald-50 to-green-50',
      textColor: 'text-emerald-700',
      description: 'Good job! You have a solid grasp of the fundamentals.'
    };
    return { 
      level: 'Needs Improvement', 
      icon: Target, 
      color: 'from-red-500 to-red-600', 
      bgColor: 'from-red-50 to-red-50',
      textColor: 'text-red-700',
      description: 'Keep practicing! Review the material and try again.'
    };
  };

  const performanceData = getPerformanceLevel();

  const saveCertificateAndRedirect = async () => {
    if (!name.trim()) {
      alert('Please enter your name exactly as you want it on the certificate.');
      return;
    }
    setGenerating(true);

    try {
      const certificateData = {
        id: Date.now().toString(),
        userName: name.trim(),
        name: name.trim(),
        courseTitle,
        score,
        total,
        percentage,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        certificateNumber,
        timeSpent: timeSpent || 0,
        passed
      };

      saveCertificate(certificateData);

      setTimeout(() => {
        setGenerating(false);
        navigate('/certificates');
      }, 2000);
    } catch (error) {
      console.error('Error saving certificate:', error);
      setGenerating(false);
      alert('Failed to save certificate. Please try again.');
    }
  };

  const handleBackToCourses = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-4 relative overflow-hidden">
      
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

      {/* Celebration Animation */}
      <CelebrationEffect show={showCelebration && passed} />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <PerformanceHeader
          performanceData={performanceData}
          courseTitle={courseTitle}
        />

        {/* Results Summary */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 md:p-10 mb-8 sm:mb-12">
          <ResultSummaryCard
            passed={passed}
            performanceData={performanceData}
          />
          <PerformanceStatsGrid
            score={score}
            total={total}
            percentage={percentage}
            timeSpentFormatted={timeSpentFormatted}
            performanceData={performanceData}
          />
        </div>

        {/* Action Section */}
        {passed ? (
          <CertificateForm
            name={name}
            setName={setName}
            generating={generating}
            saveCertificateAndRedirect={saveCertificateAndRedirect}
          />
        ) : (
          <RetrySection
            handleBackToCourses={handleBackToCourses}
          />
        )}

        {/* Rate Experience Button */}
        <RatingButton
          onClick={() => setShowRatingModal(true)}
        />
      </div>
    </div>
  );
}

// Import icons at top
import {
  Crown, Medal, Award, Target, CheckCircle, XCircle, Sparkles,
  BarChart3, Star, Clock, Trophy, ArrowRight, Brain, BookOpen
} from 'lucide-react';