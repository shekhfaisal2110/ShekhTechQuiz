// components/ContactForm/IssueCategorySelector.jsx
import React from 'react';
import { AlertCircle, Award, FileText, MessageCircle, Lightbulb } from 'lucide-react';

export default function IssueCategorySelector({ selected, onChange, error }) {
  const categories = [
    { value: 'quiz-issues', label: 'Quiz Issues', desc: 'Problems during quiz', icon: AlertCircle },
    { value: 'certificate-issues', label: 'Certificate Issues', desc: 'Problems with certificates', icon: Award },
    { value: 'technical-issues', label: 'Technical Issues', desc: 'Website not working', icon: FileText },
    { value: 'course-feedback', label: 'Course Feedback', desc: 'Feedback about courses', icon: MessageCircle },
    { value: 'suggestions', label: 'Suggestions', desc: 'Ideas for improvement', icon: Lightbulb },
    { value: 'other', label: 'Other', desc: 'General inquiry', icon: MessageCircle }
  ];

  return (
    <div>
      <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
        What type of issue are you experiencing? *
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => onChange({ target: { name: 'issueCategory', value: category.value } })}
            className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 text-left transition-all duration-200 ${
              selected === category.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start space-x-2 sm:space-x-3">
              <category.icon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mt-1" />
              <div>
                <div className="font-semibold text-sm sm:text-base text-gray-900">{category.label}</div>
                <div className="text-xs sm:text-sm text-gray-500">{category.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs sm:text-sm mt-2">{error}</p>}
    </div>
  );
}