// utils/sectionManager.js - Manages CV section ordering and configuration

export const DEFAULT_SECTION_ORDER = [
  'personal',
  'profile', 
  'experience',
  'projects',
  'certificates',
  'education',
  'courses'
];

export const SECTION_CONFIG = {
  personal: {
    id: 'personal',
    name: 'Personal Details',
    icon: '👤',
    required: true,
    exportable: true
  },
  profile: {
    id: 'profile', 
    name: 'Profile',
    icon: '📄',
    required: false,
    exportable: true
  },
  experience: {
    id: 'experience',
    name: 'Work Experience', 
    icon: '💼',
    required: false,
    exportable: true
  },
  projects: {
    id: 'projects',
    name: 'Personal Projects',
    icon: '🚀', 
    required: false,
    exportable: true
  },
  certificates: {
    id: 'certificates',
    name: 'Certificates',
    icon: '🏆',
    required: false,
    exportable: true
  },
  education: {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    required: false,
    exportable: true
  },
  courses: {
    id: 'courses',
    name: 'Additional Courses',
    icon: '📚',
    required: false,
    exportable: true
  }
};

export class SectionManager {
  constructor(initialOrder = DEFAULT_SECTION_ORDER) {
    this.sectionOrder = [...initialOrder];
  }

  getSectionOrder() {
    return [...this.sectionOrder];
  }

  setSectionOrder(newOrder) {
    // Validate that all required sections are present
    const requiredSections = Object.values(SECTION_CONFIG)
      .filter(config => config.required)
      .map(config => config.id);
    
    const hasAllRequired = requiredSections.every(section => 
      newOrder.includes(section)
    );
    
    if (!hasAllRequired) {
      throw new Error('Missing required sections in new order');
    }
    
    this.sectionOrder = [...newOrder];
    return this.sectionOrder;
  }

  moveSection(fromIndex, toIndex) {
    const newOrder = [...this.sectionOrder];
    const [movedSection] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedSection);
    
    return this.setSectionOrder(newOrder);
  }

  getSectionConfig(sectionId) {
    return SECTION_CONFIG[sectionId] || null;
  }

  getAllSectionConfigs() {
    return this.sectionOrder.map(id => SECTION_CONFIG[id]).filter(Boolean);
  }

  getExportableSections() {
    return this.sectionOrder
      .map(id => SECTION_CONFIG[id])
      .filter(config => config && config.exportable);
  }

  validateSectionData(sectionId, data) {
    const config = this.getSectionConfig(sectionId);
    if (!config) return false;

    switch (sectionId) {
      case 'personal':
        return data.personalDetails && 
               (data.personalDetails.name || data.personalDetails.email);
      
      case 'profile':
        return typeof data.profile === 'string' && data.profile.trim().length > 0;
      
      case 'experience':
        return Array.isArray(data.workExperience) && 
               data.workExperience.some(job => job.title || job.company);
      
      case 'projects':
        return Array.isArray(data.personalProjects) && 
               data.personalProjects.some(project => project.title);
      
      case 'certificates':
        return Array.isArray(data.certificates) && 
               data.certificates.some(cert => cert.title);
      
      case 'education':
        return Array.isArray(data.education) && data.education.length > 0 && 
                       data.education.some(edu => edu.degree || edu.university || edu.dates || edu.grade);
      
      case 'courses':
        return typeof data.courses === 'string' && data.courses.trim().length > 0;
      
      default:
        return false;
    }
  }

  getVisibleSections(cvData) {
    return this.sectionOrder.filter(sectionId => {
      const config = this.getSectionConfig(sectionId);
      if (!config) return false;
      
      // Always show required sections
      if (config.required) return true;
      
      // Show optional sections only if they have data
      return this.validateSectionData(sectionId, cvData);
    });
  }
}