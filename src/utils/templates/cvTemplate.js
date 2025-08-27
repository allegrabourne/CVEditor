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
    // Always use light theme for exports, regardless of current theme
    const effectiveTheme = isExport ? 'light' : theme;
    const styles = this.generateStyles(effectiveTheme, isExport);
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
        return cvData.education?.degree || cvData.education?.university;
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
    // For exports, always use light theme colors for consistency
    if (isExport) {
      return {
        // Text colors
        primaryText: '#1a202c',
        secondaryText: '#4a5568',
        mutedText: '#718096',
        
        // Background colors
        background: '#ffffff',
        cardBackground: '#f8fafc',
        
        // Accent colors (structural elements - consistent across themes)
        accentPrimary: '#4299e1',
        accentSecondary: '#3182ce',
        accentGradientStart: '#667eea',
        accentGradientEnd: '#764ba2',
        
        // Border colors
        borderColor: '#e2e8f0',
        borderAccent: '#4299e1',
      };
    }

    // For preview, use theme-appropriate colors
    if (theme === 'dark') {
      return {
        // Text colors
        primaryText: '#f3f4f6',
        secondaryText: '#cbd5e0',
        mutedText: '#9ca3af',
        
        // Background colors
        background: '#1a202c',
        cardBackground: '#4a5568',
        
        // Accent colors (structural elements - consistent across themes)
        accentPrimary: '#4299e1',
        accentSecondary: '#3182ce',
        accentGradientStart: '#667eea',
        accentGradientEnd: '#764ba2',
        
        // Border colors
        borderColor: '#4b5563',
        borderAccent: '#4299e1',
      };
    } else {
      return {
        // Text colors
        primaryText: '#1a202c',
        secondaryText: '#4a5568',
        mutedText: '#718096',
        
        // Background colors
        background: '#ffffff',
        cardBackground: '#f8fafc',
        
        // Accent colors (structural elements - consistent across themes)
        accentPrimary: '#4299e1',
        accentSecondary: '#3182ce',
        accentGradientStart: '#667eea',
        accentGradientEnd: '#764ba2',
        
        // Border colors
        borderColor: '#e2e8f0',
        borderAccent: '#4299e1',
      };
    }
  }
}