// PersonalDetailsForm.jsx - Personal details form component

import React from 'react';

export const PersonalDetailsForm = ({ personalDetails, onUpdate, isDark }) => {
  const getInputClasses = () => {
    return `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base ${
      isDark 
        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700' 
        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
    }`;
  };
  
  const getTextareaClasses = () => {
    return `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none text-base ${
      isDark 
        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700' 
        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
    }`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Personal Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={personalDetails.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className={getInputClasses()}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
          <input
            type="text"
            value={personalDetails.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            className={getInputClasses()}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
          <textarea
            value={personalDetails.address}
            onChange={(e) => onUpdate('address', e.target.value)}
            rows="3"
            className={getTextareaClasses()}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={personalDetails.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            className={getInputClasses()}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
          <input
            type="text"
            value={personalDetails.website}
            onChange={(e) => onUpdate('website', e.target.value)}
            className={getInputClasses()}
          />
        </div>
      </div>
    </div>
  );
};