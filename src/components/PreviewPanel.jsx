// PreviewPanel.jsx - Preview panel component

import React from 'react';
import { Eye } from 'lucide-react';

export const PreviewPanel = ({
  isDark,
  generatePreviewHTML
}) => {
  return (
    <div className={`rounded-2xl shadow-xl border overflow-hidden ${
      isDark 
        ? 'bg-gray-800/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Preview
        </h2>
      </div>
      <div className="max-h-screen overflow-y-auto">
      <div
  className={`cv-preview ${isDark ? 'dark-theme' : 'light-theme'} transition-colors duration-300`}
  style={{ width: '100%', maxWidth: '100%' }}
  dangerouslySetInnerHTML={{ __html: generatePreviewHTML() }}
/>
      </div>
    </div>
  );
};