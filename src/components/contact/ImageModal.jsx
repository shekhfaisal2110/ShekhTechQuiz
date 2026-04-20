import React, { useEffect } from 'react';
import { X } from 'lucide-react';


const ImageModal = ({ isOpen, imageUrl, altText, onClose }) => {
  if (!isOpen) return null;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup on unmount or when modal closes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Container with Animation */}
      <div 
        className="relative max-w-5xl w-full max-h-[95vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-300 scale-100 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
          <h3 
            id="modal-title"
            className="text-xl font-bold text-gray-800 dark:text-white flex items-center"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            {altText || 'Image Preview'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container */}
        <div className="p-6 flex justify-center items-center">
          <div className="relative group">
            <img 
              src={imageUrl} 
              alt={altText || 'Preview'}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 border border-gray-200 dark:border-gray-700"
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4 pointer-events-none">
              <span className="text-white text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                Click outside to close
              </span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">ESC</kbd> or click outside to close
          </p>
        </div>
      </div>

      {/* Animation CSS (Optional — if you’re not using Tailwind’s animate-* utilities) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ImageModal;