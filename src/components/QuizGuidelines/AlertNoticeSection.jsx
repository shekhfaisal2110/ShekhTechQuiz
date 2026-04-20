// components/QuizGuidelines/AlertNoticeSection.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

export default function AlertNoticeSection() {
  return (
    <div className="flex flex-col sm:flex-row items-start bg-red-50 border border-red-300 text-red-700 rounded-lg px-3 sm:px-4 py-3 mb-6 sm:mb-8">
      <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 mr-0 sm:mr-3 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm sm:text-base mb-1">IMPORTANT SECURITY NOTICE:</p>
        <p className="text-xs sm:text-sm">
          Any attempts at cheating or system abuse will result in immediate action including quiz termination, zero scores, and potential temporary access restrictions. While you can take multiple attempts, each attempt must be completed honestly and independently.
        </p>
      </div>
    </div>
  );
}