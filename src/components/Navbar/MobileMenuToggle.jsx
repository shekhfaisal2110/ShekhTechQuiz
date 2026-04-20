// components/Navbar/MobileMenuToggle.jsx
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Skeleton version of the MobileMenuToggle
const SkeletonMobileMenuToggle = () => {
  return (
    <div className="p-2 rounded-md bg-gray-200 animate-pulse w-10 h-10" />
  );
};

export default function MobileMenuToggle({ isMenuOpen, onClick }) {
  const [loading, setLoading] = useState(true);

  // Simulate initial load delay (e.g., waiting for hydration or auth)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <SkeletonMobileMenuToggle />;
  }

  // Show real toggle button after loading
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
      aria-label="Toggle menu"
    >
      {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  );
}