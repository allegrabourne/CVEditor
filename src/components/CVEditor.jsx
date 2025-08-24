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

  // Section reordering function
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

  // Generate text-only preview for plain style
  const generatePlainTextPreview = useCallback(() => {
    const sections = [];
    
    // Name
    if (cvData.personalDetails.name) {
      sections.push(cvData.personalDetails.name.toUpperCase());
      sections.push('');
    }
    
    // Contact Details
    if (visibleSections.includes('personal')) {
      sections.push('CONTACT DETAILS');
      if (cvData.personalDetails.phone) sections.push(`Phone: ${cvData.personalDetails.phone}`);
      if (cvData.personalDetails.email) sections.push(`Email: ${cvData.personalDetails.email}`);
      if (cvData.personalDetails.address) sections.push(`Address: ${cvData.personalDetails.address}`);
      if (cvData.personalDetails.website) sections.push(`Website: ${cvData.personalDetails.website}`);
      sections.push('');
    }
    
    // Profile
    if (visibleSections.includes('profile') && cvData.profile) {
      sections.push('PROFILE');
      sections.push(cvData.profile);
      sections.push('');
    }
    
    // Work Experience
    if (visibleSections.includes('experience') && cvData.workExperience.length > 0) {
      sections.push('WORK EXPERIENCE');
      cvData.workExperience.forEach(job => {
        if (job.title) sections.push(job.title);
        if (job.company) sections.push(job.company);
        if (job.dates) sections.push(job.dates);
        if (job.description) sections.push(job.description);
        job.responsibilities.forEach(resp => {
          if (resp) sections.push(`• ${resp}`);
        });
        sections.push('');
      });
    }
    
    // Personal Projects
    if (visibleSections.includes('projects') && cvData.personalProjects.length > 0) {
      sections.push('PERSONAL PROJECTS');
      cvData.personalProjects.forEach(project => {
        if (project.title) sections.push(project.title);
        if (project.technologies) sections.push(`Technologies: ${project.technologies}`);
        project.responsibilities.forEach(resp => {
          if (resp) sections.push(`• ${resp}`);
        });
        sections.push('');
      });
    }
    
    // Certificates
    if (visibleSections.includes('certificates') && cvData.certificates.length > 0) {
      sections.push('CERTIFICATES');
      cvData.certificates.forEach(cert => {
        if (cert.title) sections.push(cert.title);
        if (cert.description) sections.push(cert.description);
        sections.push('');
      });
    }
    
    // Education
    if (visibleSections.includes('education') && (cvData.education.degree || cvData.education.university)) {
      sections.push('EDUCATION');
      if (cvData.education.degree) sections.push(cvData.education.degree);
      if (cvData.education.university) sections.push(cvData.education.university);
      if (cvData.education.dates) sections.push(cvData.education.dates);
      if (cvData.education.grade) sections.push(cvData.education.grade);
      sections.push('');
    }
    
    // Courses
    if (visibleSections.includes('courses') && cvData.courses) {
      sections.push('ADDITIONAL COURSES');
      sections.push(cvData.courses);
      sections.push('');
    }
    
    return sections.join('\n');
  }, [cvData, visibleSections]);

  // Generate preview HTML with proper styling
  const generatePreviewHTML = useCallback(() => {
    if (selectedStyle === 'plain') {
      // For plain style, show as preformatted text
      const plainText = generatePlainTextPreview();
      return `
        <style>
          .plain-text-preview {
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            line-height: 1.6;
            font-size: 12px;
            color: ${isDark ? '#e4e4e7' : '#333'};
            background: ${isDark ? '#18181b' : 'white'};
            padding: 20px;
            margin: 0;
            width: 100%;
            max-width: 100%;
          }
        </style>
        <div class="plain-text-preview">${plainText}</div>
      `;
    }
    
    const fullHTML = generatePrintableHTML(cvData, selectedStyle, isDark ? 'dark' : 'light', visibleSections);
    
    // Extract just the body content but keep the styles
    const styleMatch = fullHTML.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    const bodyMatch = fullHTML.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    
    const styles = styleMatch ? styleMatch[1] : '';
    const bodyContent = bodyMatch ? bodyMatch[1] : fullHTML;
    
    return `
      <style>
        ${styles}
        /* Additional preview-specific styles */
        .cv-container {
          max-width: 100% !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        body {
          margin: 0 !important;
          padding: 20px !important;
          max-width: 100% !important;
          width: 100% !important;
        }
      </style>
      ${bodyContent}
    `;
  }, [cvData, selectedStyle, isDark, visibleSections, generatePlainTextPreview]);

  // Get proper input field classes with theme support
  const getInputClasses = (isDark) => {
    return `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
      isDark 
        ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' 
        : 'border-gray-200 bg-white text-gray-900 placeholder-gray-500'
    }`;
  };

  const getTextareaClasses = (isDark) => {
    return `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none ${
      isDark 
        ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' 
        : 'border-gray-200 bg-white text-gray-900 placeholder-gray-500'
    }`;
  };

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
                  className={getInputClasses(isDark)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={cvData.personalDetails.phone}
                  onChange={(e) => updatePersonalDetails('phone', e.target.value)}
                  className={getInputClasses(isDark)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <textarea
                  value={cvData.personalDetails.address}
                  onChange={(e) => updatePersonalDetails('address', e.target.value)}
                  rows="3"
                  className={getTextareaClasses(isDark)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={cvData.personalDetails.email}
                  onChange={(e) => updatePersonalDetails('email', e.target.value)}
                  className={getInputClasses(isDark)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                <input
                  type="text"
                  value={cvData.personalDetails.website}
                  onChange={(e) => updatePersonalDetails('website', e.target.value)}
                  className={getInputClasses(isDark)}
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
                className={getTextareaClasses(isDark)}
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
    <div className={`min-h-screen w-full transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Header */}
      <div className={`shadow-xl border-b sticky top-0 z-50 backdrop-blur-xl ${
        isDark 
          ? 'bg-gray-800/90 border-gray-700' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="w-full max-w-none px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              CV Editor Pro
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-colors ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              {/* Style selector */}
              <div className={`flex items-center gap-2 rounded-xl p-2 ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <Palette className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <select 
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className={`bg-transparent text-sm font-medium focus:outline-none ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
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
          </div>
        </div>
      </div>

      <div className="w-full max-w-none px-6 py-8">
        <div className={`grid gap-8 ${editMode ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          
          {/* Editor Panel */}
          {editMode && (
            <div className="lg:col-span-5 space-y-6">
              {/* Section Navigation with Drag and Drop */}
              <div className={`rounded-2xl shadow-xl p-6 border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                }`}>
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
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
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
                    ? 'bg-blue-900/20 border-blue-700' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <p className={`text-sm ${
                    isDark ? 'text-blue-300' : 'text-blue-700'
                  }`}>
                    💡 Drag sections to reorder • Orange border = empty section • Eye icon = show/hide
                  </p>
                </div>
              </div>

              {/* Edit Form */}
              <div className={`rounded-2xl shadow-xl p-6 border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                {renderEditSection()}
              </div>
            </div>
          )}

          {/* Preview Panel */}
          <div className={editMode ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <div className={`rounded-2xl shadow-xl border overflow-hidden ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </h2>
              </div>
              <div className="p-8 max-h-screen overflow-y-auto">
                <div 
                  className="cv-preview transition-colors duration-300"
                  style={{ width: '100%', maxWidth: '100%' }}
                  dangerouslySetInnerHTML={{ 
                    __html: generatePreviewHTML()
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