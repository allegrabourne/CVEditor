// components/SectionForms.jsx - Reusable form components for all CV sections

import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

// Work Experience Form
export const ExperienceSection = ({
  workExperience,
  onAdd,
  onUpdate,
  onRemove,
  onAddResponsibility,
  onUpdateResponsibility,
  onRemoveResponsibility
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Work Experience</h3>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Plus className="h-4 w-4" />
        Add Job
      </button>
    </div>
    
    {workExperience.map((job, jobIndex) => (
      <div key={jobIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Job #{jobIndex + 1}</span>
          </div>
          <button
            onClick={() => onRemove(jobIndex)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            value={job.title}
            onChange={(e) => onUpdate(jobIndex, 'title', e.target.value)}
            placeholder="Job Title"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
          <input
            type="text"
            value={job.company}
            onChange={(e) => onUpdate(jobIndex, 'company', e.target.value)}
            placeholder="Company"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
          <input
            type="text"
            value={job.dates}
            onChange={(e) => onUpdate(jobIndex, 'dates', e.target.value)}
            placeholder="Employment Dates"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
          <textarea
            value={job.description}
            onChange={(e) => onUpdate(jobIndex, 'description', e.target.value)}
            placeholder="Company Description"
            rows="2"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
          />
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Responsibilities:</label>
            <button
              onClick={() => onAddResponsibility(jobIndex)}
              className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              Add
            </button>
          </div>
          {job.responsibilities.map((resp, respIndex) => (
            <div key={respIndex} className="flex gap-2 mb-3">
              <textarea
                value={resp}
                onChange={(e) => onUpdateResponsibility(jobIndex, respIndex, e.target.value)}
                placeholder="Responsibility description..."
                rows="2"
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none text-sm"
              />
              <button
                onClick={() => onRemoveResponsibility(jobIndex, respIndex)}
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

// Projects Section
export const ProjectsSection = ({
  personalProjects,
  onAdd,
  onUpdate,
  onRemove,
  onAddResponsibility,
  onUpdateResponsibility,
  onRemoveResponsibility
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Personal Projects</h3>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Plus className="h-4 w-4" />
        Add Project
      </button>
    </div>
    
    {personalProjects.map((project, projectIndex) => (
      <div key={projectIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Project #{projectIndex + 1}</span>
          </div>
          <button
            onClick={() => onRemove(projectIndex)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            value={project.title}
            onChange={(e) => onUpdate(projectIndex, 'title', e.target.value)}
            placeholder="Project Title"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
          <input
            type="text"
            value={project.technologies}
            onChange={(e) => onUpdate(projectIndex, 'technologies', e.target.value)}
            placeholder="Technologies Used"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Details:</label>
            <button
              onClick={() => onAddResponsibility(projectIndex)}
              className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              Add
            </button>
          </div>
          {project.responsibilities.map((resp, respIndex) => (
            <div key={respIndex} className="flex gap-2 mb-3">
              <textarea
                value={resp}
                onChange={(e) => onUpdateResponsibility(projectIndex, respIndex, e.target.value)}
                placeholder="Project detail description..."
                rows="2"
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none text-sm"
              />
              <button
                onClick={() => onRemoveResponsibility(projectIndex, respIndex)}
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

// Certificates Section
export const CertificatesSection = ({
  certificates,
  onAdd,
  onUpdate,
  onRemove
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Certificates</h3>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Plus className="h-4 w-4" />
        Add Certificate
      </button>
    </div>
    
    {certificates.map((cert, certIndex) => (
      <div key={certIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Certificate #{certIndex + 1}</span>
          </div>
          <button
            onClick={() => onRemove(certIndex)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            value={cert.title}
            onChange={(e) => onUpdate(certIndex, 'title', e.target.value)}
            placeholder="Certificate Title"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
          <textarea
            value={cert.description}
            onChange={(e) => onUpdate(certIndex, 'description', e.target.value)}
            placeholder="Certificate Description"
            rows="3"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
          />
        </div>
      </div>
    ))}
  </div>
);

// Education Section
export const EducationSection = ({ education, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Education</h3>
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Degree</label>
          <input
            type="text"
            value={education.degree}
            onChange={(e) => onUpdate('degree', e.target.value)}
            placeholder="Degree Title"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">University</label>
          <input
            type="text"
            value={education.university}
            onChange={(e) => onUpdate('university', e.target.value)}
            placeholder="University Name"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dates</label>
          <input
            type="text"
            value={education.dates}
            onChange={(e) => onUpdate('dates', e.target.value)}
            placeholder="Study Period"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade/Classification</label>
          <input
            type="text"
            value={education.grade}
            onChange={(e) => onUpdate('grade', e.target.value)}
            placeholder="Grade or Classification"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </div>
);

// Courses Section
export const CoursesSection = ({ courses, onUpdate }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Additional Courses</h3>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Courses Information</label>
      <textarea
        value={courses}
        onChange={(e) => onUpdate(e.target.value)}
        rows="4"
        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300 resize-none"
        placeholder="Information about additional courses, training, or qualifications..."
      />
    </div>
  </div>
);