// components/RatingForm/ModalWrapper.jsx
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

export default function ModalWrapper({ children, onClose }) {
  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Trap focus
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, textarea, [href], input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements?.length) focusableElements[0].focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg sm:rounded-2xl shadow-xl w-full max-w-md mx-auto animate-[fadeIn_0.3s_ease-out] p-4 sm:p-6 md:p-8 relative"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
        </button>
        {children}
      </div>
    </div>
  );
}