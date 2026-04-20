// components/Navbar/NavItem.jsx
import React from "react";

export default function NavItem({
  to,
  label,
  Icon,
  count = 0,
  isActive = false,
  onClick,
  variant = "desktop", // "desktop" or "mobile"
}) {
  if (variant === "desktop") {
    const showLabel = isActive;
    return (
      <a
        href={to}
        className={`relative flex items-center ${
          showLabel ? 'space-x-2 px-2 sm:px-3 py-2' : 'justify-center'
        } rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 group ${
          isActive
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
        }`}
        style={showLabel ? {} : { width: '36px', height: '36px' }}
        onClick={onClick}
      >
        <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
        {showLabel && <span className="hidden sm:inline">{label}</span>}
        {showLabel && <span className="sm:hidden">{label.split(' ')[0]}</span>}
        {count > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full min-w-4 sm:min-w-5 h-4 sm:h-5 flex items-center justify-center font-bold px-0.5 sm:px-1 animate-pulse">
            {count}
          </div>
        )}
      </a>
    );
  }

  // Mobile variant
  return (
    <a
      href={to}
      onClick={onClick}
      className={`relative flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
        isActive
          ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600'
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
        isActive ? 'bg-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
      }`}>
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <span className="flex-1 font-medium">{label}</span>
      {count > 0 && (
        <div className="bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-bold px-1.5 animate-pulse">
          {count}
        </div>
      )}
    </a>
  );
}