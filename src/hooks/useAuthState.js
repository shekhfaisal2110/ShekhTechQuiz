// hooks/useAuthState.js
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

const DEFAULT_PROFILE_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export function useAuthState() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const savedImage = localStorage.getItem('shekhtech_profile_image');
        if (savedImage) {
          setProfileImage(savedImage);
        } else if (firebaseUser.photoURL) {
          setProfileImage(firebaseUser.photoURL);
        } else {
          setProfileImage(DEFAULT_PROFILE_IMAGE);
        }
      } else {
        setProfileImage(DEFAULT_PROFILE_IMAGE);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, profileImage, authLoading };
}