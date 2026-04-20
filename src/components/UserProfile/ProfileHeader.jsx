// components/UserProfile/ProfileHeader.jsx
import React, { useState, useEffect } from 'react';
import { Camera, LogOut } from 'lucide-react';

export default function ProfileHeader({
  user,
  formData,
  profileImage,
  fileInputRef,
  onImageUpload,
  onLogout,
  onSwitchAccount,
  isSigningIn
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show skeleton for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || user?.displayName || 'User';

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-pulse">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 md:px-10 py-8 md:py-12">
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            {/* Skeleton: Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-200 border-4 border-white/30 shadow-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-white/30 rounded-full"></div>
              </div>
            </div>

            {/* Skeleton: User Info */}
            <div className="text-center text-white space-y-3">
              <div className="h-8 bg-white/30 rounded w-3/4 mx-auto"></div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                <div className="h-5 bg-white/30 rounded w-48"></div>
              </div>
            </div>

            {/* Skeleton: Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
              <div className="h-12 w-32 bg-red-500/80 rounded-xl"></div>
              <div className="h-12 w-40 bg-white/20 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Skeleton: Footer Note */}
        <div className="bg-gray-50 px-6 md:px-10 py-4 md:py-6 text-center">
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  // ✅ Original content remains 100% unchanged below
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 md:px-10 py-8 md:py-12">
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border-4 border-white/30 shadow-lg">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
                }}
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
              title="Update profile picture"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="text-center text-white space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <h2 className="text-2xl md:text-3xl font-bold">{fullName}</h2>
            </div>
            
            <div className="flex items-center justify-center space-x-3 text-blue-100">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0"
                viewBox="0 0 24 24"
                aria-label="Google Account"
                title="Google Account"
              >
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <p className="font-medium text-base md:text-lg">{user.email}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              onClick={onLogout}
              className="flex items-center justify-center space-x-2 bg-red-500/80 hover:bg-red-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl transition-colors font-medium text-sm md:text-base"
              title="Logout"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              <span>Logout</span>
            </button>
            
            <button
              onClick={onSwitchAccount}
              disabled={isSigningIn}
              className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl transition-colors font-medium text-sm md:text-base disabled:opacity-50"
              title="Switch to another Google account"
            >
              {isSigningIn ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Switch Account</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-50 px-6 md:px-10 py-4 md:py-6 text-center">
        <p className="text-sm md:text-base text-gray-500">
          Your profile picture is stored locally. Google account details are read-only.
        </p>
      </div>
    </div>
  );
}