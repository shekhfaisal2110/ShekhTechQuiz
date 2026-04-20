// src/components/activity/EmptyActivityState.jsx
import React from 'react';
import { FaHistory } from 'react-icons/fa';

const EmptyActivityState = ({ selectedUser, filter }) => {
  return (
    <div className="bg-white rounded-xl shadow p-8 sm:p-10 text-center border border-gray-100">
      <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FaHistory className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        {selectedUser ? (
          <>
            No {filter === 'all' ? '' : `${filter} `}Activity for{' '}
            <span className="text-indigo-600">{selectedUser}</span>
          </>
        ) : (
          `No ${filter !== 'all' ? filter : ''} Activity Yet`
        )}
      </h3>
      <p className="text-gray-500 px-4 max-w-md mx-auto mt-2">
        {selectedUser ? (
          filter === 'all' ? (
            `${selectedUser} has no certificate activity yet.`
          ) : filter === 'earned' ? (
            `${selectedUser} hasn't earned any certificates.`
          ) : (
            `${selectedUser} hasn't deleted any certificates.`
          )
        ) : filter === 'earned' ? (
          'Earn a certificate by completing a quiz.'
        ) : filter === 'deleted' ? (
          'Delete a certificate to see it here.'
        ) : (
          'Complete quizzes or delete certificates to see activity.'
        )}
      </p>
    </div>
  );
};

export default EmptyActivityState;