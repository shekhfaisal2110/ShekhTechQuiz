// components/Result/ResultSummaryCard.jsx
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ResultSummaryCard({ passed, performanceData }) {
  const Icon = passed ? CheckCircle : XCircle;

  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className={`w-24 sm:w-32 h-24 sm:h-32 mx-auto rounded-full flex items-center justify-center mb-6 sm:mb-8 bg-gradient-to-br ${performanceData.bgColor} border-4 ${passed ? 'border-emerald-200' : 'border-red-200'} shadow-xl sm:shadow-2xl`}>
        <Icon className={`w-16 sm:w-20 h-16 sm:h-20 ${passed ? 'text-emerald-600' : 'text-red-600'}`} />
      </div>
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 ${passed ? 'text-emerald-700' : 'text-red-700'}`}>
        {passed ? 'Congratulations!' : 'Keep Trying!'}
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md sm:max-w-2xl mx-auto px-2">
        {performanceData.description}
      </p>
    </div>
  );
}