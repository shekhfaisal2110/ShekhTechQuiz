// components/UserProfile/WelcomeBanner.jsx
import React from 'react';
import { Bell } from 'lucide-react';

export default function WelcomeBanner({ firstName, displayName, onClose }) {
  return (
    <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-4 md:p-6 text-center animate-fade-in">
      <div className="flex items-center justify-center space-x-2">
        <Bell className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-green-800 text-lg">
          Welcome back, {firstName || displayName || 'User'}!
        </h3>
      </div>
      <p className="text-green-700 text-sm md:text-base mt-2">
        Great to see you again.
      </p>
    </div>
  );
}