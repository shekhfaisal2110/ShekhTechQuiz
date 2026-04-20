import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Course from './pages/Course';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import CollectionCertificate from './pages/CollectionCertificate';
import Navbar from './pages/Navbar';
import CertificateDOM from './components/CertificateDownload/CertificatePDFDownloader';
import DemoCertificates from './pages/DemoCertificates';
import RecycleBin from './pages/RecycleBin';
import { getCertificates, getRecycledCertificates } from './utils/storage';
import QuizGuidelines from './pages/QuizGuidelines';
import QuizHelpForm from './pages/ContactForm';
import FAQ from './components/faq/QuizFAQ';
import NotFound from './pages/NotFound';
import History from './pages/CertificateHistory';
import UserHistory from './pages/UserHistory';
import UserProfile from './pages/UserProfile.';
import UserAnalytics from './pages/UserAnalytics';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CertificateViewer from './components/CertificateViewer/CertificateViewer';
import RecentlyActivity from './pages/RecentlyActivity';

// Create context for managing certificate counts
const CertificateContext = createContext();

export const useCertificateContext = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificateContext must be used within CertificateProvider');
  }
  return context;
};

// Certificate Provider Component
function CertificateProvider({ children }) {
  const [activeCertificateCount, setActiveCertificateCount] = useState(0);
  const [recycledCertificateCount, setRecycledCertificateCount] = useState(0);
  const location = useLocation();

  // Function to refresh certificate counts
  const refreshCounts = () => {
    try {
      const activeCerts = getCertificates();
      const recycledCerts = getRecycledCertificates();
      setActiveCertificateCount(activeCerts.length);
      setRecycledCertificateCount(recycledCerts.length);
    } catch (error) {
      console.error('Error refreshing certificate counts:', error);
      setActiveCertificateCount(0);
      setRecycledCertificateCount(0);
    }
  };

  // Load data on component mount
  useEffect(() => {
    try {
      const activeCerts = getCertificates();
      const recycledCerts = getRecycledCertificates();
      setActiveCertificateCount(activeCerts.length);
      setRecycledCertificateCount(recycledCerts.length);
    } catch (error) {
      console.error('Error loading certificate data:', error);
      setActiveCertificateCount(0);
      setRecycledCertificateCount(0);
    }
  }, []);

  // Update counts on route change
  useEffect(() => {
    refreshCounts();
  }, [location.pathname]);

  // Update counts when window gains focus
  useEffect(() => {
    const handleFocus = () => refreshCounts();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const contextValue = {
    activeCertificateCount,
    recycledCertificateCount,
    refreshCounts,
    setActiveCertificateCount,
    setRecycledCertificateCount
  };

  return (
    <CertificateContext.Provider value={contextValue}>
      {children}
    </CertificateContext.Provider>
  );
}

// Main App Component
function AppContent() {
  return (
    <>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/course/:courseId/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/certificates" element={<CollectionCertificate />} />
          <Route path="/pdf" element={<CertificateDOM/>}/>
          <Route path="/demo" element={<DemoCertificates/>}/>
          <Route path="/RecycleBin" element={<RecycleBin/>}/>
          <Route path="/QuizGuidelines" element={<QuizGuidelines/>}/>
          <Route path="/QuizHelpForm" element={<QuizHelpForm/>}/>
          <Route path="/QuizFAQ" element={<FAQ />} />

          <Route path="/certificate/:id" element={<CertificateViewer />} />

          {/* PROTECTED ROUTES — Only accessible if logged in */}
          <Route 
            path="/certificate-history" 
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/recently-activity"
            element={
              <ProtectedRoute>
                <RecentlyActivity />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/user-history" 
            element={
              <ProtectedRoute>
                <UserHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user-analytics" 
            element={
              <ProtectedRoute>
                <UserAnalytics />
              </ProtectedRoute>
            } 
          />

          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

// Root App Component
export default function App() {
  return (
    <BrowserRouter>
      <CertificateProvider>
        <AppContent />
      </CertificateProvider>
    </BrowserRouter>
  );
}
