// components/Navbar/ProfileButton.jsx
import React from "react";
import { LogIn } from "lucide-react";

const DEFAULT_PROFILE_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export default function ProfileButton({ user, profileImage, authLoading, onClick, variant = "desktop" }) {
  const sizeClasses = variant === "desktop"
    ? "w-8 h-8 sm:w-10 sm:h-10"
    : "w-8 h-8";

  const containerClasses = variant === "desktop"
    ? "ml-2 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors";

  const label = user ? (variant === "mobile" ? "My Profile" : "") : (variant === "mobile" ? "Login / Sign Up" : "");

  return (
    <button
      onClick={onClick}
      disabled={authLoading}
      className={containerClasses}
      aria-label={user ? "Go to profile" : "Login"}
    >
      {authLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
      ) : user ? (
        <img
          src={profileImage}
          alt="Profile"
          className={`${sizeClasses} rounded-full object-cover`}
          onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE; }}
        />
      ) : (
        <LogIn className={`w-4 h-4 ${variant === "desktop" ? "sm:w-5 sm:h-5" : ""} text-gray-600`} />
      )}
      {label && <span className="flex-1 text-left">{label}</span>}
    </button>
  );
}