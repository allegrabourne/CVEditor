// HeaderControls.jsx - Header controls component

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
    <div className="flex flex-wrap items-center gap-3">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`p-3 rounded-xl transition-colors ${
          isDark 
            ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
      
      {/* Template selector */}
      <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
        isDark ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <Palette className={`h-4 w-4 ${
          isDark ? 'text-purple-400' : 'text-purple-600'
        }`} />
        <select 
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className={`bg-transparent text-sm font-medium focus:outline-none cursor-pointer ${
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
      
      {/* Mode toggle */}
      <button
        onClick={() => setEditMode(!editMode)}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
          editMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
            : `bg-gradient-to-r ${
                isDark 
                  ? 'from-gray-600 to-gray-700 text-gray-200 hover:from-gray-500 hover:to-gray-600' 
                  : 'from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'
              }`
        }`}
      >
        {editMode ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
        {editMode ? 'Preview Mode' : 'Edit Mode'}
      </button>

      {/* Import button */}
      <label className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
        <Upload className="h-4 w-4" />
        Import
        <input
          type="file"
          accept=".pdf,.txt,.json"
          onChange={importFromFile}
          className="hidden"
        />
      </label>
      
      {/* Export button */}
      <button
        onClick={exportToPDF}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Download className="h-4 w-4" />
        Export PDF
      </button>
    </div>
  );
};