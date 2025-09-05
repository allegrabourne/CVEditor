// EditPanel.jsx - Edit panel component

import React from 'react';
import { 
  ExperienceSection, 
  ProjectsSection, 
  CertificatesSection, 
  EducationSection, 
  CoursesSection 
} from './SectionForms';
import { PersonalDetailsForm } from './PersonalDetailsForm';
import { ProfileForm } from './ProfileForm';

export const EditPanel = ({
  isDark,
  activeSection,
  cvData,
  cvDataActions
}) => {
  const renderEditSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalDetailsForm
            personalDetails={cvData.personalDetails}
            onUpdate={cvDataActions.updatePersonalDetails}
            isDark={isDark}
          />
        );

      case 'profile':
        return (
          <ProfileForm
            profile={cvData.profile}
            onUpdate={cvDataActions.updateProfile}
            isDark={isDark}
          />
        );

      case 'experience':
        return (
          <ExperienceSection
            workExperience={cvData.workExperience}
            onAdd={cvDataActions.addWorkExperience}
            onUpdate={cvDataActions.updateWorkExperience}
            onRemove={cvDataActions.removeWorkExperience}
            onAddResponsibility={cvDataActions.addResponsibility}
            onUpdateResponsibility={cvDataActions.updateResponsibility}
            onRemoveResponsibility={cvDataActions.removeResponsibility}
          />
        );

      case 'projects':
        return (
          <ProjectsSection
            personalProjects={cvData.personalProjects}
            onAdd={cvDataActions.addPersonalProject}
            onUpdate={cvDataActions.updatePersonalProject}
            onRemove={cvDataActions.removePersonalProject}
            onAddResponsibility={cvDataActions.addProjectResponsibility}
            onUpdateResponsibility={cvDataActions.updateProjectResponsibility}
            onRemoveResponsibility={cvDataActions.removeProjectResponsibility}
          />
        );

      case 'certificates':
        return (
          <CertificatesSection
            certificates={cvData.certificates}
            onAdd={cvDataActions.addCertificate}
            onUpdate={cvDataActions.updateCertificate}
            onRemove={cvDataActions.removeCertificate}
          />
        );

      case 'education':
        return (
          <EducationSection
            education={cvData.education}
            onAdd={cvDataActions.addEducation}
            onUpdate={cvDataActions.updateEducation}
            onRemove={cvDataActions.removeEducation}
          />
        );

      case 'courses':
        return (
          <CoursesSection
            courses={cvData.courses}
            onUpdate={cvDataActions.updateCourses}
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
    <div className={`rounded-2xl shadow-xl p-6 border ${
      isDark 
        ? 'bg-gray-800/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    }`}>
      {renderEditSection()}
    </div>
  );
};