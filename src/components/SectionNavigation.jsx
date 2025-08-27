// SectionNavigator.jsx - Section navigation with drag and drop and collapsible functionality

import React, { useState } from 'react';
import { Settings, GripVertical, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { SECTION_CONFIG } from '../utils/sectionManager';

export const SectionNavigator = ({
  isDark,
  sectionOrder,
  sectionManager,
  visibleSections,
  activeSection,
  setActiveSection,
  toggleSectionVisibility,
  dragDropHook,
  cvData
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const sections = sectionManager.getAllSectionConfigs().map(config => ({
    id: config.id,
    name: config.name,
    icon: config.icon
  }));

  const validateSectionData = (sectionId, data) => {
    switch (sectionId) {
      case 'personal': 
        return data.personalDetails && (data.personalDetails.name || data.personalDetails.email);
      case 'profile': 
        return typeof data.profile === 'string' && data.profile.trim().length > 0;
      case 'experience': 
        return Array.isArray(data.workExperience) && data.workExperience.length > 0;
      case 'projects': 
        return Array.isArray(data.personalProjects) && data.personalProjects.length > 0;
      case 'certificates': 
        return Array.isArray(data.certificates) && data.certificates.length > 0;
      case 'education': 
        return data.education && (data.education.degree || data.education.university);
      case 'courses': 
        return typeof data.courses === 'string' && data.courses.trim().length > 0;
      default: 
        return false;
    }
  };

  // Count sections with data for summary
  const sectionsWithData = sectionOrder.filter(sectionId => 
    validateSectionData(sectionId, cvData)
  ).length;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`rounded-2xl shadow-xl border transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    } ${isCollapsed ? 'p-4' : 'p-6'}`}>
      {/* Header with collapse button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold flex items-center gap-2 ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}>
          <Settings className="h-5 w-5" />
          Edit Sections
          {isCollapsed && (
            <span className={`text-sm font-normal ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              ({sectionsWithData}/{sectionOrder.length} sections)
            </span>
          )}
        </h2>
        
        <button
          onClick={toggleCollapse}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDark 
              ? 'hover:bg-gray-700 text-gray-300 hover:text-gray-100' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
          title={isCollapsed ? 'Expand sections panel' : 'Collapse sections panel'}
        >
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Collapsible content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[800px] opacity-100'
      }`}>
        <div className="space-y-2">
          {sectionOrder.map((sectionId, index) => {
            const section = sections.find(s => s.id === sectionId);
            if (!section) return null;
            
            const isVisible = visibleSections.includes(sectionId);
            const hasData = validateSectionData(sectionId, cvData);
            const isRequired = SECTION_CONFIG[sectionId]?.required;
            const isActive = activeSection === sectionId;
            
            return (
              <div
                key={sectionId}
                {...dragDropHook.getDropProps(index)}
                className={`
                  relative transition-all duration-300
                  ${dragDropHook.dragOverIndex === index 
                    ? `transform scale-105 ${
                        isDark ? 'bg-purple-900/20' : 'bg-purple-50'
                      }` 
                    : ''
                  }
                `}
              >
                <div 
                  {...dragDropHook.getDragProps(sectionId, index)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-move
                    ${isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : `${
                          isDark 
                            ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`
                    }
                    ${!isVisible ? 'opacity-60' : ''}
                    ${!hasData ? 'border-l-4 border-orange-400' : ''}
                    ${dragDropHook.draggedItem?.index === index ? 'opacity-50 scale-95' : ''}
                  `}
                  onClick={() => setActiveSection(sectionId)}
                >
                  <GripVertical className="h-4 w-4 text-current opacity-60" />
                  <span className="text-base">{section.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{section.name}</span>
                      {!hasData && !isActive && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600'
                        }`}>
                          Empty
                        </span>
                      )}
                      {isRequired && !isActive && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionVisibility(sectionId);
                    }}
                    disabled={isRequired}
                    className={`
                      p-1 rounded-lg transition-colors
                      ${isRequired 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-white/20'
                      }
                      ${isVisible 
                        ? 'text-green-400' 
                        : 'text-gray-400'
                      }
                    `}
                    title={
                      isRequired 
                        ? 'Required section cannot be hidden'
                        : isVisible 
                          ? 'Hide section' 
                          : 'Show section'
                    }
                  >
                    {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Drag overlay indicator */}
                {dragDropHook.dragOverIndex === index && (
                  <div className="absolute inset-0 rounded-xl border-2 border-dashed border-purple-500 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
        
        <div className={`mt-4 p-3 rounded-lg border ${
          isDark 
            ? 'bg-blue-900/20 border-blue-700 text-blue-300' 
            : 'bg-blue-50 border-blue-200 text-blue-700'
        }`}>
          <p className="text-sm">
            Drag sections to reorder • Orange border = empty section • Eye icon = show/hide
          </p>
        </div>
      </div>

      {/* Collapsed state quick info */}
      {isCollapsed && (
        <div className={`mt-2 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-base">{sections.find(s => s.id === activeSection)?.icon}</span>
            <span>Currently editing: {sections.find(s => s.id === activeSection)?.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};