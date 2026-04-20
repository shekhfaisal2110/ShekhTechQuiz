// // // pages/RecentlyActivity/index.jsx
// // import React from 'react';
// // import RecentlyActivityContainer from '../components/RecentlyActivity/RecentlyActivityContainer';

// // const RecentlyActivityPage = () => {
// //   return <RecentlyActivityContainer />;
// // };

// // export default RecentlyActivityPage;





// // src/pages/RecentlyActivity.jsx
// import React, { useEffect, useState, useMemo } from 'react';
// import { useCertificateContext } from '../App';
// import {
//   getCertificates,
//   getRecycledCertificates,
// } from '../utils/storage';
// import {
//   FaAward,
//   FaTrash,
//   FaHistory,
//   FaClock,
//   FaUser,
//   FaTimes,
// } from 'react-icons/fa';
// import ProfessionalLoading from '../components/ProfessionalLoading';

// const RecentlyActivity = () => {
//   const { isLoading: contextLoading, refreshCounts } = useCertificateContext();
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // 'all', 'earned', 'deleted'
//   const [selectedUser, setSelectedUser] = useState(null); // e.g., "Saif"

//   // Helper: Get user-friendly name from certificate
//   const getUserNameFromCert = (cert) => {
//     return cert.userName || cert.name || 'Anonymous';
//   };

//   // Helper: Get initials for avatar
//   const getInitials = (name) => {
//     if (!name || name === 'Anonymous') return 'A';
//     return name
//       .split(' ')
//       .map((n) => n[0])
//       .join('')
//       .substring(0, 2)
//       .toUpperCase();
//   };

//   // Helper: Generate consistent color based on string
//   const stringToColor = (str) => {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const h = hash % 360;
//     return `hsl(${h}, 70%, 55%)`;
//   };

//   // Icons for activity types
//   const getIcon = (type) => {
//     switch (type) {
//       case 'certificate_earned':
//         return <FaAward className="text-yellow-600" />;
//       case 'certificate_deleted':
//         return <FaTrash className="text-red-600" />;
//       default:
//         return <FaHistory className="text-gray-500" />;
//     }
//   };

//   // Get badge color and label for activity type
//   const getActivityBadge = (type) => {
//     switch (type) {
//       case 'certificate_earned':
//         return { label: 'Earned', color: 'bg-yellow-100 text-yellow-800' };
//       case 'certificate_deleted':
//         return { label: 'Deleted', color: 'bg-red-100 text-red-800' };
//       default:
//         return { label: 'Activity', color: 'bg-gray-100 text-gray-800' };
//     }
//   };

//   // Load real activities from localStorage
//   const loadActivities = () => {
//     setLoading(true);

//     try {
//       const activeCerts = getCertificates();
//       const recycledCerts = getRecycledCertificates();

//       const earnedActivities = activeCerts.map((cert, index) => {
//         const userName = getUserNameFromCert(cert);
//         const initials = getInitials(userName);
//         const bgColor = stringToColor(userName);

//         return {
//           id: `earned-${cert.id || index}`,
//           type: 'certificate_earned',
//           message: `Earned certificate for "${cert.courseTitle || cert.title || 'Unnamed Course'}"`,
//           timestamp: new Date(cert.date || cert.issuedAt || Date.now()),
//           user: {
//             name: userName,
//             initials,
//             bgColor,
//             location: cert.userLocation || 'Unknown Location',
//           },
//           meta: {
//             courseTitle: cert.courseTitle || cert.title || 'Unnamed Course',
//             score: cert.score,
//             total: cert.total || 10,
//             percentage: cert.percentage || Math.round((cert.score / (cert.total || 10)) * 100),
//             certificateNumber: cert.certificateNumber || 'N/A',
//           },
//         };
//       });

//       const deletedActivities = recycledCerts.map((cert, index) => {
//         const userName = getUserNameFromCert(cert);
//         const initials = getInitials(userName);
//         const bgColor = stringToColor(userName);

//         return {
//           id: `deleted-${cert.id || index}`,
//           type: 'certificate_deleted',
//           message: `Deleted certificate for "${cert.courseTitle || cert.title || 'Unnamed Course'}"`,
//           timestamp: new Date(cert.deletedAt || Date.now()),
//           user: {
//             name: userName,
//             initials,
//             bgColor,
//             location: cert.userLocation || 'Unknown Location',
//           },
//           meta: {
//             courseTitle: cert.courseTitle || cert.title || 'Unnamed Course',
//             score: cert.score,
//             total: cert.total || 10,
//             percentage: cert.percentage || Math.round((cert.score / (cert.total || 10)) * 100),
//             certificateNumber: cert.certificateNumber || 'N/A',
//           },
//         };
//       });

