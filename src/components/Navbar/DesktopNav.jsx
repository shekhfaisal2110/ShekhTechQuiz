// components/Navbar/DesktopNav.jsx
import React, { useState, useEffect } from "react";
import NavItem from "./NavItem";
import ProfileButton from "./ProfileButton";

// Skeleton version of DesktopNav
const SkeletonDesktopNav = () => {
  return (
    <div className="hidden md:flex items-center space-x-1 sm:space-x-2 animate-pulse">
      {/* Skeleton nav items (assume 4 main links) */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-10 w-10 sm:w-12 bg-gray-200 rounded-lg" />
      ))}
      {/* Skeleton profile button */}
      <div className="h-10 w-10 sm:w-12 bg-gray-200 rounded-full" />
    </div>
  );
};

export default function DesktopNav({
  navLinks,
  isActive,
  handleProfileClick,
  user,
  profileImage,
  authLoading,
}) {
  const [loading, setLoading] = useState(true);

  // Simulate initial load (e.g., waiting for auth or hydration)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <SkeletonDesktopNav />;
  }

  // Show real nav after loading
  return (
    <div className="hidden md:flex items-center space-x-1 sm:space-x-2">
      {navLinks.map((link) => (
        <NavItem
          key={link.to}
          to={link.to}
          label={link.label}
          Icon={link.icon}
          count={link.count}
          isActive={isActive(link.to)}
          variant="desktop"
        />
      ))}

      <ProfileButton
        user={user}
        profileImage={profileImage}
        authLoading={authLoading}
        onClick={handleProfileClick}
        variant="desktop"
      />
    </div>
  );
}