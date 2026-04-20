import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  HelpCircle,
  X,
  AlertTriangle,
  CheckCircle,
  Timer,
  RotateCcw,
  Shield,
} from 'lucide-react';
import { faqData } from '../../data/faqData';
import FAQItem from './FAQItem';

const categories = ['All', 'Getting Started', 'Quiz Rules', 'Security', 'Multiple Attempts', 'Results & Certificates', 'Technical'];

// Skeleton Component for FAQ Items
const FAQItemSkeleton = () => (
  <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-5 sm:p-6 animate-pulse">
    <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
    </div>
  </div>
);

// Skeleton for Stats Cards
const StatCardSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200/50 animate-pulse">
    <div className="flex items-center space-x-2 sm:space-x-3">
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 rounded-xl"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-12"></div>
      </div>
    </div>
  </div>
);

// Skeleton for Category Buttons (Desktop)
const CategoryButtonSkeleton = () => (
  <div className="h-8 sm:h-9 w-20 sm:w-24 bg-gray-200 rounded-xl sm:rounded-2xl"></div>
);

// Main FAQ Component
export default function QuizFAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState(new Set([1, 2, 6, 11, 12, 17]));
  const [loading, setLoading] = useState(true); // 👈 New loading state

  // Simulate loading delay (2.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const expandAll = () => {
    setOpenItems(new Set(filteredFAQs.map(faq => faq.id)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  // 🟡 Render Skeleton UI while loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background - Keep as is */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse sm:w-96 sm:h-96" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-blue-700 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 sm:w-96 sm:h-96" />
        </div>

        {/* Header Skeleton */}
        <div className="relative z-10 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-8 sm:h-10 bg-gray-200 rounded w-48 sm:w-64 mx-auto sm:mx-0"></div>
                  <div className="h-4 bg-gray-200 rounded w-64 sm:w-80 mx-auto sm:mx-0"></div>
                </div>
              </div>

              {/* Stats Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
                {[...Array(4)].map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search & FAQ Skeleton */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-5 sm:p-8 mb-6 sm:mb-8 animate-pulse">
            {/* Search Bar Skeleton */}
            <div className="h-10 sm:h-12 bg-gray-100 rounded-xl sm:rounded-2xl mb-5 sm:mb-6"></div>

            {/* Category Buttons Skeleton (Desktop) */}
            <div className="hidden sm:flex flex-wrap gap-2 justify-center mb-5 sm:mb-6">
              {categories.map((_, i) => (
                <CategoryButtonSkeleton key={i} />
              ))}
            </div>

            {/* Mobile Dropdown Skeleton */}
            <div className="sm:hidden h-10 bg-gray-100 rounded-xl mb-5 sm:mb-6"></div>

            {/* Expand/Collapse Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-end mb-4">
              <div className="h-8 w-full sm:w-32 bg-gray-100 rounded-xl"></div>
              <div className="h-8 w-full sm:w-32 bg-gray-100 rounded-xl"></div>
            </div>

            {/* Results Count Skeleton */}
            <div className="text-center">
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
            </div>
          </div>

          {/* Important Notice Skeleton */}
          <div className="bg-gray-200 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 animate-pulse">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-xl sm:rounded-2xl flex-shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>

          {/* FAQ Items Skeleton */}
          <div className="space-y-3 sm:space-y-4">
            {[...Array(6)].map((_, i) => (
              <FAQItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 🟢 Render actual content after loading
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse sm:w-96 sm:h-96" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-blue-700 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 sm:w-96 sm:h-96" />
      </div>

      {/* Header Section - Fully Responsive */}
      <div className="relative z-10 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
                <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Quiz Help Center
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mt-2 px-2 sm:px-0">
                  Everything you need to know about ShekhTech Quiz Platform
                </p>
              </div>
            </div>

            {/* Quick Stats - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200/50">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">No Login Required</p>
                    <p className="font-bold text-sm sm:text-base text-gray-900">Anonymous</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200/50">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Time Limit</p>
                    <p className="font-bold text-sm sm:text-base text-gray-900">5 Minutes</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200/50">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Attempts</p>
                    <p className="font-bold text-sm sm:text-base text-gray-900">Unlimited</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200/50">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Max Violations</p>
                    <p className="font-bold text-sm sm:text-base text-gray-900">3 Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section - Fully Responsive */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-5 sm:p-8 mb-6 sm:mb-8">
          {/* Search Bar - Responsive */}
          <div className="relative mb-5 sm:mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search quiz guidelines, rules, and policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border border-gray-300 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
              </button>
            )}
          </div>

          {/* Category Filter - Fully Responsive */}
          <div className="space-y-4 mb-5 sm:mb-6">
            {/* Mobile: Category Selector Dropdown */}
            <div className="sm:hidden">
              <label htmlFor="category-select" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Select Category:
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop: Category Buttons */}
            <div className="hidden sm:flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Expand/Collapse Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-end">
              <button
                onClick={expandAll}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-green-100 text-green-700 rounded-xl sm:rounded-2xl font-medium text-xs sm:text-sm hover:bg-green-200 transition-colors duration-200"
              >
                📂 Expand All
              </button>
              <button
                onClick={collapseAll}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 text-red-700 rounded-xl sm:rounded-2xl font-medium text-xs sm:text-sm hover:bg-red-200 transition-colors duration-200"
              >
                📁 Collapse All
              </button>
            </div>
          </div>

          {/* Results Count - Responsive */}
          <div className="text-center mt-4">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing <span className="font-bold text-blue-600">{filteredFAQs.length}</span> of{' '}
              <span className="font-bold text-blue-600">{faqData.length}</span> guidelines
            </p>
          </div>
        </div>

        {/* Important Notice - Responsive */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Important Security Notice</h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Any attempts at cheating or system abuse will result in immediate action including quiz termination, 
                zero scores, and potential temporary access restrictions. While you can take multiple attempts, 
                each attempt must be completed honestly and independently.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Items - Responsive */}
        <div className="space-y-3 sm:space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItems.has(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            ))
          ) : (
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-6 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">No Results Found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 max-w-md mx-auto px-2">
                We couldn't find any guidelines matching your search. Try adjusting your search terms or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-gradient-to-br from-blue-500 to-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Show All Guidelines
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}