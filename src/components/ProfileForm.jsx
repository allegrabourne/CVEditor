// ProfileForm.jsx - Profile form component

import React from 'react';

export const ProfileForm = ({ profile, onUpdate, isDark }) => {
  const getTextareaClasses = () => {
    return `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none text-base ${
      isDark 
        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700' 
        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
    }`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Professional Profile</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Description</label>
        <textarea
          value={profile}
          onChange={(e) => onUpdate(e.target.value)}
          rows="8"
          className={getTextareaClasses()}
          placeholder="Write your professional profile here..."
        />
      </div>
    </div>
  );
};