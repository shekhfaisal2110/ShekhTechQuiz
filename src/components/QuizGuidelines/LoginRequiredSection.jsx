// src/components/QuizGuidelines/LoginRequiredSection.jsx
import React from 'react';
import { Lock, LogIn, History, Award, Trash2, TrendingUp, User } from 'lucide-react';

export default function LoginRequiredSection() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-10">
      {/* 🔐 Header */}
      <div className="flex items-start mb-5">
        <Lock className="w-6 sm:w-7 h-6 sm:h-7 text-indigo-600 mt-0.5 flex-shrink-0" />
        <h3 className="text-lg sm:text-xl font-bold text-indigo-800 ml-3">
          🔐 Access to Personal History & Analytics Requires Login
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {/* 🔒 Protected Features */}
        <div>
          <h4 className="font-semibold text-indigo-700 mb-2 text-sm sm:text-base flex items-center">
            <Lock className="w-4 h-4 mr-2" />
            Protected Features:
          </h4>
          <ul className="text-xs sm:text-sm text-indigo-700 space-y-1.5">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <strong>User History</strong> — Track all your quiz attempts over time
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <strong>Certificate Vault</strong> — View, manage, or restore deleted certificates
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <strong>Performance Analytics</strong> — See skill trends and progress
            </li>
          </ul>
        </div>

        {/* 📋 Recently Activity Guidelines */}
        <div>
          <h4 className="font-semibold text-indigo-700 mb-2 text-sm sm:text-base flex items-center">
            <History className="w-4 h-4 mr-2" />
            Recently Activity Guidelines:
          </h4>
          <ul className="text-xs sm:text-sm text-indigo-700 space-y-1.5">
            <li className="flex items-start">
              <Award className="w-3.5 h-3.5 mt-0.5 mr-2 text-yellow-600 flex-shrink-0" />
              <span><strong>Earned Certificates</strong> — Timestamped records of completed quizzes</span>
            </li>
            <li className="flex items-start">
              <Trash2 className="w-3.5 h-3.5 mt-0.5 mr-2 text-red-600 flex-shrink-0" />
              <span><strong>Deleted Certificates</strong> — Recoverable for 30 days</span>
            </li>
            <li className="flex items-start">
              <TrendingUp className="w-3.5 h-3.5 mt-0.5 mr-2 text-green-600 flex-shrink-0" />
              <span><strong>Score & Progress</strong> — View scores, percentages, and course details</span>
            </li>
            <li className="flex items-start">
              <User className="w-3.5 h-3.5 mt-0.5 mr-2 text-purple-600 flex-shrink-0" />
              <span><strong>Multi-User Support</strong> — Switch between profiles if shared device</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ How to Access */}
      <div className="mt-5 pt-4 border-t border-indigo-200">
        <h4 className="font-semibold text-indigo-700 mb-2 text-sm sm:text-base flex items-center">
          <LogIn className="w-4 h-4 mr-2" />
          How to Access:
        </h4>
        <ul className="text-xs sm:text-sm text-indigo-700 space-y-1">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Click the <strong>profile icon</strong> in the top-right corner
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Sign in with your <strong>Google account</strong>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Your activity will sync automatically — no setup needed!
          </li>
        </ul>
      </div>

      {/* 💡 Note */}
      <div className="mt-4 p-3 sm:p-4 bg-indigo-100 rounded-lg border-l-4 border-indigo-500">
        <p className="text-xs sm:text-sm text-indigo-800 flex items-start">
          <LogIn className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <strong>Note:</strong> These features are only available to logged-in users to protect your privacy. Anonymous users can still take quizzes — just download certificates immediately after earning!
        </p>
      </div>
    </div>
  );
}