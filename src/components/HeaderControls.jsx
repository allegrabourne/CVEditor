// HeaderControls.jsx - Responsive header controls component

import React from 'react';
import { Download, Edit3, Eye, Palette, Sun, Moon, Upload } from 'lucide-react';

export const HeaderControls = ({
  isDark,
  toggleTheme,
  selectedTemplate,
  setSelectedTemplate,
  availableTemplates,
  editMode,
  setEditMode,
  importFromFile,
  exportToPDF
}) => {
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      {/* Theme toggle - Always visible */}
      <button
        onClick={toggleTheme}
        className={`p-2.5 lg:p-3 rounded-lg lg:rounded-xl transition-colors ${
          isDark 
            ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {isDark ? <Sun className="h-4 w-4 lg:h-5 lg:w-5" /> : <Moon className="h-4 w-4 lg:h-5 lg:w-5" />}
      </button>
      
      {/* Template selector - Always visible */}
      <div className={`flex items-center gap-2 rounded-lg lg:rounded-xl px-2.5 lg:px-3 py-2 ${
        isDark ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <Palette className={`h-4 w-4 ${
          isDark ? 'text-purple-400' : 'text-purple-600'
        }`} />
        <select 
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className={`bg-transparent text-xs lg:text-sm font-medium focus:outline-none cursor-pointer min-w-0 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          {availableTemplates.map(template => (
            <option key={template.value} value={template.value}>
              {template.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Mode toggle - Responsive design */}
      <button
        onClick={() => setEditMode(!editMode)}
        className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-6 py-2.5 lg:py-3 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
          editMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
            : `bg-gradient-to-r ${
                isDark 
                  ? 'from-gray-600 to-gray-700 text-gray-200 hover:from-gray-500 hover:to-gray-600' 
                  : 'from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'
              }`
        }`}
      >
        {editMode ? <Eye className="h-3.5 w-3.5 lg:h-4 lg:w-4" /> : <Edit3 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />}
        {/* Show text on desktop, hide on mobile */}
        <span className="hidden lg:inline">
          {editMode ? 'Preview Mode' : 'Edit Mode'}
        </span>
      </button>

      {/* Import button - Icon only on mobile, full button on desktop */}
      <label className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer ${
        'min-w-0'
      }`}>
        <Upload className="h-3.5 w-3.5 lg:h-4 lg:w-4 flex-shrink-0" />
        {/* Show text only on desktop */}
        <span className="hidden lg:inline">Import</span>
        <input
          type="file"
          accept=".pdf,.txt,.json"
          onChange={importFromFile}
          className="hidden"
        />
      </label>
      
      {/* Export button - Icon only on mobile, full button on desktop */}
      <button
        onClick={exportToPDF}
        className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl ${
          'min-w-0'
        }`}
      >
        <Download className="h-3.5 w-3.5 lg:h-4 lg:w-4 flex-shrink-0" />
        {/* Show text only on desktop */}
        <span className="hidden lg:inline">Export PDF</span>
      </button>
    </div>
  );
};