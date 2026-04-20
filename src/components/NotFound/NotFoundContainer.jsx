// components/NotFound/NotFoundContainer.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import NotFoundHeader from './NotFoundHeader';
import NotFoundContent from './NotFoundContent';
import RedirectCounter from './RedirectCounter';
import ActionButtons from './ActionButtons';
import QuickLinks from './QuickLinks';
import FunMessage from './FunMessage';

export default function NotFoundContainer() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Countdown timer and auto-redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          clearInterval(timer);
          setTimeout(() => {
            navigate('/');
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleManualRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-500 ${isRedirecting ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
          <NotFoundHeader isRedirecting={isRedirecting} />
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 sm:p-12 mb-8">
            <NotFoundContent />
            <RedirectCounter countdown={countdown} isRedirecting={isRedirecting} />
            <ActionButtons
              isRedirecting={isRedirecting}
              onManualRedirect={handleManualRedirect}
              onGoBack={() => window.history.back()}
            />
          </div>
          <QuickLinks />
          <FunMessage />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}