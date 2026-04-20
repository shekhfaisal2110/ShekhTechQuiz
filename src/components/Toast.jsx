// components/Toast.jsx
import React from 'react';
import { Check, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const getColors = () => {
    switch(type) {
      case 'success': return 'bg-green-500 text-white border-green-600';
      case 'error': return 'bg-red-500 text-white border-red-600';
      case 'warning': return 'bg-yellow-500 text-white border-yellow-600';
      case 'info': return 'bg-blue-500 text-white border-blue-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'success': return <Check className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md rounded-lg shadow-lg border-l-4 ${getColors()} p-4 flex items-start space-x-3 animate-fade-in-down`}>
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="flex-shrink-0 ml-2 text-white hover:text-gray-200 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}