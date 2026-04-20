import React, { useState, useRef, useEffect } from 'react';
import {ChevronDown,Star,X,AlertTriangle,CheckCircle,Timer,RotateCcw,Shield,
  // Icon mapping imports
  UserCheck, BookOpen, Zap, Users, Clock, Lock, Camera,Award, Eye, FileText, Settings} from 'lucide-react';
// Icon mapping object
const iconComponents = {
  UserCheck,Timer,RotateCcw,Shield,Lock,Camera,CheckCircle,AlertTriangle,Award,Star,Settings,Eye,FileText,Clock,Zap,BookOpen,X,Users
};

// Individual FAQ Item Component - Fully Responsive
const FAQItem = ({ faq, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const IconComponent = iconComponents[faq.icon];

  useEffect(() => {
    if (contentRef.current) {
      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        contentRef.current.style.maxHeight = isOpen
          ? `${contentRef.current.scrollHeight}px`
          : '0px';
      });
    }
  }, [isOpen]);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl">
      <button
        onClick={onToggle}
        className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 w-full">
            <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${
              faq.popular ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-blue-500 to-blue-700'
            }`}>
              <div className="text-white">
                {IconComponent && <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-1 sm:mb-0">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">
                  {faq.question}
                </h3>
                {faq.popular && (
                  <span className="inline-flex items-center mt-1 sm:mt-0 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-blue-600 font-medium mt-1">
                {faq.category}
              </p>
            </div>
          </div>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ml-2`}>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </div>
        </div>
      </button>
      
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: '0px' }}
      >
        <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
          <div className="pl-0 sm:pl-8 md:pl-16 mt-2 sm:mt-0">
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;