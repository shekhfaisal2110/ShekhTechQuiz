// components/RatingForm/FeedbackTextarea.jsx
import React from "react";
import { MessageSquare } from "lucide-react";

export default function FeedbackTextarea({ feedback, setFeedback }) {
  return (
    <div className="mb-4 sm:mb-6">
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
        <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1" />
        Additional Feedback (Optional)
      </label>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all duration-200 text-xs sm:text-sm"
        rows={3}
        maxLength={500}
      />
      <div className="text-right text-xxs sm:text-xs text-gray-400 mt-1">
        {feedback.length}/500 characters
      </div>
    </div>
  );
}