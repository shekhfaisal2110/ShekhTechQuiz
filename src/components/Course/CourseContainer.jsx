// components/Course/CourseContainer.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../../data/courses';
import CourseHeader from './CourseHeader';
import QuestionCountBadge from './QuestionCountBadge';
import CourseActions from './CourseActions';
import CourseNotFound from './CourseNotFound';

export default function CourseContainer() {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <CourseNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-6">
      <div className="flex items-center justify-center pt-8 pb-12">
        <div className="bg-white shadow-xl rounded-xl sm:rounded-lg p-6 sm:p-8 w-full max-w-lg sm:max-w-2xl mx-4">
          <CourseHeader title={course.title} description={course.description} />
          <QuestionCountBadge questionCount={course.questions.length} />
          <CourseActions courseId={courseId} />
        </div>
      </div>
    </div>
  );
}