//       const allActivities = [...earnedActivities, ...deletedActivities].sort(
//         (a, b) => b.timestamp - a.timestamp
//       );

//       setActivities(allActivities);
//     } catch (error) {
//       console.error('Error loading activities:', error);
//       setActivities([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadActivities();
//   }, [refreshCounts]);

//   // Format timestamp: "2 hours ago"
//   const formatTimeAgo = (date) => {
//     const now = new Date();
//     const diffMs = now - date;
//     const diffSec = Math.floor(diffMs / 1000);
//     const diffMin = Math.floor(diffSec / 60);
//     const diffHrs = Math.floor(diffMin / 60);
//     const diffDays = Math.floor(diffHrs / 24);

//     if (diffSec < 60) return `${diffSec}s ago`;
//     if (diffMin < 60) return `${diffMin}m ago`;
//     if (diffHrs < 24) return `${diffHrs}h ago`;
//     if (diffDays < 7) return `${diffDays}d ago`;
//     return date.toLocaleDateString();
//   };

//   // Apply filters: type + user
//   const filteredActivities = useMemo(() => {
//     let result = [...activities];

//     // Filter by type
//     if (filter === 'earned') {
//       result = result.filter((a) => a.type === 'certificate_earned');
//     } else if (filter === 'deleted') {
//       result = result.filter((a) => a.type === 'certificate_deleted');
//     }

//     // Filter by user
//     if (selectedUser) {
//       result = result.filter((a) => a.user.name === selectedUser);
//     }

//     return result;
//   }, [activities, filter, selectedUser]);

//   // Loading state
//   if (contextLoading || loading) {
//     return <ProfessionalLoading />;
//   }

//   // Stats for selected user or global
//   const earnedCount = activities.filter((a) => a.type === 'certificate_earned').length;
//   const deletedCount = activities.filter((a) => a.type === 'certificate_deleted').length;
//   const totalCount = activities.length;

//   const userEarnedCount = selectedUser
//     ? activities.filter((a) => a.type === 'certificate_earned' && a.user.name === selectedUser).length
//     : earnedCount;
//   const userDeletedCount = selectedUser
//     ? activities.filter((a) => a.type === 'certificate_deleted' && a.user.name === selectedUser).length
//     : deletedCount;
//   const userTotalCount = selectedUser
//     ? activities.filter((a) => a.user.name === selectedUser).length
//     : totalCount;

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center">
//             <FaHistory className="mr-3 text-indigo-600" />
//             Recent Activity
//           </h1>
//           <p className="mt-2 text-gray-600">
//             Track your latest achievements and deletions.
//           </p>
//         </div>

//         {/* User Filter Chip */}
//         {selectedUser && (
//           <div className="mb-4 flex items-center">
//             <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
//               <FaUser className="mr-2" />
//               Viewing: <span className="font-semibold ml-1">{selectedUser}</span>
//             </span>
//             <button
//               onClick={() => setSelectedUser(null)}
//               className="ml-3 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full"
//               title="Clear user filter"
//               aria-label="Clear user filter"
//             >
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//         )}

//        {/* Filter Tabs — Always Visible */}
// <div className="mb-6 overflow-x-auto pb-2">
//   <div className="flex space-x-2 min-w-max sm:justify-start">
//     {[
//       {
//         key: 'all',
//         label: 'All Activities',
//         icon: FaHistory,
//         count: activities.length,
//       },
//       {
//         key: 'earned',
//         label: 'Certificates Earned',
//         icon: FaAward,
//         count: activities.filter(a => a.type === 'certificate_earned').length,
//       },
//       {
//         key: 'deleted',
//         label: 'Certificates Deleted',
//         icon: FaTrash,
//         count: activities.filter(a => a.type === 'certificate_deleted').length,
//       },
//     ].map((tab) => (
//       <button
//         key={tab.key}
//         onClick={() => setFilter(tab.key)}
//         className={`flex items-center space-x-2 whitespace-nowrap px-4 py-2.5 rounded-lg font-medium transition-all ${
//           filter === tab.key
//             ? 'bg-indigo-600 text-white shadow-md'
//             : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
//         }`}
//       >
//         <tab.icon className="w-4 h-4 flex-shrink-0" />
//         <span className="hidden sm:inline">{tab.label}</span>
//         <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
//         {/* Count Badge */}
//         <span
//           className={`flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full ${
//             filter === tab.key
//               ? 'bg-white text-indigo-600'
//               : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           {tab.count}
//         </span>
//       </button>
//     ))}
//   </div>
// </div>

