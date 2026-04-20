// components/Result/CelebrationEffect.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CelebrationEffect({ show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className="absolute animate-bounce" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-yellow-400" />
        </div>
      ))}
    </div>
  );
}