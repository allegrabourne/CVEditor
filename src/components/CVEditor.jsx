// CVEditor.jsx - Main component with profile manager integration

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { templateManager } from '../utils/cvTemplates';
import { testData } from '../utils/cvData';
import { SectionManager, DEFAULT_SECTION_ORDER } from '../utils/sectionManager';
import { profileManager } from '../utils/profileManager';
import { useTheme } from '../hooks/useTheme';
import { useDragDrop } from '../hooks/useDragDrop';
import { useCVData } from '../hooks/useCVData';
import { useFileOperations } from '../hooks/useFileOperations';
import { HeaderControls } from './HeaderControls';
import { SectionNavigator } from './SectionNavigation';
import { EditPanel } from './EditPanel';
import { PreviewPanel } from './PreviewPanel';
import { Footer } from './Footer';
import { ProfileManager } from './ProfileManager';

const CVEditor = () => {
  // State management
  const [editMode, setEditMode] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('plain-professional');
  const [activeSection, setActiveSection] = useState('personal');
  const [sectionOrder, setSectionOrder] = useState(DEFAULT_SECTION_ORDER);
  const [hiddenSections, setHiddenSections] = useState([]);
  
  // Profile manager state
  const [showProfileManager, setShowProfileManager] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentProfileName, setCurrentProfileName] = useState('Untitled CV');
  
  const { theme, toggleTheme, isDark } = useTheme();
  const printRef = useRef();
  const sectionManager = useMemo(() => new SectionManager(sectionOrder), [sectionOrder]);

  // Custom hooks for data management
  const { cvData, ...cvDataActions } = useCVData(testData);
  const { importFromFile, exportToPDF } = useFileOperations(
    cvData, 
    selectedTemplate, 
    sectionOrder, 
    hiddenSections,
    cvDataActions.setCvData,
    setSectionOrder,
    setHiddenSections,
    setSelectedTemplate
  );

  // Get available templates
  const availableTemplates = useMemo(() => templateManager.getTemplateOptions(), []);

  // Check for unsaved changes whenever data changes
  useEffect(() => {
    const hasChanges = profileManager.hasUnsavedChanges(
      cvData, 
      sectionOrder, 
      hiddenSections, 
      selectedTemplate
    );
    setHasUnsavedChanges(hasChanges);
  }, [cvData, sectionOrder, hiddenSections, selectedTemplate]);

  // Update current profile name based on loaded profile
  useEffect(() => {
    const profileId = profileManager.getCurrentProfileId();
    setCurrentProfileId(profileId);
    
    if (profileId) {
      try {
        const profiles = profileManager.getProfileList();
        const currentProfile = profiles.find(p => p.id === profileId);
        setCurrentProfileName(currentProfile ? currentProfile.name : 'Untitled CV');
      } catch (error) {
        setCurrentProfileName('Untitled CV');
      }
    } else {
      setCurrentProfileName('Untitled CV');
    }
  }, [currentProfileId]);

  // Section reordering
  const handleReorderSections = (newOrder) => {
    setSectionOrder(newOrder);
  };
  
  const dragDropHook = useDragDrop(sectionOrder, handleReorderSections);

  // Section visibility management
  const visibleSections = useMemo(() => 
    sectionOrder.filter(section => !hiddenSections.includes(section)),
    [sectionOrder, hiddenSections]
  );

  const toggleSectionVisibility = (sectionId) => {
    const config = sectionManager.getSectionConfig(sectionId);
    if (config?.required) return;
    
    setHiddenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Profile manager handlers
  const handleOpenProfileManager = () => {
    setShowProfileManager(true);
  };

  const handleCloseProfileManager = () => {
    setShowProfileManager(false);
  };

  // Quick save current profile (if one is loaded)
  const handleQuickSave = () => {
    if (!currentProfileId) {
      setShowProfileManager(true);
      return;
    }

    try {
      const profiles = profileManager.getProfileList();
      const currentProfile = profiles.find(p => p.id === currentProfileId);
      
      if (currentProfile) {
        profileManager.saveProfile(
          currentProfile.name,
          cvData,
          sectionOrder,
          hiddenSections,
          selectedTemplate
        );
        setHasUnsavedChanges(false);
        
        // Show success notification (you could implement a toast system)
        console.log(`Profile "${currentProfile.name}" saved successfully`);
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      setShowProfileManager(true);
    }
  };

  // Generate preview HTML using theme-aware function
  const generatePreviewHTML = () => {
    const fullHTML = templateManager.generateHTML(
      selectedTemplate,
      cvData,
      isDark ? 'dark' : 'light',
      visibleSections
    );
  
    const styleMatch = fullHTML.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    const bodyMatch  = fullHTML.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  
    const styles = styleMatch ? styleMatch[1] : '';
    const body   = bodyMatch  ? bodyMatch[1]  : fullHTML;
  
    return `
      <style>
        /* --- Neutral preview baseline (scoped to preview only) --- */
        .cv-preview .cv-container {
          box-sizing: border-box !important;
          margin: 0 auto !important;  
          text-align: initial !important; /* fence off any global alignments */
        }
      </style>
  
      <style>
        ${styles}  /* template CSS overrides the neutral baseline */
      </style>
  
     ${body}
    `;
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Header */}
      <div className={`shadow-xl border-b sticky top-0 z-50 backdrop-blur-xl ${
        isDark 
          ? 'bg-gray-800/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="w-full max-w-none px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              CV Editor Pro
            </h1>
            
            <HeaderControls
              isDark={isDark}
              toggleTheme={toggleTheme}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              availableTemplates={availableTemplates}
              editMode={editMode}
              setEditMode={setEditMode}
              importFromFile={importFromFile}
              exportToPDF={exportToPDF}
              onOpenProfileManager={handleOpenProfileManager}
              hasUnsavedChanges={hasUnsavedChanges}
              currentProfileName={currentProfileName}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-none px-6 py-8">
        <div className={`grid gap-8 ${editMode ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          
          {/* Editor Panel - Full width on mobile when in edit mode */}
          {editMode && (
            <div className="col-span-1 lg:col-span-5 space-y-6">
              <SectionNavigator
                isDark={isDark}
                sectionOrder={sectionOrder}
                sectionManager={sectionManager}
                visibleSections={visibleSections}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                toggleSectionVisibility={toggleSectionVisibility}
                dragDropHook={dragDropHook}
                cvData={cvData}
              />

              <EditPanel
                isDark={isDark}
                activeSection={activeSection}
                cvData={cvData}
                cvDataActions={cvDataActions}
              />
            </div>
          )}

          {/* Preview Panel */}
          <div className={`${editMode ? 'hidden lg:block lg:col-span-7' : 'lg:col-span-12'}`}>
            <PreviewPanel
              isDark={isDark}
              generatePreviewHTML={generatePreviewHTML}
            />
          </div>
        </div>
      </div>

      {/* Profile Manager Modal */}
      {showProfileManager && (
        <ProfileManager
          isDark={isDark}
          cvData={cvData}
          sectionOrder={sectionOrder}
          hiddenSections={hiddenSections}
          selectedTemplate={selectedTemplate}
          setCvData={cvDataActions.setCvData}
          setSectionOrder={setSectionOrder}
          setHiddenSections={setHiddenSections}
          setSelectedTemplate={setSelectedTemplate}
          onClose={handleCloseProfileManager}
        />
      )}

      <Footer isDark={isDark} />
      
      {/* Keyboard shortcuts for quick actions */}
      <div
        onKeyDown={(e) => {
          if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
              case 's':
                e.preventDefault();
                handleQuickSave();
                break;
              case 'o':
                e.preventDefault();
                handleOpenProfileManager();
                break;
              default:
                break;
            }
          }
        }}
        tabIndex={-1}
        className="sr-only"
      />
    </div>
  );
};

export default CVEditor;