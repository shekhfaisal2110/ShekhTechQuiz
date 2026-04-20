// components/Result/CertificateForm.jsx
import React from 'react';
import { User, Trophy, ArrowRight, Award } from 'lucide-react';

export default function CertificateForm({
  name,
  setName,
  generating,
  saveCertificateAndRedirect
}) {
  return (
    <div className="space-y-6 sm:space-y-8 mb-8">
      <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 md:p-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full sm:rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-xl">
            <Award className="w-6 sm:w-8 h-6 sm:h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Generate Your Professional Certificate</h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md sm:max-w-2xl mx-auto px-2">
            Enter your name exactly as you want it to appear on your certificate. This will be saved to your achievement history.
          </p>
        </div>

        <div className="max-w-lg mx-auto space-y-4 sm:space-y-6">
          <div className="relative">
            <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 sm:w-6 h-5 sm:h-6" />
            <input
              className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-base sm:text-lg placeholder-gray-400 font-medium"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name..."
              maxLength={50}
            />
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <button
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-md hover:shadow-xl flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base"
              onClick={saveCertificateAndRedirect}
              disabled={generating || !name.trim()}
            >
              {generating ? (
                <>
                  <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving Certificate...</span>
                </>
              ) : (
                <>
                  <Trophy className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>Save Certificate & View History</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}