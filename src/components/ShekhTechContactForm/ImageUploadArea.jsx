// components/ContactForm/ImageUploadArea.jsx
import React from 'react';
import { Upload, ImageIcon } from 'lucide-react';

export default function ImageUploadArea({ onFileUpload, onDrag, onDrop, dragActive }) {
  return (
    <div>
      <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
        Upload Your Screenshots or Images (Optional)
      </label>
      
      <div
        className={`border-2 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-8 text-center transition-all duration-200 ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
        <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
          Drop your images here or click to upload
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          Supports PNG, JPG, JPEG, GIF (Max 5MB each)
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors cursor-pointer text-xs sm:text-base"
        >
          <ImageIcon className="w-4 sm:w-5 h-4 sm:h-5" />
          <span>Choose Files</span>
        </label>
      </div>
    </div>
  );
}