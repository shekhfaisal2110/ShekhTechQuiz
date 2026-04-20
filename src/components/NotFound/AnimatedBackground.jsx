// components/NotFound/AnimatedBackground.jsx
import React from 'react';
import { Star, Zap, Heart, Rocket } from 'lucide-react';

export default function AnimatedBackground() {
  return (
    <>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-purple-700 opacity-20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <Star className="w-8 h-8 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute top-32 right-32 animate-bounce delay-700">
          <Zap className="w-6 h-6 text-purple-400 opacity-60" />
        </div>
        <div className="absolute bottom-20 left-32 animate-bounce delay-1000">
          <Heart className="w-7 h-7 text-pink-400 opacity-60" />
        </div>
        <div className="absolute bottom-32 right-20 animate-bounce delay-500">
          <Rocket className="w-8 h-8 text-purple-400 opacity-60" />
        </div>
      </div>
    </>
  );
}