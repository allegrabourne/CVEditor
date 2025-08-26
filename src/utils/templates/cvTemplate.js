// utils/templates/CVTemplate.js - Base template class

/**
 * Base template class that all CV templates should extend
 */
export class CVTemplate {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
  
    /**
     * Generate HTML for the CV using this template
     * @param {Object} cvData - The CV data
     * @param {string} theme - 'light' or 'dark'
     * @param {Array} visibleSections - Array of visible section IDs
     * @returns {string} Complete HTML document
     */
    generateHTML(cvData, theme, visibleSections) {
      const styles = this.generateStyles(theme);
      const body = this.generateBody(cvData, visibleSections);
      
      return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${cvData.personalDetails?.name || 'CV'}</title>
      <style>
          ${styles}
      </style>
  </head>
  <body>
      ${body}
  </body>
  </html>`;
    }
  
    /**
     * Generate CSS styles for this template
     * All styles should be scoped to avoid affecting the CVEditor
     * @param {string} theme - 'light' or 'dark'
     * @returns {string} CSS styles
     */
    generateStyles(theme) {
      throw new Error('generateStyles must be implemented by subclass');
    }
  
    /**
     * Generate body HTML for this template
     * @param {Object} cvData - The CV data
     * @param {Array} visibleSections - Array of visible section IDs
     * @returns {string} Body HTML
     */
    generateBody(cvData, visibleSections) {
      throw new Error('generateBody must be implemented by subclass');
    }
  
    /**
     * Helper method to check if a section should be rendered
     * @param {string} sectionId - Section identifier
     * @param {Array} visibleSections - Array of visible section IDs
     * @param {Object} cvData - CV data to check for content
     * @returns {boolean} Whether section should be rendered
     */
    shouldRenderSection(sectionId, visibleSections, cvData) {
      if (!visibleSections.includes(sectionId)) return false;
      
      switch (sectionId) {
        case 'personal':
          return cvData.personalDetails?.name || cvData.personalDetails?.email;
        case 'profile':
          return cvData.profile?.trim();
        case 'experience':
          return cvData.workExperience?.length > 0;
        case 'projects':
          return cvData.personalProjects?.length > 0;
        case 'certificates':
          return cvData.certificates?.length > 0;
        case 'education':
          return cvData.education?.degree || cvData.education?.university;
        case 'courses':
          return cvData.courses?.trim();
        default:
          return false;
      }
    }
  }