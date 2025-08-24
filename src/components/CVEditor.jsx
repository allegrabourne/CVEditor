import React, { useState, useRef, useCallback, useMemo } from 'react';
import { 
  Download, Edit3, Eye, FileText, Palette, Plus, Trash2, 
  GripVertical, Upload, Sun, Moon, Settings, EyeOff
} from 'lucide-react';
import { generatePrintableHTML } from '../styles/cvstyles';
import { testData } from '../utils/cvData';
import { CVParser } from '../utils/cvParser';
import { SectionManager, DEFAULT_SECTION_ORDER, SECTION_CONFIG } from '../utils/sectionManager';
import { useTheme } from '../hooks/useTheme';
import { useDragDrop } from '../hooks/useDragDrop';
import { 
  ExperienceSection, 
  ProjectsSection, 
  CertificatesSection, 
  EducationSection, 
  CoursesSection 
} from './SectionForms';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = workerUrl;

const CVEditor = () => {
  // State management
  const [cvData, setCvData] = useState(testData);
  const [editMode, setEditMode] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('styled');
  const [activeSection, setActiveSection] = useState('personal');
  const [sectionOrder, setSectionOrder] = useState(DEFAULT_SECTION_ORDER);
  const [hiddenSections, setHiddenSections] = useState([]);
  
  const { theme, toggleTheme, isDark } = useTheme();
  const printRef = useRef();
  const sectionManager = useMemo(() => new SectionManager(sectionOrder), [sectionOrder]);

  // Section reordering function - THIS WAS THE MISSING FUNCTION
  const handleReorderSections = useCallback((newOrder) => {
    setSectionOrder(newOrder);
  }, []);
  
  const dragDropHook = useDragDrop(sectionOrder, handleReorderSections);

  // Section visibility management
  const visibleSections = useMemo(() => 
    sectionOrder.filter(section => !hiddenSections.includes(section)),
    [sectionOrder, hiddenSections]
  );

  const toggleSectionVisibility = useCallback((sectionId) => {
    const config = sectionManager.getSectionConfig(sectionId);
    if (config?.required) return; // Can't hide required sections
    
    setHiddenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  }, [sectionManager]);

  // Validation helper
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

  // Data update functions
  const updatePersonalDetails = useCallback((field, value) => {
    setCvData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }));
  }, []);

  const updateProfile = useCallback((value) => {
    setCvData(prev => ({ ...prev, profile: value }));
  }, []);

  const updateEducation = useCallback((field, value) => {
    setCvData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  }, []);

  const updateCourses = useCallback((value) => {
    setCvData(prev => ({ ...prev, courses: value }));
  }, []);

  // Work experience functions
  const addWorkExperience = useCallback(() => {
    setCvData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        title: "",
        company: "",
        dates: "",
        description: "",
        responsibilities: [""]
      }]
    }));
  }, []);

  const updateWorkExperience = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === index ? { ...job, [field]: value } : job
      )
    }));
  }, []);

  const removeWorkExperience = useCallback((index) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  }, []);

  const addResponsibility = useCallback((jobIndex) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? { ...job, responsibilities: [...job.responsibilities, ""] } : job
      )
    }));
  }, []);

  const updateResponsibility = useCallback((jobIndex, respIndex, value) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? {
          ...job,
          responsibilities: job.responsibilities.map((resp, j) => 
            j === respIndex ? value : resp
          )
        } : job
      )
    }));
  }, []);

  const removeResponsibility = useCallback((jobIndex, respIndex) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? {
          ...job,
          responsibilities: job.responsibilities.filter((_, j) => j !== respIndex)
        } : job
      )
    }));
  }, []);

  // Personal projects functions
  const addPersonalProject = useCallback(() => {
    setCvData(prev => ({
      ...prev,
      personalProjects: [...prev.personalProjects, {
        title: "",
        technologies: "",
        responsibilities: [""]
      }]
    }));
  }, []);

  const updatePersonalProject = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  }, []);

  const removePersonalProject = useCallback((index) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.filter((_, i) => i !== index)
    }));
  }, []);

  const addProjectResponsibility = useCallback((projectIndex) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? { ...project, responsibilities: [...project.responsibilities, ""] } : project
      )
    }));
  }, []);

  const updateProjectResponsibility = useCallback((projectIndex, respIndex, value) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? {
          ...project,
          responsibilities: project.responsibilities.map((resp, j) => 
            j === respIndex ? value : resp
          )
        } : project
      )
    }));
  }, []);

  const removeProjectResponsibility = useCallback((projectIndex, respIndex) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? {
          ...project,
          responsibilities: project.responsibilities.filter((_, j) => j !== respIndex)
        } : project
      )
    }));
  }, []);

  // Certificates functions
  const addCertificate = useCallback(() => {
    setCvData(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        title: "",
        description: ""
      }]
    }));
  }, []);

  const updateCertificate = useCallback((index, field, value) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  }, []);

  const removeCertificate = useCallback((index) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  }, []);

  // PDF extraction function
  const extractPdfText = useCallback(async (fileOrArrayBuffer) => {
    const data = fileOrArrayBuffer instanceof ArrayBuffer
      ? fileOrArrayBuffer
      : await fileOrArrayBuffer.arrayBuffer();

    const pdf = await getDocument({ data }).promise;
    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const linesMap = new Map();
      const yTolerance = 2;

      for (const it of content.items) {
        const text = (it.str || '').trim();
        if (!text) continue;

        const tm = it.transform || it.matrix || [];
        const yRaw = typeof tm[5] === 'number' ? tm[5] : 0;
        const yBucket = Math.round(yRaw / yTolerance) * yTolerance;

        if (!linesMap.has(yBucket)) linesMap.set(yBucket, []);
        linesMap.get(yBucket).push(text);
      }

      const lineYs = Array.from(linesMap.keys()).sort((a, b) => b - a);
      const pageLines = lineYs.map(y => linesMap.get(y).join(' '));
      pages.push(pageLines.join('\n'));
    }

    return pages.join('\n\n');
  }, []);

  // Import/Export functions
  const exportToPDF = useCallback(() => {
    const jsonData = JSON.stringify({ cvData, sectionOrder, hiddenSections });
    const printWindow = window.open('', '_blank');
    const content = generatePrintableHTML(cvData, selectedStyle, 'light', visibleSections);
    
    const contentWithData = content.replace(
      '</body>',
      `<!-- CV_DATA:${btoa(jsonData)}:CV_DATA --></body>`
    );
    
    printWindow.document.write(contentWithData);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }, [cvData, selectedStyle, sectionOrder, hiddenSections, visibleSections]);

  const importFromFile = useCallback(async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    try {
      let text = '';

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const pdfText = await extractPdfText(file);

        // Check for embedded JSON data first
        const marker = /CV_DATA:([A-Za-z0-9+/=]+):CV_DATA/;
        const match = pdfText.match(marker);
        if (match) {
          try {
            const jsonData = JSON.parse(atob(match[1]));
            if (jsonData.cvData) {
              setCvData(jsonData.cvData);
              if (jsonData.sectionOrder) setSectionOrder(jsonData.sectionOrder);
              if (jsonData.hiddenSections) setHiddenSections(jsonData.hiddenSections);
              alert('CV data imported successfully from exported PDF!');
              event.target.value = '';
              return;
            }
          } catch (e) {
            console.warn('Failed to parse embedded JSON data:', e);
          }
        }

        text = pdfText;
        
        if (!text || text.trim().length < 10) {
          alert('This PDF has no selectable text. Try exporting with selectable text or import a .json/.txt file instead.');
          event.target.value = '';
          return;
        }
      } else if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
        text = await file.text();
      } else if (file.name.toLowerCase().endsWith('.json')) {
        try {
          const imported = JSON.parse(await file.text());
          if (imported.cvData) {
            setCvData(imported.cvData);
            if (imported.sectionOrder) setSectionOrder(imported.sectionOrder);
            if (imported.hiddenSections) setHiddenSections(imported.hiddenSections);
          } else {
            setCvData(imported);
          }
          alert('CV data imported from JSON file.');
          event.target.value = '';
          return;
        } catch (e) {
          alert('Invalid JSON file format.');
          event.target.value = '';
          return;
        }
      } else {
        alert('Please upload a PDF, TXT, or JSON file.');
        event.target.value = '';
        return;
      }

      const parseResult = CVParser.parseCV(text);
      setCvData(parseResult.data);
      
      if (parseResult.message) {
        alert(`Import completed: ${parseResult.message}`);
      }
      
    } catch (error) {
      console.error('Import error:', error);
      alert(`Error reading file: ${error?.message ?? 'Unknown error'}`);
    } finally {
      if (event?.target) event.target.value = '';
    }
  }, [extractPdfText]);

  // Section configuration
  const sections = useMemo(() => 
    sectionManager.getAllSectionConfigs().map(config => ({
      id: config.id,
      name: config.name,
      icon: config.icon
    })),
    [sectionManager]
  );

  // Render edit section based on active section
  const renderEditSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Personal Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={cvData.personalDetails.name}
                  onChange={(e) => updatePersonalDetails('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={cvData.personalDetails.phone}
                  onChange={(e) => updatePersonalDetails('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <textarea
                  value={cvData.personalDetails.address}
                  onChange={(e) => updatePersonalDetails('address', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={cvData.personalDetails.email}
                  onChange={(e) => updatePersonalDetails('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                <input
                  type="text"
                  value={cvData.personalDetails.website}
                  onChange={(e) => updatePersonalDetails('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Professional Profile</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Description</label>
              <textarea
                value={cvData.profile}
                onChange={(e) => updateProfile(e.target.value)}
                rows="8"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                placeholder="Write your professional profile here..."
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <ExperienceSection
            workExperience={cvData.workExperience}
            onAdd={addWorkExperience}
            onUpdate={updateWorkExperience}
            onRemove={removeWorkExperience}
            onAddResponsibility={addResponsibility}
            onUpdateResponsibility={updateResponsibility}
            onRemoveResponsibility={removeResponsibility}
          />
        );

      case 'projects':
        return (
          <ProjectsSection
            personalProjects={cvData.personalProjects}
            onAdd={addPersonalProject}
            onUpdate={updatePersonalProject}
            onRemove={removePersonalProject}
            onAddResponsibility={addProjectResponsibility}
            onUpdateResponsibility={updateProjectResponsibility}
            onRemoveResponsibility={removeProjectResponsibility}
          />
        );

      case 'certificates':
        return (
          <CertificatesSection
            certificates={cvData.certificates}
            onAdd={addCertificate}
            onUpdate={updateCertificate}
            onRemove={removeCertificate}
          />
        );

      case 'education':
        return (
          <EducationSection
            education={cvData.education}
            onUpdate={updateEducation}
          />
        );

      case 'courses':
        return (
          <CoursesSection
            courses={cvData.courses}
            onUpdate={updateCourses}
          />
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Select a section to edit</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              CV Editor Pro
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              {/* Style selector */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-2">
                <Palette className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <select 
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
                >
                  <option value="styled">Rich Professional</option>
                  <option value="plain">Plain Professional</option>
                </select>
              </div>
              
              {/* Mode toggle */}
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                  editMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 dark:from-gray-600 dark:to-gray-700 dark:text-gray-200'
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Editor Panel */}
          {editMode && (
            <div className="lg:col-span-5 space-y-6">
              {/* Section Navigation with Drag and Drop */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Edit Sections
                </h2>
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
                            ? 'transform scale-105 bg-purple-50 dark:bg-purple-900/20' 
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
                              : `hover:bg-gray-200 dark:hover:bg-gray-600 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`
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
                                <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                                  Empty
                                </span>
                              )}
                              {isRequired && !isActive && (
                                <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
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
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 Drag sections to reorder • Orange border = empty section • Eye icon = show/hide
                  </p>
                </div>
              </div>

              {/* Edit Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                {renderEditSection()}
              </div>
            </div>
          )}

          {/* Preview Panel */}
          <div className={editMode ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </h2>
              </div>
              <div className="p-8 max-h-screen overflow-y-auto">
                <div 
                  className={`cv-preview transition-colors duration-300 ${
                    isDark ? 'dark-preview' : 'light-preview'
                  }`}
                  style={{
                    fontFamily: selectedStyle === 'styled' ? "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" : 'Arial, sans-serif',
                    lineHeight: '1.6',
                    fontSize: '14px'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: generatePrintableHTML(cvData, selectedStyle, isDark ? 'dark' : 'light', visibleSections)
                      .replace(/<!DOCTYPE[^>]*>/, '')
                      .replace(/<html[^>]*>/, '')
                      .replace(/<\/html>/, '')
                      .replace(/<head[^>]*>[\s\S]*?<\/head>/, '')
                      .replace(/<body[^>]*>/, '')
                      .replace(/<\/body>/, '')
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;