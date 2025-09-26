// Footer.jsx - Copyright footer component

import React from 'react';

export const Footer = ({ isDark }) => {
  return ( 
    <footer className={`w-full py-1 px-6 border-t transition-colors duration-300 sticky bottom-0 z-50 backdrop-blur-xl shadow-xl ${
        isDark 
          ? 'bg-gray-800/95 border-gray-700 text-gray-400' 
          : 'bg-white/95 border-gray-200 text-gray-600'
      }`}>
      <div className="max-w-none">
        <p className="text-center text-sm">
          © Allegra Bourne 2025, all rights reserved
        </p>
      </div>
    </footer>
  );
};