//         {/* Activity Feed */}
//         <div className="space-y-5">
//           {filteredActivities.length === 0 ? (
//             <div className="bg-white rounded-xl shadow p-8 sm:p-10 text-center border border-gray-100">
//               <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                 <FaHistory className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
//                 {selectedUser ? (
//                   <>
//                     No {filter === 'all' ? '' : `${filter} `}Activity for{' '}
//                     <span className="text-indigo-600">{selectedUser}</span>
//                   </>
//                 ) : (
//                   `No ${filter !== 'all' ? filter : ''} Activity Yet`
//                 )}
//               </h3>
//               <p className="text-gray-500 px-4 max-w-md mx-auto mt-2">
//                 {selectedUser ? (
//                   filter === 'all' ? (
//                     `${selectedUser} has no certificate activity yet.`
//                   ) : filter === 'earned' ? (
//                     `${selectedUser} hasn't earned any certificates.`
//                   ) : (
//                     `${selectedUser} hasn't deleted any certificates.`
//                   )
//                 ) : filter === 'earned' ? (
//                   'Earn a certificate by completing a quiz.'
//                 ) : filter === 'deleted' ? (
//                   'Delete a certificate to see it here.'
//                 ) : (
//                   'Complete quizzes or delete certificates to see activity.'
//                 )}
//               </p>
//             </div>
//           ) : (
//             filteredActivities.map((activity) => {
//               const badge = getActivityBadge(activity.type);
//               const fullDate = activity.timestamp.toLocaleString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit',
//               });

//               return (
//                 <div
//                   key={activity.id}
//                   className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
//                 >
//                   <div className="p-4 sm:p-6">
//                     <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
//                       {/* Clickable Avatar */}
//                       <div
//                         className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0 shadow-sm mb-3 sm:mb-0 cursor-pointer hover:opacity-90 transition-opacity"
//                         style={{ backgroundColor: activity.user.bgColor }}
//                         title={`View all activity by ${activity.user.name}`}
//                         onClick={() => setSelectedUser(activity.user.name)}
//                       >
//                         {activity.user.initials}
//                       </div>

//                       {/* Main Content */}
//                       <div className="flex-1 min-w-0">
//                         {/* Header Row */}
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
//                           <div className="flex items-center flex-wrap gap-2">
//                             {/* Clickable User Name */}
//                             <h4
//                               className="text-sm sm:text-base font-bold text-gray-900 cursor-pointer hover:text-indigo-600"
//                               onClick={() => setSelectedUser(activity.user.name)}
//                             >
//                               {activity.user.name}
//                             </h4>
//                             {/* Category Badge — ALWAYS VISIBLE */}
//                             <span
//                               className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
//                                 badge.color
//                               }`}
//                             >
//                               {badge.label}
//                             </span>
//                           </div>
//                           <div className="flex items-center text-xs text-gray-500 mt-2 sm:mt-0">
//                             <FaClock className="mr-1 text-gray-400 flex-shrink-0" />
//                             <span className="truncate">{formatTimeAgo(activity.timestamp)}</span>
//                             <span className="ml-1 hidden sm:inline text-gray-400">|</span>
//                             <span className="ml-1 hidden sm:inline text-gray-500">
//                               {fullDate}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Message */}
//                         <p className="text-sm sm:text-base text-gray-700 mb-3 flex items-start space-x-2">
//                           <span className="mt-0.5 opacity-80 flex-shrink-0">
//                             {getIcon(activity.type)}
//                           </span>
//                           <span className="flex-1">{activity.message}</span>
//                         </p>

