// components/ContactForm/ContactFormContainer.jsx
import React, { useState, useEffect } from 'react';
import {
  MessageCircle, CheckCircle, Send, User, Mail, Phone, AlertCircle, Award, FileText, Lightbulb
} from 'lucide-react';
import { countriesData, defaultCountry } from '../../data/countriesData';
import ContactHeader from './ContactHeader';
import NameField from './NameField';
import ContactMethodSelector from './ContactMethodSelector';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import IssueCategorySelector from './IssueCategorySelector';
import OptionalFields from './OptionalFields';
import ImageUploadArea from './ImageUploadArea';
import UploadedImagesPreview from './UploadedImagesPreview';
import SuggestionsField from './SuggestionsField';
import RatingStars from './RatingStars';
import SubmitButtons from './SubmitButtons';
import ImageModal from '../contact/ImageModal';

export default function ContactFormContainer() {
  const [formData, setFormData] = useState({
    name: '',
    contactMethod: '',
    email: '',
    phone: '',
    countryCode: defaultCountry.phone,
    selectedCountry: defaultCountry,
    issueCategory: '',
    courseName: '',
    issueDescription: '',
    suggestions: '',
    rating: 0,
    uploadedImages: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [demoImageVisible, setDemoImageVisible] = useState({
    resultPage: false,
    certificate: false
  });
  const [skeletonLoading, setSkeletonLoading] = useState(true); // New state for skeleton

  // Sample demo images
  const demoImages = {
    resultPage: '/api/placeholder/800/600',
    certificate: '/api/placeholder/600/400'
  };

  // Simulate skeleton loading for 2.5 seconds
  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1500);
    return () => clearTimeout(skeletonTimer);
  }, []);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const value = inputValue.replace(/\D/g, '');
    const maxLength = formData.selectedCountry?.maxLength || 15;
    const limitedValue = value.slice(0, maxLength);
    setFormData(prev => ({ ...prev, phone: limitedValue }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleCountryChange = (selectedCountry) => {
    setFormData(prev => ({
      ...prev,
      countryCode: selectedCountry.phone,
      selectedCountry: selectedCountry,
      phone: ''
    }));
  };

  const validatePhoneNumber = (phone, country) => {
    if (!phone) return false;
    const minLength = Math.max(7, (country?.maxLength || 10) - 2);
    const maxLength = country?.maxLength || 15;
    return phone.length >= minLength && phone.length <= maxLength;
  };

  const getPhonePlaceholder = () => {
    switch (formData.selectedCountry?.code) {
      case 'IN': return '9876543210';
      case 'US': case 'CA': return '(555) 123-4567';
      case 'GB': return '7700 900123';
      case 'AU': return '0412 345 678';
      case 'DE': return '0151 23456789';
      case 'FR': return '06 12 34 56 78';
      default: return 'Enter phone number';
    }
  };

  const handleFileUpload = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;
      if (!isValidType) {
        alert('Please upload only image files (PNG, JPG, JPEG, GIF)');
        return false;
      }
      if (!isValidSize) {
        alert('File size should be less than 5MB');
        return false;
      }
      return true;
    });
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          url: e.target.result,
          type: 'uploaded'
        };
        setFormData(prev => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, imageData]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter(img => img.id !== imageId)
    }));
  };

  const openImageModal = (imageUrl, altText) => {
    setSelectedImage({ url: imageUrl, alt: altText });
    setImageModalOpen(true);
  };

  const showDemoImage = (type) => {
    setDemoImageVisible(prev => ({ ...prev, [type]: true }));
  };

  const hideDemoImage = (type) => {
    setDemoImageVisible(prev => ({ ...prev, [type]: false }));
  };

  const addDemoImage = (type) => {
    const demoImageData = {
      id: Date.now() + Math.random(),
      name: type === 'resultPage' ? 'Result Page Screenshot' : 'Certificate Image',
      url: demoImages[type],
      type: 'demo',
      demoType: type
    };
    setFormData(prev => ({
      ...prev,
      uploadedImages: [...prev.uploadedImages, demoImageData]
    }));
    hideDemoImage(type);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactMethod) newErrors.contactMethod = 'Please select a contact method';
    if (formData.contactMethod === 'email' && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.contactMethod === 'phone') {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhoneNumber(formData.phone, formData.selectedCountry)) {
        newErrors.phone = `Please enter a valid ${formData.selectedCountry?.name || 'phone'} number (${formData.selectedCountry?.maxLength || 10} digits)`;
      }
    }
    if (!formData.issueCategory) newErrors.issueCategory = 'Please select an issue category';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        fullPhoneNumber: `${formData.countryCode}${formData.phone}`,
        timestamp: new Date().toISOString()
      };

      const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contactMethod: '',
      email: '',
      phone: '',
      countryCode: defaultCountry.phone,
      selectedCountry: defaultCountry,
      issueCategory: '',
      courseName: '',
      issueDescription: '',
      suggestions: '',
      rating: 0,
      uploadedImages: []
    });
    setErrors({});
    setSubmitted(false);
    setDemoImageVisible({ resultPage: false, certificate: false });
  };

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12 px-4">
        <div className="max-w-lg sm:max-w-2xl mx-auto bg-white rounded-xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Thank You {formData.name} for Contacting ShekhTech!
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">What's Next?</h3>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
              <li>• Your request has been logged with our support team</li>
              <li>• We'll review your issue and any uploaded images</li>
              <li>• Check your {formData.contactMethod} for updates</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={resetForm}
              className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-4 border border-blue-600 text-blue-600 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors text-sm sm:text-base"
            >
              Submit Another Request
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors text-sm sm:text-base"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show skeleton loader for 2.5 seconds
  if (skeletonLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12 px-4 animate-pulse">
        {/* Skeleton: Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-2"></div>
        </div>

        {/* Skeleton: Form Container */}
        <div className="max-w-lg sm:max-w-4xl mx-auto bg-white rounded-xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Skeleton: Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
            <div className="h-6 bg-white/30 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-white/30 rounded w-2/3"></div>
          </div>

          {/* Skeleton: Form Fields */}
          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* Name Field */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-100 rounded-lg"></div>
            </div>

            {/* Contact Method */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-10 bg-gray-100 rounded-lg"></div>
            </div>

            {/* Email/Phone Field */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-100 rounded-lg"></div>
            </div>

            {/* Issue Category */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-10 bg-gray-100 rounded-lg"></div>
            </div>

            {/* Optional Fields */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-100 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-20 bg-gray-100 rounded-lg"></div>
            </div>

            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>

            {/* Suggestions */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-20 bg-gray-100 rounded-lg"></div>
            </div>

            {/* Rating */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
              <div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12 px-4">
      <ContactHeader />
      
      <div className="max-w-lg sm:max-w-4xl mx-auto bg-white rounded-xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold">Get in Touch</h2>
          <p className="text-blue-100 text-sm sm:text-base">Tell us about your experience or report any issues</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          <NameField
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />

          <ContactMethodSelector
            selected={formData.contactMethod}
            onChange={handleInputChange}
            error={errors.contactMethod}
          />

          {formData.contactMethod === 'email' && (
            <EmailField
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          )}

          {formData.contactMethod === 'phone' && (
            <PhoneField
              phone={formData.phone}
              selectedCountry={formData.selectedCountry}
              onPhoneChange={handlePhoneChange}
              onCountryChange={handleCountryChange}
              error={errors.phone}
              countriesData={countriesData}
              getPhonePlaceholder={getPhonePlaceholder}
            />
          )}

          <IssueCategorySelector
            selected={formData.issueCategory}
            onChange={handleInputChange}
            error={errors.issueCategory}
          />

          <OptionalFields
            courseName={formData.courseName}
            issueDescription={formData.issueDescription}
            onChange={handleInputChange}
          />

          <ImageUploadArea
            onFileUpload={handleFileUpload}
            onDrag={handleDrag}
            onDrop={handleDrop}
            dragActive={dragActive}
          />

          {formData.uploadedImages.length > 0 && (
            <UploadedImagesPreview
              images={formData.uploadedImages}
              onRemove={removeImage}
              onOpenModal={openImageModal}
            />
          )}

          <SuggestionsField
            value={formData.suggestions}
            onChange={handleInputChange}
          />

          <RatingStars
            rating={formData.rating}
            onRating={handleRating}
          />

          <SubmitButtons
            isSubmitting={isSubmitting}
            onCancel={() => window.history.back()}
          />
        </form>
      </div>
      
      <ImageModal
        isOpen={imageModalOpen}
        imageUrl={selectedImage?.url}
        altText={selectedImage?.alt}
        onClose={() => setImageModalOpen(false)}
      />
    </div>
  );
}