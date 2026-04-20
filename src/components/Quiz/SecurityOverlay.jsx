// components/Quiz/SecurityOverlay.jsx
import React from 'react';
import {
  EyeOff
} from 'lucide-react';

export default function SecurityOverlay({ isTabActive, tabSwitchCount }) {
  if (isTabActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-xs sm:max-w-md">
        <EyeOff className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Quiz Paused</h2>
        <p className="text-lg sm:text-xl mb-4">Please return to this tab to continue</p>
        <p className="text-sm text-red-300">
          Tab switches: {tabSwitchCount}/3 (Quiz will auto-terminate at 3)
        </p>
      </div>
    </div>
  );
}