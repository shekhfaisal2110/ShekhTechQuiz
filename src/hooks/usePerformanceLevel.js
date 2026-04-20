// // hooks/usePerformanceLevel.js
// import { useMemo } from 'react';
// import { Crown, Medal, Award, CheckCircle } from 'lucide-react';

// export const usePerformanceLevel = (percentage) => {
//   return useMemo(() => {
//     if (percentage >= 90) return {
//       level: 'Exceptional',
//       icon: Crown,
//       color: 'from-yellow-400 to-orange-500',
//       bgColor: 'from-yellow-50 to-orange-50',
//       textColor: 'text-yellow-700',
//       borderColor: 'border-yellow-200'
//     };
//     if (percentage >= 80) return {
//       level: 'Excellent',
//       icon: Medal,
//       color: 'from-purple-500 to-indigo-600',
//       bgColor: 'from-purple-50 to-indigo-50',
//       textColor: 'text-purple-700',
//       borderColor: 'border-purple-200'
//     };
//     if (percentage >= 70) return {
//       level: 'Good',
//       icon: Award,
//       color: 'from-emerald-500 to-green-600',
//       bgColor: 'from-emerald-50 to-green-50',
//       textColor: 'text-emerald-700',
//       borderColor: 'border-emerald-200'
//     };
//     return {
//       level: 'Passed',
//       icon: CheckCircle,
//       color: 'from-blue-500 to-blue-600',
//       bgColor: 'from-blue-50 to-blue-50',
//       textColor: 'text-blue-700',
//       borderColor: 'border-blue-200'
//     };
//   }, [percentage]);
// };





// hooks/usePerformanceLevel.js
import { Crown, Medal, Award, CheckCircle } from 'lucide-react';

// ✅ Plain function — NOT a hook
export const getPerformanceLevel = (percentage) => {
  if (percentage >= 90) return {
    level: 'Exceptional',
    icon: Crown,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200'
  };
  if (percentage >= 80) return {
    level: 'Excellent',
    icon: Medal,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  };
  if (percentage >= 70) return {
    level: 'Good',
    icon: Award,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'from-emerald-50 to-green-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200'
  };
  return {
    level: 'Passed',
    icon: CheckCircle,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  };
};

// Optional: Keep the hook version if needed elsewhere (but you likely don't need it)
// export const usePerformanceLevel = (percentage) => {
//   return useMemo(() => getPerformanceLevel(percentage), [percentage]);
// };