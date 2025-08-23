import React, { useState, useRef } from 'react';
import { Download, Edit3, Eye, FileText, Palette, Plus, Trash2, GripVertical } from 'lucide-react';
import { generatePrintableHTML } from '../styles/cv_styles'; 
import { testData } from '../utils/cv_data'; 
import { CVParser } from '../utils/cv_parser';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
GlobalWorkerOptions.workerSrc = workerUrl;

const CVEditor = () => {
  const [cvData, setCvData] = useState(testData);

  const [editMode, setEditMode] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('styled');
  const [activeSection, setActiveSection] = useState('personal');
  const printRef = useRef();

  const updatePersonalDetails = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }));
  };

  const updateProfile = (value) => {
    setCvData(prev => ({ ...prev, profile: value }));
  };

  const updateEducation = (field, value) => {
    setCvData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  };

  const updateCourses = (value) => {
    setCvData(prev => ({ ...prev, courses: value }));
  };

  const addWorkExperience = () => {
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
  };

  const updateWorkExperience = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === index ? { ...job, [field]: value } : job
      )
    }));
  };

  const removeWorkExperience = (index) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const addResponsibility = (jobIndex) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? { ...job, responsibilities: [...job.responsibilities, ""] } : job
      )
    }));
  };

  const updateResponsibility = (jobIndex, respIndex, value) => {
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
  };

  const removeResponsibility = (jobIndex, respIndex) => {
    setCvData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) => 
        i === jobIndex ? {
          ...job,
          responsibilities: job.responsibilities.filter((_, j) => j !== respIndex)
        } : job
      )
    }));
  };

  const addPersonalProject = () => {
    setCvData(prev => ({
      ...prev,
      personalProjects: [...prev.personalProjects, {
        title: "",
        technologies: "",
        responsibilities: [""]
      }]
    }));
  };

  const updatePersonalProject = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const removePersonalProject = (index) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.filter((_, i) => i !== index)
    }));
  };

  const addProjectResponsibility = (projectIndex) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? { ...project, responsibilities: [...project.responsibilities, ""] } : project
      )
    }));
  };

  const updateProjectResponsibility = (projectIndex, respIndex, value) => {
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
  };

  const removeProjectResponsibility = (projectIndex, respIndex) => {
    setCvData(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.map((project, i) => 
        i === projectIndex ? {
          ...project,
          responsibilities: project.responsibilities.filter((_, j) => j !== respIndex)
        } : project
      )
    }));
  };

  const addCertificate = () => {
    setCvData(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        title: "",
        description: ""
      }]
    }));
  };

  const updateCertificate = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertificate = (index) => {
    setCvData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const exportToPDF = () => {
    // Create a version with embedded JSON for re-import
    const jsonData = JSON.stringify(cvData);
    const printWindow = window.open('', '_blank');
    const content = generatePrintableHTML(cvData, selectedStyle);
    
    // Add hidden JSON data to the HTML
    const contentWithData = content.replace(
      '</body>',
      `<!-- CV_DATA:${btoa(jsonData)}:CV_DATA --></body>`
    );
    
    printWindow.document.write(contentWithData);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  async function extractPdfText(fileOrArrayBuffer) {
    const data = fileOrArrayBuffer instanceof ArrayBuffer
      ? fileOrArrayBuffer
      : await fileOrArrayBuffer.arrayBuffer();
  
    const pdf = await getDocument({ data }).promise;
    const pages = [];
  
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
  
      // Group text items by their Y position (line)
      const linesMap = new Map(); // key: y bucket -> array of strings
      const yTolerance = 2;       // pixels tolerance for same line
  
      for (const it of content.items) {
        const text = (it.str || '').trim();
        if (!text) continue;
  
        // try to read Y from transform matrix (tm[5]); fallback to 0
        const tm = it.transform || it.matrix || [];
        const yRaw = typeof tm[5] === 'number' ? tm[5] : 0;
  
        // bucket the Y value to merge near-identical baselines
        const yBucket = Math.round(yRaw / yTolerance) * yTolerance;
  
        if (!linesMap.has(yBucket)) linesMap.set(yBucket, []);
        linesMap.get(yBucket).push(text);
      }
  
      // sort by Y descending (PDF origin is bottom-left), then join words per line
      const lineYs = Array.from(linesMap.keys()).sort((a, b) => b - a);
      const pageLines = lineYs.map(y => linesMap.get(y).join(' '));
  
      pages.push(pageLines.join('\n'));
    }
  
    return pages.join('\n\n');
  }
  
  
  function looksLikeBinary(s) {
    if (!s) return true;
    const weird = (s.match(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]/g) || []).length;
    return weird > s.length * 0.02; // >2% non-printables => not real text
  }

  const importFromFile = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
  
    try {
      let text = '';

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const pdfText = await extractPdfText(file);

        let importedData = null;
        const marker = /CV_DATA:([A-Za-z0-9+/=]+):CV_DATA/;
        const m = pdfText.match(marker);
        if (m) {
          try {
            const jsonData = atob(m[1]);
            importedData = JSON.parse(jsonData);
          } catch { /* fall through */ }
        }
  
        if (importedData && importedData.personalDetails && importedData.workExperience) {
          setCvData(importedData);
          alert('CV data imported successfully from exported PDF!');
          event.target.value = '';
          return;
        }
  
        text = pdfText;
  
        if (looksLikeBinary(text) || text.trim().length < 10) {
          alert('This PDF has no selectable text (likely image-only). Try exporting with selectable text or import a .json/.txt instead.');
          event.target.value = '';
          return;
        }
      }

      else if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
        text = await file.text();
      }

      else if (file.name.toLowerCase().endsWith('.json')) {
        try {
          const imported = JSON.parse(await file.text());
          setCvData(imported);
          alert('Imported CV from JSON.');
          event.target.value = '';
          return;
        } catch (e) {
          alert('Invalid JSON file.');
          event.target.value = '';
          return;
        }
      }
      else {
        alert('Please upload a PDF, TXT, or JSON file.');
        event.target.value = '';
        return;
      }
  
      const parseResult = CVParser.parseCV(text);
  
      setCvData(parseResult.data);
  
      if (parseResult.message) console.info(parseResult.message);
    } catch (error) {
      console.error('Import error:', error);
      alert(`Error reading file: ${error?.message ?? 'Unknown error'}`);
    } finally {
      if (event?.target) event.target.value = '';
    }
  };

  const sections = [
    { id: 'personal', name: 'Personal Details', icon: '👤' },
    { id: 'profile', name: 'Profile', icon: '📄' },
    { id: 'experience', name: 'Work Experience', icon: '💼' },
    { id: 'projects', name: 'Personal Projects', icon: '🚀' },
    { id: 'certificates', name: 'Certificates', icon: '🏆' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'courses', name: 'Additional Courses', icon: '📚' }
  ];

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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Work Experience</h3>
              <button
                onClick={addWorkExperience}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4" />
                Add Job
              </button>
            </div>
            
            {cvData.workExperience.map((job, jobIndex) => (
              <div key={jobIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">Job #{jobIndex + 1}</span>
                  </div>
                  <button
                    onClick={() => removeWorkExperience(jobIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    value={job.title}
                    onChange={(e) => updateWorkExperience(jobIndex, 'title', e.target.value)}
                    placeholder="Job Title"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <input
                    type="text"
                    value={job.company}
                    onChange={(e) => updateWorkExperience(jobIndex, 'company', e.target.value)}
                    placeholder="Company"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <input
                    type="text"
                    value={job.dates}
                    onChange={(e) => updateWorkExperience(jobIndex, 'dates', e.target.value)}
                    placeholder="Employment Dates"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <textarea
                    value={job.description}
                    onChange={(e) => updateWorkExperience(jobIndex, 'description', e.target.value)}
                    placeholder="Company Description"
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                  />
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Responsibilities:</label>
                    <button
                      onClick={() => addResponsibility(jobIndex)}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                  {job.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2 mb-3">
                      <textarea
                        value={resp}
                        onChange={(e) => updateResponsibility(jobIndex, respIndex, e.target.value)}
                        placeholder="Responsibility description..."
                        rows="2"
                        className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none text-sm"
                      />
                      <button
                        onClick={() => removeResponsibility(jobIndex, respIndex)}
                        className="px-3 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 self-start"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Personal Projects</h3>
              <button
                onClick={addPersonalProject}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </button>
            </div>
            
            {cvData.personalProjects.map((project, projectIndex) => (
              <div key={projectIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">Project #{projectIndex + 1}</span>
                  </div>
                  <button
                    onClick={() => removePersonalProject(projectIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updatePersonalProject(projectIndex, 'title', e.target.value)}
                    placeholder="Project Title"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => updatePersonalProject(projectIndex, 'technologies', e.target.value)}
                    placeholder="Technologies Used"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Details:</label>
                    <button
                      onClick={() => addProjectResponsibility(projectIndex)}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                  {project.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2 mb-3">
                      <textarea
                        value={resp}
                        onChange={(e) => updateProjectResponsibility(projectIndex, respIndex, e.target.value)}
                        placeholder="Project detail description..."
                        rows="2"
                        className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none text-sm"
                      />
                      <button
                        onClick={() => removeProjectResponsibility(projectIndex, respIndex)}
                        className="px-3 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 self-start"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'certificates':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Certificates</h3>
              <button
                onClick={addCertificate}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-4 w-4" />
                Add Certificate
              </button>
            </div>
            
            {cvData.certificates.map((cert, certIndex) => (
              <div key={certIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">Certificate #{certIndex + 1}</span>
                  </div>
                  <button
                    onClick={() => removeCertificate(certIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => updateCertificate(certIndex, 'title', e.target.value)}
                    placeholder="Certificate Title"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  <textarea
                    value={cert.description}
                    onChange={(e) => updateCertificate(certIndex, 'description', e.target.value)}
                    placeholder="Certificate Description"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Education</h3>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Degree</label>
                  <input
                    type="text"
                    value={cvData.education.degree}
                    onChange={(e) => updateEducation('degree', e.target.value)}
                    placeholder="Degree Title"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">University</label>
                  <input
                    type="text"
                    value={cvData.education.university}
                    onChange={(e) => updateEducation('university', e.target.value)}
                    placeholder="University Name"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dates</label>
                  <input
                    type="text"
                    value={cvData.education.dates}
                    onChange={(e) => updateEducation('dates', e.target.value)}
                    placeholder="Study Period"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade/Classification</label>
                  <input
                    type="text"
                    value={cvData.education.grade}
                    onChange={(e) => updateEducation('grade', e.target.value)}
                    placeholder="Grade or Classification"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Additional Courses</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Courses Information</label>
              <textarea
                value={cvData.courses}
                onChange={(e) => updateCourses(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
                placeholder="Information about additional courses, training, or qualifications..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              CV Editor Pro
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
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

              <label className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                  <FileText className="h-4 w-4" />
                  Import PDF
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={importFromFile}
                    className="hidden"
                  />
                </label>
              
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
              {/* Section Navigation */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Sections</h2>
                <div className="grid grid-cols-2 gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span>{section.icon}</span>
                      {section.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Edit Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                {renderEditSection()}
              </div>
            </div>
          )}

          {/* Preview Panel */}
          <div className={`${editMode ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </h2>
              </div>
              <div className="p-8 max-h-screen overflow-y-auto">
                <div 
                  className="cv-preview"
                  style={{
                    fontFamily: selectedStyle === 'styled' ? "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" : 'Arial, sans-serif',
                    lineHeight: '1.6',
                    color: '#333',
                    fontSize: '14px'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: generatePrintableHTML(cvData, selectedStyle)
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