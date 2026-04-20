// components/ContactForm/ContactHeader.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function ContactHeader() {
  return (
    <div className="max-w-lg sm:max-w-4xl mx-auto text-center mb-6 sm:mb-10">
      <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-blue-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
        <MessageCircle className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Contact ShekhTech Support
      </h1>
      <p className="text-base sm:text-lg text-gray-600">We're here to help improve your quiz experience</p>
    </div>
  );
}