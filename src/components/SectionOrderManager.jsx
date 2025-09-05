// components/SectionOrderManager.jsx - Drag and drop section reordering

import React from 'react';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { useDragDrop } from '../hooks/useDragDrop';
import { SECTION_CONFIG } from '../utils/sectionManager';

const SectionOrderManager = ({ 
  sectionOrder, 
  onReorderSections, 
  cvData, 
  visibleSections,
  onToggleSection 
}) => {
  const { getDragProps, getDropProps, dragOverIndex } = useDragDrop(
    sectionOrder, 
    onReorderSections
  );

  const getSectionDisplayName = (sectionId) => {
    return SECTION_CONFIG[sectionId]?.name || sectionId;
  };

  const getSectionIcon = (sectionId) => {
    return SECTION_CONFIG[sectionId]?.icon || '📄';
  };

  const hasContent = (sectionId) => {
    switch (sectionId) {
      case 'personal':
        return cvData.personalDetails.name || cvData.personalDetails.email;
      case 'profile':
        return cvData.profile && cvData.profile.trim();
      case 'experience':
        return cvData.workExperience.length > 0;
      case 'projects':
        return cvData.personalProjects.length > 0;
      case 'certificates':
        return cvData.certificates.length > 0;
      case 'education':
        return cvData.education.length > 0;
      case 'courses':
        return cvData.courses && cvData.courses.trim();
      default:
        return false;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Section Order & Visibility
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Drag sections to reorder them on your CV. Toggle visibility with the eye icon.
      </p>
      
      <div className="space-y-2">
        {sectionOrder.map((sectionId, index) => {
          const isVisible = visibleSections.includes(sectionId);
          const hasData = hasContent(sectionId);
          const isRequired = SECTION_CONFIG[sectionId]?.required;
          
          return (
            <div
              key={sectionId}
              {...getDropProps(index)}
              className={`
                relative p-3 rounded-xl border transition-all duration-200
                ${dragOverIndex === index 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                }
                ${!hasData ? 'opacity-60' : ''}
              `}
            >
              <div 
                {...getDragProps(sectionId, index)}
                className="flex items-center justify-between cursor-move hover:bg-white dark:hover:bg-gray-600 rounded-lg p-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <span className="text-xl">{getSectionIcon(sectionId)}</span>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {getSectionDisplayName(sectionId)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {hasData ? 'Has content' : 'Empty'} 
                      {isRequired && ' • Required'}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => onToggleSection(sectionId)}
                  disabled={isRequired}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${isRequired 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                    ${isVisible 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-400 dark:text-gray-500'
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
              
              {dragOverIndex === index && (
                <div className="absolute inset-0 rounded-xl border-2 border-dashed border-purple-500 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 Tip: Only sections with content will appear in the final CV, even if visible here.
        </p>
      </div>
    </div>
  );
};

export default SectionOrderManager;