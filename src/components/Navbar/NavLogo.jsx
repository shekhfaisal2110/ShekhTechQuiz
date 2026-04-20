// components/Navbar/NavLogo.jsx
import React, { useState, useEffect } from "react";
import LogoImg from "../../assets/sign/sfLogo.png";

// Skeleton version of the NavLogo
const SkeletonNavLogo = () => {
  return (
    <div className="flex items-center space-x-2 animate-pulse">
      {/* Skeleton logo circle */}
      <div className="w-7 sm:w-8 h-7 sm:h-8 bg-gray-200 rounded-md sm:rounded-lg" />
      {/* Skeleton text (desktop & mobile) */}
      <div className="hidden sm:block h-6 w-32 bg-gray-200 rounded" />
      <div className="sm:hidden h-6 w-24 bg-gray-200 rounded" />
    </div>
  );
};

export default function NavLogo({ onClick }) {
  const [loading, setLoading] = useState(true);

  // Simulate initial load delay (e.g., waiting for image or hydration)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <SkeletonNavLogo />;
  }

  // Show real logo after loading
  return (
    <a
      href="/"
      className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
      onClick={onClick}
    >
      <div className="w-7 sm:w-8 h-7 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-md sm:rounded-lg flex items-center justify-center">
        <img src={LogoImg} alt="Logo" className="w-5 sm:w-8 h-5 sm:h-8 object-contain" />
      </div>
      <span className="hidden sm:inline">
        ShekhTech<span className="text-gray-800">Quiz</span>
      </span>
      <span className="sm:hidden">ShekhTech<span className="text-gray-800">Quiz</span></span>
    </a>
  );
}