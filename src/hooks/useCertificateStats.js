// components/hooks/useCertificateStats.js

import { useMemo } from 'react';

export const useCertificateStats = (attempts) => {
  return useMemo(() => {
    if (attempts.length === 0) return {
      totalAttempts: 0,
      totalCourses: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      bestScore: 0,
      passedAttempts: 0
    };

    const courseSet = new Set(attempts.map(a => a.courseTitle));
    const totalScore = attempts.reduce((sum, a) => sum + a.percentage, 0);
    const totalTimeSpent = attempts.reduce((sum, a) => sum + (a.timeSpent || 0), 0);
    const bestScore = Math.max(...attempts.map(a => a.percentage));
    const passedAttempts = attempts.filter(a => a.percentage >= 70).length;

    return {
      totalAttempts: attempts.length,
      totalCourses: courseSet.size,
      averageScore: Math.round(totalScore / attempts.length),
      totalTimeSpent,
      bestScore,
      passedAttempts
    };
  }, [attempts]);
};