//                         {/* Certificate Details */}
//                         <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
//                             <div>
//                               <span className="font-medium text-gray-600">Course:</span>{' '}
//                               <span className="text-gray-900 break-words">
//                                 {activity.meta.courseTitle}
//                               </span>
//                             </div>
//                             <div>
//                               <span className="font-medium text-gray-600">Certificate ID:</span>{' '}
//                               <span className="font-mono text-gray-900 break-all">
//                                 {activity.meta.certificateNumber}
//                               </span>
//                             </div>
//                             {activity.meta.score !== undefined && (
//                               <>
//                                 <div>
//                                   <span className="font-medium text-gray-600">Score:</span>{' '}
//                                   <span className="font-bold text-indigo-600">
//                                     {activity.meta.score}/{activity.meta.total}
//                                   </span>
//                                 </div>
//                                 <div>
//                                   <span className="font-medium text-gray-600">Percentage:</span>{' '}
//                                   <span
//                                     className={`font-bold ${
//                                       activity.meta.percentage >= 90
//                                         ? 'text-green-600'
//                                         : activity.meta.percentage >= 70
//                                         ? 'text-yellow-600'
//                                         : 'text-red-600'
//                                     }`}
//                                   >
//                                     {activity.meta.percentage}%
//                                   </span>
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Stats Summary — Updated for user context */}
//         <div className="mt-8 hidden sm:block">
//           <div className="bg-white rounded-xl shadow p-5 sm:p-6 border border-gray-100">
//             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
//               <FaHistory className="mr-2 text-indigo-600" />
//               {selectedUser ? `${selectedUser}'s Activity` : 'Activity Summary'}
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               <div className="text-center p-3 bg-yellow-50 rounded-lg">
//                 <div className="text-xl sm:text-2xl font-bold text-yellow-700">
//                   {userEarnedCount}
//                 </div>
//                 <div className="text-xs sm:text-sm font-medium text-yellow-800 mt-1">
//                   Certificates Earned
//                 </div>
//               </div>
//               <div className="text-center p-3 bg-red-50 rounded-lg">
//                 <div className="text-xl sm:text-2xl font-bold text-red-700">
//                   {userDeletedCount}
//                 </div>
//                 <div className="text-xs sm:text-sm font-medium text-red-800 mt-1">
//                   Certificates Deleted
//                 </div>
//               </div>
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <div className="text-xl sm:text-2xl font-bold text-gray-700">
//                   {userTotalCount}
//                 </div>
//                 <div className="text-xs sm:text-sm font-medium text-gray-800 mt-1">
//                   Total Activities
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentlyActivity;


// src/pages/RecentlyActivity.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useCertificateContext } from '../App';
import {
  getCertificates,
  getRecycledCertificates,
} from '../utils/storage';
import ProfessionalLoading from '../components/ProfessionalLoading';
import RecentlyActivityContainer from '../components/RecentlyActivity/RecentlyActivityContainer';

const RecentlyActivity = () => {
  const { isLoading: contextLoading, refreshCounts } = useCertificateContext();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  // Helper: Get user-friendly name
  const getUserNameFromCert = (cert) => cert.userName || cert.name || 'Anonymous';

  // Helper: Get initials
  const getInitials = (name) => {
    if (!name || name === 'Anonymous') return 'A';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Helper: Generate color
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 55%)`;
  };

  const loadActivities = () => {
    setLoading(true);
    try {
      const activeCerts = getCertificates();
      const recycledCerts = getRecycledCertificates();

      const earned = activeCerts.map((cert, i) => {
        const user = getUserNameFromCert(cert);
        return {
          id: `earned-${cert.id || i}`,
          type: 'certificate_earned',
          message: `Earned certificate for "${cert.courseTitle || cert.title || 'Unnamed Course'}"`,
          timestamp: new Date(cert.date || cert.issuedAt || Date.now()),
          user: {
            name: user,
            initials: getInitials(user),
            bgColor: stringToColor(user),
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

      const deleted = recycledCerts.map((cert, i) => {
        const user = getUserNameFromCert(cert);
        return {
          id: `deleted-${cert.id || i}`,
          type: 'certificate_deleted',
          message: `Deleted certificate for "${cert.courseTitle || cert.title || 'Unnamed Course'}"`,
          timestamp: new Date(cert.deletedAt || Date.now()),
          user: {
            name: user,
            initials: getInitials(user),
            bgColor: stringToColor(user),
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

      const all = [...earned, ...deleted].sort((a, b) => b.timestamp - a.timestamp);
      setActivities(all);
    } catch (error) {
      console.error('Error loading activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [refreshCounts]);

  const filteredActivities = useMemo(() => {
    let result = [...activities];
    if (filter === 'earned') result = result.filter(a => a.type === 'certificate_earned');
    if (filter === 'deleted') result = result.filter(a => a.type === 'certificate_deleted');
    if (selectedUser) result = result.filter(a => a.user.name === selectedUser);
    return result;
  }, [activities, filter, selectedUser]);

  if (contextLoading || loading) {
    return <ProfessionalLoading />;
  }

  return (
    <RecentlyActivityContainer
      activities={activities}
      filteredActivities={filteredActivities}
      filter={filter}
      setFilter={setFilter}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
    />
  );
};

export default RecentlyActivity;