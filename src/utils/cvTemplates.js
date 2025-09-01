// utils/cvTemplates.js - Main CV Template System

// Import base classes
export { CVTemplate } from './templates/cvTemplate.js';
export { TemplateManager } from './templates/templateManager.js';

// Import all template implementations
import { RichProfessionalTemplate } from './templates/richProfessionalTemplate.js';
import { PlainProfessionalTemplate } from './templates/plainProfessionalTemplate.js';
import { ModernCreativeTemplate } from './templates/modernCreativeTemplate.js';
import { MinimalExecutiveTemplate } from './templates/minimalExecutiveTemplate.js';
import { AcademicClassicTemplate } from './templates/academicClassicTemplate.js';
import { CompactProfessionalTemplate } from './templates/compactTemplate.js';
import { TemplateManager } from './templates/templateManager.js';

// Create and configure the singleton template manager
const templateManager = new TemplateManager();

// Register all default templates
templateManager.registerTemplate(new RichProfessionalTemplate());
templateManager.registerTemplate(new PlainProfessionalTemplate());
templateManager.registerTemplate(new ModernCreativeTemplate());
templateManager.registerTemplate(new MinimalExecutiveTemplate());
templateManager.registerTemplate(new AcademicClassicTemplate());
templateManager.registerTemplate(new CompactProfessionalTemplate());

// Export the configured template manager
export { templateManager };

// Backward compatibility function to replace generatePrintableHTML
export const generatePrintableHTML = (cvData, templateId, theme = 'light', visibleSections = []) => {
  // Map old template IDs to new ones for backward compatibility
  const templateIdMap = {
    'styled': 'rich-professional',
    'plain': 'plain-professional'
  };
  
  const mappedId = templateIdMap[templateId] || templateId;
  return templateManager.generateHTML(mappedId, cvData, theme, visibleSections);
};

// Export individual templates for direct use if needed
export {
  RichProfessionalTemplate,
  PlainProfessionalTemplate,
  ModernCreativeTemplate,
  MinimalExecutiveTemplate,
  AcademicClassicTemplate,
  CompactProfessionalTemplate
};