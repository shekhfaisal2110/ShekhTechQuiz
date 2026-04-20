// components/QuizGuidelines/GuidelinesContainer.jsx
import React, { useState, useEffect } from "react";
import HeaderSection from "./HeaderSection";
import GuidelinesList from "./GuidelinesList";
import LoginRequiredSection from "./LoginRequiredSection";
import MultipleAttemptsSection from "./MultipleAttemptsSection";
import NoLoginSection from "./NoLoginSection";
import PlatformFeaturesSection from "./PlatformFeaturesSection";
import BestPracticesSection from "./BestPracticesSection";
import SecurityFairPlaySection from "./SecurityFairPlaySection";
import AlertNoticeSection from "./AlertNoticeSection";
import CTAButton from "../CTAButton";

export default function GuidelinesContainer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeleton for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-6 sm:py-12 px-4 animate-pulse">
        {/* Skeleton: HeaderSection */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-2xl border border-blue-200 p-6 sm:p-8 mb-8 sm:mb-10 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-200 rounded-full"></div>
          </div>
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-11/12 max-w-3xl mx-auto mb-2"></div>
          <div className="h-4 sm:h-5 bg-gray-200 rounded w-2/3 max-w-xl mx-auto mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2.5 sm:h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton: GuidelinesList */}
        <div className="max-w-4xl mx-auto bg-white/90 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 p-5 sm:p-8 mb-8">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-6 sm:w-7 h-6 sm:h-7 bg-blue-200 rounded-full mr-2"></div>
            <div className="h-6 sm:h-7 w-3/4 bg-blue-200 rounded"></div>
          </div>
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex">
                <div className="w-6 h-6 bg-blue-200 rounded-full mr-2 flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton: LoginRequiredSection */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-10">
          <div className="flex items-start mb-5">
            <div className="w-6 sm:w-7 h-6 sm:h-7 bg-indigo-200 rounded-full mt-0.5 flex-shrink-0"></div>
            <div className="h-5 sm:h-6 bg-indigo-200 rounded w-3/4 ml-3"></div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <div className="h-4 bg-indigo-200 rounded w-1/2 mb-2"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 bg-indigo-100 rounded w-full"></div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-4 bg-indigo-200 rounded w-2/3 mb-2"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-3.5 h-3.5 bg-indigo-200 rounded-full mt-0.5 mr-2 flex-shrink-0"></div>
                    <div className="h-3 bg-indigo-100 rounded w-11/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-indigo-200">
            <div className="h-4 bg-indigo-200 rounded w-1/3 mb-2"></div>
            <div className="space-y-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-3 bg-indigo-100 rounded w-5/6"></div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-3 sm:p-4 bg-indigo-100 rounded-lg border-l-4 border-indigo-300">
            <div className="h-3 bg-indigo-200 rounded w-1/4 mb-1"></div>
            <div className="h-3 bg-indigo-200 rounded w-full"></div>
          </div>
        </div>

        {/* Skeleton: MultipleAttemptsSection */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center mb-3 sm:mb-4">
            <div className="w-5 sm:w-6 h-5 sm:h-6 bg-green-200 rounded-full mr-2"></div>
            <div className="h-5 sm:h-6 bg-green-200 rounded w-2/3"></div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <div className="h-4 bg-green-200 rounded w-1/2 mb-2"></div>
              <div className="space-y-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-3 bg-green-100 rounded w-5/6"></div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-4 bg-green-200 rounded w-1/2 mb-2"></div>
              <div className="space-y-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-3 bg-green-100 rounded w-4/5"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-100 rounded-lg">
            <div className="h-3 bg-green-200 rounded w-1/4 mb-1"></div>
            <div className="h-3 bg-green-200 rounded w-full"></div>
          </div>
        </div>

        {/* Skeleton: NoLoginSection */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center mb-3 sm:mb-4">
            <div className="w-5 sm:w-6 h-5 sm:h-6 bg-purple-200 rounded-full mr-2"></div>
            <div className="h-5 sm:h-6 bg-purple-200 rounded w-3/4"></div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <div className="h-4 bg-purple-200 rounded w-1/3 mb-2"></div>
              <div className="space-y-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-3 bg-purple-100 rounded w-5/6"></div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-4 bg-purple-200 rounded w-2/5 mb-2"></div>
              <div className="space-y-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-3 bg-purple-100 rounded w-4/5"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-purple-100 rounded-lg">
            <div className="h-3 bg-purple-200 rounded w-1/4 mb-1"></div>
            <div className="h-3 bg-purple-200 rounded w-full"></div>
          </div>
        </div>

        {/* Skeleton: Remaining Sections (PlatformFeatures, BestPractices, etc.) */}
        <div className="max-w-4xl mx-auto">
          {/* PlatformFeaturesSection skeleton */}
          <div className="mb-6 sm:mb-8 animate-pulse">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-6 sm:w-7 h-6 sm:h-7 bg-green-200 rounded-full mr-2"></div>
              <div className="h-6 sm:h-7 bg-green-200 rounded w-3/4"></div>
            </div>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[...Array(6)].map((_, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-green-200 rounded w-1/3 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* BestPracticesSection skeleton */}
          <div className="mb-6 sm:mb-8 animate-pulse">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-6 sm:w-7 h-6 sm:h-7 bg-purple-200 rounded-full mr-2"></div>
              <div className="h-6 sm:h-7 w-3/4 bg-purple-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
              <div>
                <div className="h-4 w-1/2 bg-purple-200 rounded mb-2"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 bg-gray-200 rounded w-11/12"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-4 w-2/3 bg-purple-200 rounded mb-2"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 bg-gray-200 rounded w-5/6"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SecurityFairPlaySection skeleton */}
          <div className="mb-6 sm:mb-8 animate-pulse">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-red-200 rounded-full mr-2"></div>
                <div className="h-5 sm:h-6 bg-red-200 rounded w-1/2"></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                  <div className="h-4 bg-red-200 rounded w-2/5 mb-2"></div>
                  <div className="space-y-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-3 bg-red-100 rounded w-4/5"></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="h-4 bg-red-200 rounded w-1/3 mb-2"></div>
                  <div className="space-y-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-3 bg-red-100 rounded w-5/6"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AlertNoticeSection skeleton */}
          <div className="mb-6 sm:mb-8 animate-pulse">
            <div className="flex flex-col sm:flex-row items-start bg-red-50 border border-red-300 rounded-lg px-3 sm:px-4 py-3 mb-6 sm:mb-8">
              <div className="w-5 sm:w-6 h-5 sm:h-6 bg-red-200 rounded-full mr-0 sm:mr-3 flex-shrink-0 mt-0.5"></div>
              <div>
                <div className="h-4 bg-red-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-red-200 rounded w-full"></div>
              </div>
            </div>
          </div>

          {/* CTAButton skeleton */}
          <div className="flex justify-center mb-8">
            <div className="h-12 w-48 sm:w-64 bg-blue-500 rounded-lg"></div>
          </div>
        </div>

        {/* Global Styles for Animation */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.9; }
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 py-6 sm:py-12 px-4">
      <HeaderSection />
      <GuidelinesList />
      <LoginRequiredSection />
      <MultipleAttemptsSection />
      <NoLoginSection />
      <div className="max-w-4xl mx-auto">
        <PlatformFeaturesSection />
        <BestPracticesSection />
        <SecurityFairPlaySection />
        <AlertNoticeSection />
        <CTAButton />
      </div>

      {/* Global Styles for Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}