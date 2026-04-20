// components/ContactForm/SubmitButtons.jsx
import React from 'react';
import { Send } from 'lucide-react';

export default function SubmitButtons({ isSubmitting, onCancel }) {
  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6">
      <button
        type="button"
        onClick={onCancel}
        className="w-full sm:flex-1 px-4 sm:px-8 py-3 sm:py-4 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-base sm:text-lg font-semibold"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:flex-1 px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 sm:space-x-3 text-base sm:text-lg font-semibold"
      >
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <Send className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </div>
  );
}