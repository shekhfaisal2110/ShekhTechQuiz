// components/NotificationToast.jsx
import React from "react";

export default function NotificationToast({ notification }) {
  if (!notification.show) return null;

  return (
    <div
      className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-[9999] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg text-white text-xs sm:text-sm font-semibold transition-all duration-300 animate-fadeIn ${
        notification.type === "success"
          ? "bg-emerald-600"
          : "bg-red-600"
      }`}
    >
      {notification.message}
    </div>
  );
}