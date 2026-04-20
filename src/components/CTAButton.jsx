// components/CTAButton.jsx
import React from "react";
import { Home } from "lucide-react";

export default function CTAButton({ href = "/", label = "Start Your Quiz Journey" }) {
  return (
    <div className="text-center mt-8 sm:mt-10">
      <a
        href={href}
        className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-md sm:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
      >
        <Home className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
        {label}
      </a>
      <p className="text-xs sm:text-sm text-gray-500 mt-3">
        Ready to test your knowledge? No registration required!
      </p>
    </div>
  );
}