import React from 'react';
import { Shield, AlertTriangle, Lock, Eye, XCircle, CheckCircle, AlertOctagon } from 'lucide-react';

/**
 * SecurityAlert - A reusable security alert modal component
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback function to close the modal
 * @param {string} alertType - Type of security alert (copy, paste, rightclick, screenshot, tabswitch, devtools)
 * @param {function} onTerminate - Optional callback for terminating quiz/session
 * @param {object} customContent - Optional custom content override
 * @param {string} theme - Optional theme (default, danger, warning, info)
 */
const SecurityAlert = ({ 
  isOpen, 
  onClose, 
  alertType, 
  onTerminate,
  customContent,
  theme = 'default'
}) => {
  if (!isOpen) return null;

  const getAlertContent = () => {
    // Allow custom content override
    if (customContent) {
      return customContent;
    }
    switch (alertType) {
      case 'copy':
        return {
          icon: <Lock className="w-8 sm:w-10 h-8 sm:h-10 text-orange-500" />,
          title: '⚠️ Copy Activity Detected',
          subtitle: 'Content Protection Active',
          message: 'Copying content is not allowed during the quiz.',
          warning: 'Further violations will result in quiz termination.',
          severity: 'warning',
          bgColor: 'from-orange-500 to-orange-600',
          borderColor: 'border-orange-200',
          warningBg: 'bg-orange-50',
          warningBorder: 'border-orange-200',
          warningText: 'text-orange-700',
          showTerminate: false
        };
      case 'paste':
        return {
          icon: <Lock className="w-8 sm:w-10 h-8 sm:h-10 text-orange-500" />,
          title: '⚠️ Paste Activity Detected',
          subtitle: 'Content Protection Active',
          message: 'Pasting content is not allowed during the quiz.',
          warning: 'Further violations will result in quiz termination.',
          severity: 'warning',
          bgColor: 'from-orange-500 to-orange-600',
          borderColor: 'border-orange-200',
          warningBg: 'bg-orange-50',
          warningBorder: 'border-orange-200',
          warningText: 'text-orange-700',
          showTerminate: false
        };
      case 'rightclick':
        return {
          icon: <Eye className="w-8 sm:w-10 h-8 sm:h-10 text-blue-500" />,
          title: '⚠️ Right Click Detected',
          subtitle: 'Context Menu Disabled',
          message: 'Right-click context menu is disabled during the quiz.',
          warning: 'Please use only left-click to interact with the quiz.',
          severity: 'info',
          bgColor: 'from-blue-500 to-blue-600',
          borderColor: 'border-blue-200',
          warningBg: 'bg-blue-50',
          warningBorder: 'border-blue-200',
          warningText: 'text-blue-700',
          showTerminate: false
        };
      case 'screenshot':
        return {
          icon: <Shield className="w-8 sm:w-10 h-8 sm:h-10 text-red-500" />,
          title: '🚫 Screenshot Attempt Detected',
          subtitle: 'Security Violation',
          message: 'Taking screenshots is strictly prohibited.',
          warning: 'This violation has been logged. Quiz will be terminated on next attempt.',
          severity: 'danger',
          bgColor: 'from-red-500 to-red-600',
          borderColor: 'border-red-200',
          warningBg: 'bg-red-50',
          warningBorder: 'border-red-200',
          warningText: 'text-red-700',
          showTerminate: true
        };
      case 'tabswitch':
        return {
          icon: <AlertTriangle className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-500" />,
          title: '🚫 Tab Switch Detected',
          subtitle: 'Navigation Restricted',
          message: 'Switching tabs during the quiz is not allowed.',
          warning: 'Multiple tab switches will result in automatic quiz termination.',
          severity: 'warning',
          bgColor: 'from-yellow-500 to-yellow-600',
          borderColor: 'border-yellow-200',
          warningBg: 'bg-yellow-50',
          warningBorder: 'border-yellow-200',
          warningText: 'text-yellow-700',
          showTerminate: false
        };
      case 'devtools':
        return {
          icon: <AlertOctagon className="w-8 sm:w-10 h-8 sm:h-10 text-red-500" />,
          title: '🚫 Developer Tools Detected',
          subtitle: 'Critical Security Violation',
          message: 'Opening developer tools is not permitted.',
          warning: 'Quiz will be terminated immediately for security reasons.',
          severity: 'danger',
          bgColor: 'from-red-600 to-red-700',
          borderColor: 'border-red-300',
          warningBg: 'bg-red-50',
          warningBorder: 'border-red-200',
          warningText: 'text-red-700',
          showTerminate: true
        };
      default:
        return {
          icon: <AlertTriangle className="w-8 sm:w-10 h-8 sm:h-10 text-gray-500" />,
          title: '⚠️ Security Violation',
          subtitle: 'Unauthorized Activity',
          message: 'Unauthorized activity detected.',
          warning: 'Please follow quiz guidelines.',
          severity: 'info',
          bgColor: 'from-gray-500 to-gray-600',
          borderColor: 'border-gray-200',
          warningBg: 'bg-gray-50',
          warningBorder: 'border-gray-200',
          warningText: 'text-gray-700',
          showTerminate: false
        };
    }
  };

  const content = getAlertContent();

  // Handle keyboard events for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="security-alert-title"
      aria-describedby="security-alert-description"
      onKeyDown={handleKeyDown}
    >
      {/* Enhanced Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Main Modal Container - Responsive */}
      <div className={`relative bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border-2 ${content.borderColor} max-w-md w-full mx-2 sm:mx-4 transform transition-all duration-300 scale-100 opacity-100 animate-bounce-in`}>
        
        {/* Header Section - Responsive */}
        <div className="p-6 sm:p-8 pb-4 sm:pb-6">
          <div className="text-center">
            {/* Icon Container - Responsive */}
            <div className={`w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br ${content.bgColor} rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-md sm:shadow-lg ring-4 ring-white`}>
              {content.icon}
            </div>
            
            {/* Title - Responsive */}
            <h2 
              id="security-alert-title"
              className={`text-xl sm:text-2xl font-bold mb-2 ${
                content.severity === 'danger' ? 'text-red-600' :
                content.severity === 'warning' ? 'text-orange-600' :
                content.severity === 'info' ? 'text-blue-600' :
                'text-gray-600'
              }`}
            >
              {content.title}
            </h2>
            {/* Subtitle - Responsive */}
            {content.subtitle && (
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4">
                {content.subtitle}
              </p>
            )}
            
            {/* Main Message - Responsive */}
            <p 
              id="security-alert-description"
              className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed"
            >
              {content.message}
            </p>
            
            {/* Warning Box - Responsive */}
            <div className={`${content.warningBg} border ${content.warningBorder} rounded-lg p-3 sm:p-4 mb-4 sm:mb-6`}>
              <div className="flex items-start space-x-2">
                <AlertTriangle className={`w-4 sm:w-5 h-4 sm:h-5 ${content.warningText} flex-shrink-0 mt-0.5`} />
                <p className={`${content.warningText} font-semibold text-xs sm:text-sm text-left`}>
                  {content.warning}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons - Responsive */}
        <div className="bg-gray-50 px-6 sm:px-8 py-4 sm:py-6 rounded-b-xl sm:rounded-b-2xl border-t border-gray-100">
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Continue Button - Responsive */}
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm sm:text-base"
              autoFocus
            >
              <span className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Continue Quiz</span>
              </span>
            </button>
            
            {/* Terminate Button (conditional) - Responsive */}
            {(content.showTerminate || alertType === 'screenshot' || alertType === 'devtools') && onTerminate && (
              <button
                onClick={onTerminate}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm sm:text-base"
              >
                <span className="flex items-center justify-center space-x-2">
                  <XCircle className="w-4 h-4" />
                  <span>Terminate Quiz</span>
                </span>
              </button>
            )}
          </div>
        </div>
        
        {/* Close button (X) - Responsive */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full p-1"
          aria-label="Close security alert"
        >
          <XCircle className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>
        
        {/* Security indicator - Responsive */}
        <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full animate-pulse border-2 border-white shadow-sm"></div>
      </div>
    </div>
  );
};

export default SecurityAlert;