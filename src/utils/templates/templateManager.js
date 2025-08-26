// utils/templates/TemplateManager.js - Template Manager

import { CVTemplate } from './cvTemplate.js';

/**
 * Template Manager - Handles template registration and retrieval
 */
export class TemplateManager {
  constructor() {
    this.templates = new Map();
  }

  /**
   * Register a template
   * @param {CVTemplate} template - Template instance to register
   */
  registerTemplate(template) {
    if (!(template instanceof CVTemplate)) {
      throw new Error('Template must extend CVTemplate class');
    }
    this.templates.set(template.id, template);
  }

  /**
   * Get a specific template by ID
   * @param {string} id - Template ID
   * @returns {CVTemplate} Template instance
   */
  getTemplate(id) {
    const template = this.templates.get(id);
    if (!template) {
      // Fallback to the first available template for unknown IDs
      const fallbackTemplate = Array.from(this.templates.values())[0];
      if (fallbackTemplate) {
        console.warn(`Template with ID "${id}" not found, falling back to ${fallbackTemplate.id}`);
        return fallbackTemplate;
      }
      throw new Error(`Template with ID "${id}" not found and no fallback available`);
    }
    return template;
  }

  /**
   * Get all registered templates
   * @returns {CVTemplate[]} Array of all templates
   */
  getAllTemplates() {
    return Array.from(this.templates.values());
  }

  /**
   * Get template options for dropdowns/selects
   * @returns {Array<{value: string, label: string, description: string}>}
   */
  getTemplateOptions() {
    return this.getAllTemplates().map(template => ({
      value: template.id,
      label: template.name,
      description: template.description
    }));
  }

  /**
   * Main method for generating HTML
   * @param {string} templateId - Template ID to use
   * @param {Object} cvData - CV data object
   * @param {string} theme - 'light' or 'dark'
   * @param {Array} visibleSections - Array of visible section IDs
   * @returns {string} Complete HTML document
   */
  generateHTML(templateId, cvData, theme = 'light', visibleSections = []) {
    const template = this.getTemplate(templateId);
    return template.generateHTML(cvData, theme, visibleSections);
  }

  /**
   * Check if template exists
   * @param {string} templateId - Template ID to check
   * @returns {boolean} Whether template exists
   */
  hasTemplate(templateId) {
    return this.templates.has(templateId);
  }

  /**
   * Get template info without instantiating
   * @param {string} templateId - Template ID
   * @returns {Object|null} Template info object or null
   */
  getTemplateInfo(templateId) {
    const template = this.templates.get(templateId);
    return template ? {
      id: template.id,
      name: template.name,
      description: template.description
    } : null;
  }

  /**
   * Get template count
   * @returns {number} Number of registered templates
   */
  getTemplateCount() {
    return this.templates.size;
  }

  /**
   * Clear all templates (useful for testing)
   */
  clearTemplates() {
    this.templates.clear();
  }

  /**
   * Get template IDs only
   * @returns {string[]} Array of template IDs
   */
  getTemplateIds() {
    return Array.from(this.templates.keys());
  }
}