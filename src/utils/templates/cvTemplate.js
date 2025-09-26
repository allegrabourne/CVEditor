// utils/templates/CVTemplate.js - Base template class with proper theming separation

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
   * @param {string} theme - 'light' or 'dark' - only affects preview, not export
   * @param {Array} visibleSections - Array of visible section IDs
   * @param {boolean} isExport - Whether this is for export (always uses light theme)
   * @returns {string} Complete HTML document
   */
  generateHTML(cvData, theme, visibleSections, isExport = false) {
    const styles = this.generateStyles(theme, isExport);
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
   * @param {boolean} isExport - Whether this is for export
   * @returns {string} CSS styles
   */
  generateStyles(theme, isExport = false) {
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
          return Array.isArray(cvData.education) && cvData.education.length > 0 && 
                 cvData.education.some(edu => edu.degree || edu.university || edu.dates || edu.grade);
      case 'courses':
        return cvData.courses?.trim();
      default:
        return false;
    }
  }

  /**
   * Helper method to get colors based on theme and export status
   * @param {string} theme - 'light' or 'dark'
   * @param {boolean} isExport - Whether this is for export
   * @returns {Object} Color scheme object
   */
  getColorScheme(theme, isExport = false) {
    // Define the base light theme colors (what will be exported)
    const baseColors = {
      // Text colors
      primaryText: '#1a202c',
      secondaryText: '#4a5568',
      mutedText: '#718096',
      
      // Background colors
      background: '#ffffff',
      cardBackground: '#f7fafc',
      
      // Structural colors - these NEVER change between themes or export
      accentPrimary: '#4299e1',
      accentSecondary: '#3182ce',
      accentGradientStart: '#667eea',
      accentGradientEnd: '#764ba2',
      
      // Border colors
      borderColor: '#e2e8f0',
      borderAccent: '#4299e1',
    };

    // For exports, ALWAYS return light theme colors
    if (isExport) {
      return baseColors;
    }

    // For preview in dark theme, only change text and background colors
    if (theme === 'dark') {
      return {
        ...baseColors, // Keep all structural colors the same
        // Only override text and background colors
        primaryText: '#f7fafc',
        secondaryText: '#e2e8f0', 
        mutedText: '#cbd5e0',
        background: '#1a202c',
        cardBackground: '#2d3748',
        borderColor: '#4a5568',
      };
    }

    // For preview in light theme, return the same as export
    return baseColors;
  }
}