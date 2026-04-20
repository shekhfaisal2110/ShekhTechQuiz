import React, { useRef, useState, useEffect } from "react";
import DecorativeElements from "./DecorativeElements";
import SecurityAlert from "../Certificate/SecurityAlert/SecurityAlert";
import CertificateHeader from "./CertificateHeader";
import CertificateBody from "./CertificateBody";
import CertificateFooter from "./CertificateFooter";
import CertificateSecurityBadge from "./CertificateSecurityBadge";
import CertificateWatermark from "./CertificateWatermark";

export default function Certificate({
  name = "Shekh Tech",
  courseTitle = "Full Stack Web Development",
  score = 10,
  total = 10,
  percentage = 100,
  date = "30th june 2025",
  certificateNumber = "ST20252110",
}) {
  const certificateRef = useRef();
  const [securityAlert, setSecurityAlert] = useState({
    isOpen: false,
    type: null
  });

  

  // Enhanced security alert function
  const showSecurityAlert = (type) => {
    setSecurityAlert({
      isOpen: true,
      type
    });
  };

  const closeSecurityAlert = () => {
    setSecurityAlert({
      isOpen: false,
      type: null
    });
  };

  // Enhanced protection system
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      showSecurityAlert('rightclick');
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.keyCode === 123) { // F12
        e.preventDefault(); showSecurityAlert('screenshot'); return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) { // Ctrl+Shift+I
        e.preventDefault(); showSecurityAlert('screenshot'); return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) { // Ctrl+Shift+J
        e.preventDefault(); showSecurityAlert('screenshot'); return false;
      }
      if (e.ctrlKey && e.keyCode === 85) { // Ctrl+U
        e.preventDefault(); showSecurityAlert('copy'); return false;
      }
      if (e.ctrlKey && e.keyCode === 83) { // Ctrl+S
        e.preventDefault(); showSecurityAlert('screenshot'); return false;
      }
      if (e.ctrlKey && e.keyCode === 65) { // Ctrl+A
        e.preventDefault(); showSecurityAlert('copy'); return false;
      }
      if (e.ctrlKey && e.keyCode === 67) { // Ctrl+C
        e.preventDefault(); showSecurityAlert('copy'); return false;
      }
      if (e.ctrlKey && e.keyCode === 86) { // Ctrl+V
        e.preventDefault(); return false;
      }
      if (e.ctrlKey && e.keyCode === 88) { // Ctrl+X
        e.preventDefault(); showSecurityAlert('copy'); return false;
      }
      if (e.keyCode === 44) { // Print Screen
        e.preventDefault(); showSecurityAlert('screenshot'); return false;
      }
    };

    // Disable text selection
    const disableSelection = (e) => {
      e.preventDefault();
      showSecurityAlert('copy');
      return false;
    };

    // Detect DevTools open
    const detectDevTools = () => {
      const threshold = 160;
      const checkDevTools = () => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          showSecurityAlert('screenshot');
        }
      };
      setInterval(checkDevTools, 1000);
    };

    // Clear console periodically
    const clearConsole = () => {
      setInterval(() => {
        console.clear();
        console.log('%c🔒 Certificate Security Active', 'color: #dc2626; font-size: 16px; font-weight: bold;');
        console.log('%c⚠️  Unauthorized access attempts are logged', 'color: #ea580c; font-size: 12px;');
      }, 2000);
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyDown);
    document.addEventListener('selectstart', disableSelection);
    document.addEventListener('dragstart', disableSelection);

    // Apply protections
    detectDevTools();
    clearConsole();

    // Disable text selection globally
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyDown);
      document.removeEventListener('selectstart', disableSelection);
      document.removeEventListener('dragstart', disableSelection);
      
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
    };
  }, []);

  return (
    <div 
      className="w-full max-w-6xl mx-auto p-4"
      style={{ 
        userSelect: 'none', 
        WebkitUserSelect: 'none', 
        MozUserSelect: 'none', 
        msUserSelect: 'none' 
      }}
      onSelectStart={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Security Alert Modal */}
      <SecurityAlert
        isOpen={securityAlert.isOpen}
        onClose={closeSecurityAlert}
        alertType={securityAlert.type}
      />

      {/* Certificate Container */}
      <div 
        ref={certificateRef}
        className="w-full max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto min-h-[700px] h-auto bg-white relative overflow-hidden border-8 border-cyan-500 shadow-2xl p-4 sm:p-8 rounded-lg"
        style={{ 
          userSelect: 'none', 
          WebkitUserSelect: 'none', 
          MozUserSelect: 'none', 
          msUserSelect: 'none',
          pointerEvents: 'auto'
        }}
        onSelectStart={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Decorative Background */}
        <DecorativeElements />

        {/* Inner border */}
        <div className="absolute inset-3 border-2 border-cyan-400 rounded-sm pointer-events-none"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col h-full min-h-[680px] justify-between p-4 sm:p-8">
          <CertificateHeader />
          <CertificateBody 
            name={name} 
            courseTitle={courseTitle} 
            score={score} 
            total={total} 
            percentage={percentage} 
          />
          <CertificateFooter 
            date={date} 
            certificateNumber={certificateNumber} 
          />
        </div>

        {/* Security Badge & Watermark */}
        <CertificateSecurityBadge />
        <CertificateWatermark />
      </div>
    </div>
  );
}


