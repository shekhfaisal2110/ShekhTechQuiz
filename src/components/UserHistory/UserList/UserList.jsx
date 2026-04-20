// src/components/UserHistory/UserList/UserList.jsx
import React from 'react';
import UserCard from './UserCard';

export default function UserList({ users, onOpenUserDetails }) {
  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50">
        <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="w-8 sm:w-10 h-8 sm:h-10 text-gray-400" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Users Found</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto px-4">
          Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard
          key={user.userId}
          user={user}
          onOpenDetails={() => onOpenUserDetails(user)}
        />
      ))}
    </div>
  );
}