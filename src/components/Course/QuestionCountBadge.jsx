// components/Course/QuestionCountBadge.jsx
import React from 'react';

export default function QuestionCountBadge({ questionCount }) {
  const isExpected = questionCount === 10;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-8">
      <p className="text-base sm:text-lg text-gray-700">
        <strong className="font-semibold text-blue-600">Questions:</strong> {questionCount}{' '}
        {!isExpected && (
          <span className="text-orange-500">(10 expected)</span>
        )}
      </p>
    </div>
  );
}