// components/UserProfile/UserProfileContainer.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  User, Camera, Mail, LogOut, Bell, History, Award, BarChart3
} from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import SignInScreen from './SignInScreen';
import WelcomeBanner from './WelcomeBanner';
import ProfileHeader from './ProfileHeader';
import NavigationGrid from './NavigationGrid';
import Toast from '../Toast';

export default function UserProfileContainer() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Add Toast
  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          const savedProfile = localStorage.getItem('shekhtech_user_profile');
          const savedImage = localStorage.getItem('shekhtech_profile_image');
          const hasShownWelcome = localStorage.getItem('shekhtech_welcome_shown');

          let profileData = {
            firstName: '',
            lastName: '',
            email: firebaseUser.email || '',
          };

          if (firebaseUser.displayName) {
            const nameParts = firebaseUser.displayName.trim().split(' ');
            profileData.firstName = nameParts[0] || '';
            profileData.lastName = nameParts.slice(1).join(' ') || '';
          }

          if (savedProfile) {
            const storedData = JSON.parse(savedProfile);
            profileData = { ...profileData, ...storedData };
          }

          setFormData(profileData);

          if (savedImage) {
            setProfileImage(savedImage);
          } else if (firebaseUser.photoURL) {
            setProfileImage(firebaseUser.photoURL);
          } else {
            setProfileImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
          }

          if (!hasShownWelcome) {
            setShowWelcomeMessage(true);
            localStorage.setItem('shekhtech_welcome_shown', 'true');
            addToast(`Welcome, ${firebaseUser.displayName || 'User'}!`, 'success', 4000);
            setTimeout(() => setShowWelcomeMessage(false), 5000);
          }
        } catch (error) {
          console.error('Error loading profile: ', error);
          if (firebaseUser.displayName) {
            const nameParts = firebaseUser.displayName.trim().split(' ');
            setFormData({
              firstName: nameParts[0] || '',
              lastName: nameParts.slice(1).join(' ') || '',
              email: firebaseUser.email || '',
            });
          }
          setProfileImage(firebaseUser.photoURL || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
        }
      } else {
        setUser(null);
        setFormData({ firstName: '', lastName: '', email: '' });
        setProfileImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
      }
      setAuthLoading(false);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle image upload — persists across sessions
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('Image size should be less than 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setProfileImage(imageData);
        if (user) {
          localStorage.setItem('shekhtech_profile_image', imageData);
          addToast('Profile picture updated successfully!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async (forceNew = false) => {
    if (forceNew) {
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
    }
    setIsSigningIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      let newFormData = {
        firstName: '',
        lastName: '',
        email: firebaseUser.email || '',
      };

      if (firebaseUser.displayName) {
        const nameParts = firebaseUser.displayName.trim().split(' ');
        newFormData.firstName = nameParts[0] || '';
        newFormData.lastName = nameParts.slice(1).join(' ') || '';
      }

      setFormData(newFormData);

      const savedImage = localStorage.getItem('shekhtech_profile_image');
      const img = savedImage || firebaseUser.photoURL || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      setProfileImage(img);

      const { firstName, lastName } = newFormData;
      localStorage.setItem('shekhtech_user_profile', JSON.stringify({ firstName, lastName, _version: '1.0' }));
      if (!savedImage && firebaseUser.photoURL) {
        localStorage.setItem('shekhtech_profile_image', firebaseUser.photoURL);
      }

      addToast(forceNew ? 'Switched account successfully!' : 'Signed in successfully!', 'success', 3000);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      addToast('Sign-in failed. Please try again.', 'error', 4000);
    } finally {
      setIsSigningIn(false);
      googleProvider.setCustomParameters({});
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      try {
        await signOut(auth);
        localStorage.removeItem('shekhtech_user_profile');
        localStorage.removeItem('shekhtech_profile_image');
        localStorage.removeItem('shekhtech_welcome_shown');
        addToast('You have been logged out successfully.', 'info', 4000);
      } catch (error) {
        console.error('Logout Error:', error);
        addToast('Logout failed. Please try again.', 'error');
      }
    }
  };

  // Navigation handlers
  const navigateToHistory = (type) => {
    if (type === 'user') {
      navigate('/user-history');
    } else if (type === 'certificate') {
      navigate('/certificate-history');
    }
  };

  const navigateToAnalytics = () => {
    navigate('/user-analytics');
  };

  const handleNavigateToRecentlyActivity = () => {
    navigate('/recently-activity');
  };

  // Render
  if (isLoading || authLoading) return <LoadingScreen />;
  if (!user) return <SignInScreen onSignIn={handleGoogleSignIn} isSigningIn={isSigningIn} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {showWelcomeMessage && (
          <WelcomeBanner
            firstName={formData.firstName}
            displayName={user.displayName}
            onClose={() => setShowWelcomeMessage(false)}
          />
        )}

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Your Profile</h1>
          <p className="text-gray-600 text-lg">Here's your account overview</p>
        </div>

        <ProfileHeader
          user={user}
          formData={formData}
          profileImage={profileImage}
          fileInputRef={fileInputRef}
          onImageUpload={handleImageUpload}
          onLogout={handleLogout}
          onSwitchAccount={() => handleGoogleSignIn(true)}
          isSigningIn={isSigningIn}
        />

        {/* ✅ FIXED: Pass onNavigateToRecentlyActivity prop */}
        <NavigationGrid
          onNavigateToHistory={navigateToHistory}
          onNavigateToAnalytics={navigateToAnalytics}
          onNavigateToRecentlyActivity={handleNavigateToRecentlyActivity}
        />
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </div>
    </div>
  );
}