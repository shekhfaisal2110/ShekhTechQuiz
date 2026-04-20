// components/ContactForm/UploadedImagesPreview.jsx
import React from 'react';
import { Eye, X } from 'lucide-react';

export default function UploadedImagesPreview({ images, onRemove, onOpenModal }) {
  return (
    <div className="mt-4 sm:mt-6">
      <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Uploaded Images:</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden border-2 border-gray-200">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onOpenModal(image.url, image.name)}
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-1 sm:space-x-2">
              <button
                type="button"
                onClick={() => onOpenModal(image.url, image.name)}
                className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Eye className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
              </button>
              <button
                type="button"
                onClick={() => onRemove(image.id)}
                className="p-1.5 sm:p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
              >
                <X className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
            {image.type === 'demo' && (
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-xxs sm:text-xs px-1 py-0.5 rounded">
                Demo
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}