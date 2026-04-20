// components/hooks/useRecentActivities.js
import { useState, useEffect } from 'react';
import { getCertificates, getRecycledCertificates } from '../utils/storage';

// Helper functions (can be moved to utils if reused elsewhere)
const getUserNameFromCert = (cert) => {
  return cert.userName || cert.name || 'Anonymous';
};

const getInitials = (name) => {
  if (!name || name === 'Anonymous') return 'A';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 55%)`;
};

export const useRecentActivities = (refreshTrigger) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = () => {
      setLoading(true);
      setError(null);

      try {
        const activeCerts = getCertificates();
        const recycledCerts = getRecycledCertificates();

        const earnedActivities = activeCerts.map((cert, index) => {
          const userName = getUserNameFromCert(cert);
          return {
            id: `earned-${cert.id || index}`,
            type: 'certificate_earned',
            message: `Earned certificate for "${cert.courseTitle || cert.title || 'Unnamed Course'}"`,
            timestamp: new Date(cert.date || cert.issuedAt || Date.now()),
            user: {
              name: userName,
              initials: getInitials(userName),
              bgColor: stringToColor(userName),
              location: cert.userLocation || 'Unknown Location',
            },
            meta: {
              courseTitle: cert.courseTitle || cert.title || 'Unnamed Course',
              score: cert.score,
              total: cert.total || 10,
              percentage: cert.percentage || Math.round((cert.score / (cert.total || 10)) * 100),
              certificateNumber: cert.certificateNumber || 'N/A',
            },
          };
        });

        const deletedActivities = recycledCerts.map((cert, index) => {
          const userName = getUserNameFromCert(cert);
          return {
            id: `deleted-${cert.id || index}`,
            type: 'certificate_deleted',
            message: `Deleted certificate for "${cert.courseTitle || cert.title || 'Unnamed Course'}"`,
            timestamp: new Date(cert.deletedAt || Date.now()),
            user: {
              name: userName,
              initials: getInitials(userName),
              bgColor: stringToColor(userName),
              location: cert.userLocation || 'Unknown Location',
            },
            meta: {
              courseTitle: cert.courseTitle || cert.title || 'Unnamed Course',
              score: cert.score,
              total: cert.total || 10,
              percentage: cert.percentage || Math.round((cert.score / (cert.total || 10)) * 100),
              certificateNumber: cert.certificateNumber || 'N/A',
            },
          };
        });

        const allActivities = [...earnedActivities, ...deletedActivities].sort(
          (a, b) => b.timestamp - a.timestamp
        );

        setActivities(allActivities);
      } catch (err) {
        console.error('Error loading activities:', err);
        setError(err);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [refreshTrigger]);

  return { activities, loading, error };
};