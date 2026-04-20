// components/QuizGuidelines/PlatformFeaturesSection.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

export default function PlatformFeaturesSection() {
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 sm:mb-6 flex items-center">
        <CheckCircle className="w-6 sm:w-7 h-6 sm:h-7 text-green-500 mr-2" />
        How the ShekhTech Quiz Platform Works
      </h2>
      <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-xs sm:text-base text-gray-700 mb-6 sm:mb-8">
        <li>
          <b className="text-green-700">Modern Interface:</b> Enjoy a distraction-free, mobile-friendly quiz experience optimized for all devices.
        </li>
        <li>
          <b className="text-green-700">Security Focus:</b> Advanced anti-cheat measures ensure a fair environment for all participants.
        </li>
        <li>
          <b className="text-green-700">Instant Feedback:</b> See your results immediately after completion with detailed score breakdown.
        </li>
        <li>
          <b className="text-green-700">Certificate Awards:</b> High performers receive professional digital certificates for their achievements.
        </li>
        <li>
          <b className="text-green-700">Progressive Learning:</b> Multiple attempts allow you to learn and improve over time.
        </li>
        <li>
          <b className="text-green-700">Anonymous Privacy:</b> No personal information required - your privacy is completely protected.
        </li>
      </ul>
    </>
  );
}