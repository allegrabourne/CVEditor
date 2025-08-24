// templates/templateRegistry.js - Central template management system

export const TEMPLATE_CATEGORIES = {
    PROFESSIONAL: 'Professional',
    CREATIVE: 'Creative', 
    MODERN: 'Modern',
    MINIMAL: 'Minimal',
    ACADEMIC: 'Academic'
  };
  
  export const TEMPLATE_REGISTRY = {
    // Professional Templates
    professional_rich: {
      id: 'professional_rich',
      name: 'Professional Rich',
      category: TEMPLATE_CATEGORIES.PROFESSIONAL,
      description: 'Elegant professional design with gradients and visual elements',
      preview: '/previews/professional_rich.jpg',
      tags: ['gradients', 'elegant', 'corporate'],
      colorSchemes: ['blue-purple', 'navy-teal', 'burgundy-gold']
    },
    
    professional_plain: {
      id: 'professional_plain', 
      name: 'Professional Plain',
      category: TEMPLATE_CATEGORIES.PROFESSIONAL,
      description: 'Clean, minimal professional design',
      preview: '/previews/professional_plain.jpg',
      tags: ['minimal', 'clean', 'ats-friendly'],
      colorSchemes: ['black-white', 'navy-gray', 'charcoal-blue']
    },
  
    // Creative Templates
    creative_portfolio: {
      id: 'creative_portfolio',
      name: 'Creative Portfolio',
      category: TEMPLATE_CATEGORIES.CREATIVE,
      description: 'Bold design with creative flair for designers and artists',
      preview: '/previews/creative_portfolio.jpg', 
      tags: ['bold', 'artistic', 'colorful'],
      colorSchemes: ['rainbow', 'sunset', 'ocean', 'forest']
    },
  
    creative_magazine: {
      id: 'creative_magazine',
      name: 'Magazine Style',
      category: TEMPLATE_CATEGORIES.CREATIVE,
      description: 'Magazine-inspired layout with dynamic sections',
      preview: '/previews/creative_magazine.jpg',
      tags: ['dynamic', 'editorial', 'modern'],
      colorSchemes: ['contrast', 'editorial', 'fashion']
    },
  
    // Modern Templates
    modern_glass: {
      id: 'modern_glass',
      name: 'Glass Morphism',
      category: TEMPLATE_CATEGORIES.MODERN,
      description: 'Modern design with glassmorphism effects',
      preview: '/previews/modern_glass.jpg',
      tags: ['glassmorphism', 'trendy', 'transparent'],
      colorSchemes: ['glass-blue', 'glass-purple', 'glass-teal']
    },
  
    modern_geometric: {
      id: 'modern_geometric', 
      name: 'Geometric Modern',
      category: TEMPLATE_CATEGORIES.MODERN,
      description: 'Clean geometric shapes and modern typography',
      preview: '/previews/modern_geometric.jpg',
      tags: ['geometric', 'shapes', 'contemporary'],
      colorSchemes: ['neon', 'pastels', 'monochrome']
    },
  
    // Minimal Templates  
    minimal_swiss: {
      id: 'minimal_swiss',
      name: 'Swiss Minimal',
      category: TEMPLATE_CATEGORIES.MINIMAL,
      description: 'Swiss design principles with perfect typography',
      preview: '/previews/minimal_swiss.jpg',
      tags: ['swiss', 'typography', 'grid'],
      colorSchemes: ['swiss-red', 'swiss-blue', 'pure-minimal']
    },
  
    minimal_sidebar: {
      id: 'minimal_sidebar',
      name: 'Sidebar Minimal',
      category: TEMPLATE_CATEGORIES.MINIMAL, 
      description: 'Clean layout with prominent sidebar',
      preview: '/previews/minimal_sidebar.jpg',
      tags: ['sidebar', 'two-column', 'spacious'],
      colorSchemes: ['sidebar-blue', 'sidebar-green', 'sidebar-gray']
    },
  
    // Academic Templates
    academic_classic: {
      id: 'academic_classic',
      name: 'Academic Classic',
      category: TEMPLATE_CATEGORIES.ACADEMIC,
      description: 'Traditional academic CV format',
      preview: '/previews/academic_classic.jpg',
      tags: ['traditional', 'formal', 'publications'],
      colorSchemes: ['academic-blue', 'academic-burgundy', 'academic-black']
    },
  
    academic_modern: {
      id: 'academic_modern',
      name: 'Academic Modern', 
      category: TEMPLATE_CATEGORIES.ACADEMIC,
      description: 'Modern take on academic formatting',
      preview: '/previews/academic_modern.jpg',
      tags: ['modern', 'research', 'clean'],
      colorSchemes: ['research-blue', 'research-teal', 'research-purple']
    }
  };
  
  // Color scheme definitions
  export const COLOR_SCHEMES = {
    // Professional Schemes
    'blue-purple': {
      primary: '#2563eb',
      secondary: '#7c3aed', 
      accent: '#3b82f6',
      text: '#1f2937',
      muted: '#6b7280'
    },
    'navy-teal': {
      primary: '#1e40af',
      secondary: '#0d9488',
      accent: '#06b6d4', 
      text: '#0f172a',
      muted: '#64748b'
    },
    'burgundy-gold': {
      primary: '#991b1b',
      secondary: '#d97706',
      accent: '#b45309',
      text: '#1c1917', 
      muted: '#78716c'
    },
  
    // Creative Schemes
    'rainbow': {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      text: '#111827',
      muted: '#6b7280'
    },
    'sunset': {
      primary: '#f97316',
      secondary: '#ec4899', 
      accent: '#eab308',
      text: '#1c1917',
      muted: '#78716c'
    },
  
    // Modern Schemes
    'glass-blue': {
      primary: '#3b82f6',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      text: '#1f2937', 
      muted: '#6b7280',
      glass: 'rgba(59, 130, 246, 0.1)'
    },
  
    // Minimal Schemes
    'swiss-red': {
      primary: '#dc2626',
      secondary: '#1f2937',
      accent: '#ef4444',
      text: '#000000',
      muted: '#6b7280'
    },
  
    // Academic Schemes
    'academic-blue': {
      primary: '#1e3a8a',
      secondary: '#1e40af', 
      accent: '#3b82f6',
      text: '#0f172a',
      muted: '#475569'
    }
  };
  
  // Template utility functions
  export const getTemplateById = (id) => TEMPLATE_REGISTRY[id];
  
  export const getTemplatesByCategory = (category) => 
    Object.values(TEMPLATE_REGISTRY).filter(template => template.category === category);
  
  export const getAllCategories = () => 
    Object.values(TEMPLATE_CATEGORIES);
  
  export const getColorScheme = (schemeId) => COLOR_SCHEMES[schemeId];
  
  export const getTemplateColorSchemes = (templateId) => {
    const template = getTemplateById(templateId);
    return template?.colorSchemes?.map(schemeId => ({
      id: schemeId,
      ...getColorScheme(schemeId)
    })) || [];
  };
  
  // templates/baseTemplate.js - Base template class
  
  export class BaseTemplate {
    constructor(templateConfig, colorScheme = null) {
      this.config = templateConfig;
      this.colorScheme = colorScheme;
    }
  
    // Abstract methods that each template must implement
    generateCSS(isDark = false) {
      throw new Error('generateCSS must be implemented by template');
    }
  
    generateHTML(cvData, sectionOrder, isDark = false) {
      throw new Error('generateHTML must be implemented by template');
    }
  
    // Common utility methods
    getColors() {
      return this.colorScheme || COLOR_SCHEMES['blue-purple'];
    }
  
    generateBaseCSS() {
      const colors = this.getColors();
      return `
        :root {
          --cv-primary: ${colors.primary};
          --cv-secondary: ${colors.secondary}; 
          --cv-accent: ${colors.accent};
          --cv-text: ${colors.text};
          --cv-muted: ${colors.muted};
          ${colors.glass ? `--cv-glass: ${colors.glass};` : ''}
        }
        
        body {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          line-height: 1.6;
          color: var(--cv-text);
          margin: 0;
          padding: 0;
        }
        
        .cv-container {
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
        }
      `;
    }
  
    generatePrintCSS() {
      return `
        @media print {
          body { 
            font-size: 11px !important;
            margin: 0 !important;
            padding: 8mm !important;
          }
          .cv-container {
            max-width: 100% !important;
            box-shadow: none !important;
          }
          .no-print { display: none !important; }
          * { 
            color-adjust: exact !important; 
            -webkit-print-color-adjust: exact !important;
          }
        }
      `;
    }
  
    // Common section renderers
    renderPersonalDetails(personalDetails) {
      return `
        <div class="personal-details">
          <h2>Contact Details</h2>
          <div class="contact-info">
            ${personalDetails.phone ? `<div class="contact-item"><strong>Phone:</strong> ${personalDetails.phone}</div>` : ''}
            ${personalDetails.email ? `<div class="contact-item"><strong>Email:</strong> ${personalDetails.email}</div>` : ''}
            ${personalDetails.address ? `<div class="contact-item"><strong>Address:</strong> ${personalDetails.address}</div>` : ''}
            ${personalDetails.website ? `<div class="contact-item"><strong>Website:</strong> ${personalDetails.website}</div>` : ''}
          </div>
        </div>
      `;
    }
  
    renderWorkExperience(workExperience) {
      if (!workExperience?.length) return '';
      
      return `
        <div class="section experience-section">
          <h2>Work Experience</h2>
          ${workExperience.map(job => `
            <div class="job">
              <div class="job-title">${job.title}</div>
              <div class="company">${job.company}</div>
              <div class="dates">${job.dates}</div>
              ${job.description ? `<div class="company-description">${job.description}</div>` : ''}
              ${job.responsibilities?.length ? `
                <ul class="responsibilities">
                  ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
  
    // Add more common renderers for other sections...
  }
  
  // templates/implementations/professionalRichTemplate.js - Example implementation
  
  //import { BaseTemplate } from './baseTemplate.js';
  
  export class ProfessionalRichTemplate extends BaseTemplate {
    generateCSS(isDark = false) {
      const baseCSS = this.generateBaseCSS();
      const colors = this.getColors();
      
      return `
        ${baseCSS}
        
        .header {
          text-align: center;
          padding: 2rem 0;
          background: linear-gradient(135deg, var(--cv-primary), var(--cv-secondary));
          color: white;
          margin-bottom: 2rem;
        }
        
        .header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .personal-details {
          background: linear-gradient(135deg, 
            rgba(${this.hexToRgb(colors.primary)}, 0.1), 
            rgba(${this.hexToRgb(colors.secondary)}, 0.1)
          );
          padding: 1.5rem;
          border-radius: 1rem;
          margin-bottom: 2rem;
          border: 1px solid var(--cv-accent);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .section {
          margin-bottom: 2rem;
        }
        
        .section h2 {
          color: var(--cv-primary);
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--cv-accent);
          background: linear-gradient(90deg, 
            rgba(${this.hexToRgb(colors.primary)}, 0.1), 
            transparent
          );
          padding-left: 1rem;
          margin-left: -1rem;
          border-radius: 0.5rem 0 0 0;
        }
        
        .job {
          margin-bottom: 1.5rem;
          padding: 1rem;
          border-left: 4px solid var(--cv-accent);
          background: linear-gradient(90deg, 
            rgba(${this.hexToRgb(colors.accent)}, 0.05), 
            transparent
          );
          border-radius: 0 0.5rem 0.5rem 0;
          position: relative;
        }
        
        .job::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 1rem;
          width: 8px;
          height: 8px;
          background: var(--cv-accent);
          border-radius: 50%;
          box-shadow: 0 0 0 3px white, 0 0 0 6px var(--cv-accent);
        }
        
        .job-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--cv-primary);
          margin-bottom: 0.25rem;
        }
        
        .company {
          font-weight: 500;
          color: var(--cv-text);
          margin-bottom: 0.25rem;
        }
        
        .dates {
          font-style: italic;
          color: var(--cv-muted);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        ${isDark ? this.generateDarkModeOverrides() : ''}
        ${this.generatePrintCSS()}
      `;
    }
    
    generateDarkModeOverrides() {
      return `
        body {
          background: #0f172a;
          color: #e2e8f0;
        }
        
        .header {
          background: linear-gradient(135deg, #1e40af, #7c3aed);
        }
        
        .personal-details {
          background: linear-gradient(135deg, 
            rgba(30, 64, 175, 0.2), 
            rgba(124, 58, 237, 0.2)
          );
          border-color: #3b82f6;
        }
        
        .job::before {
          box-shadow: 0 0 0 3px #0f172a, 0 0 0 6px #3b82f6;
        }
      `;
    }
    
    generateHTML(cvData, sectionOrder, isDark = false) {
      const sectionsHTML = sectionOrder.map(sectionId => {
        switch (sectionId) {
          case 'personal':
            return this.renderPersonalDetails(cvData.personalDetails);
          case 'experience':
            return this.renderWorkExperience(cvData.workExperience);
          // Add other sections...
          default:
            return '';
        }
      }).filter(Boolean).join('');
      
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${cvData.personalDetails.name} - CV</title>
            <style>${this.generateCSS(isDark)}</style>
          </head>
          <body>
            <div class="cv-container">
              <div class="header">
                <h1>${cvData.personalDetails.name}</h1>
              </div>
              ${sectionsHTML}
            </div>
          </body>
        </html>
      `;
    }
    
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
        '0, 0, 0';
    }
  }
  
  const TEMPLATE_CLASSES = {
    professional_rich: ProfessionalRichTemplate,
    // Add other template classes...
  };
  
  export class TemplateManager {
    constructor() {
      this.templates = new Map();
    }
    
    getTemplate(templateId, colorSchemeId = null) {
      const cacheKey = `${templateId}_${colorSchemeId || 'default'}`;
      
      if (this.templates.has(cacheKey)) {
        return this.templates.get(cacheKey);
      }
      
      const templateConfig = getTemplateById(templateId);
      if (!templateConfig) {
        throw new Error(`Template ${templateId} not found`);
      }
      
      const TemplateClass = TEMPLATE_CLASSES[templateId];
      if (!TemplateClass) {
        throw new Error(`Template class for ${templateId} not implemented`);
      }
      
      const colorScheme = colorSchemeId ? getColorScheme(colorSchemeId) : null;
      const template = new TemplateClass(templateConfig, colorScheme);
      
      this.templates.set(cacheKey, template);
      return template;
    }
    
    generateCV(templateId, cvData, sectionOrder, isDark = false, colorSchemeId = null) {
      const template = this.getTemplate(templateId, colorSchemeId);
      return template.generateHTML(cvData, sectionOrder, isDark);
    }
    
    getAvailableTemplates() {
      return Object.values(TEMPLATE_REGISTRY);
    }
    
    getTemplatesByCategory(category) {
      return Object.values(TEMPLATE_REGISTRY)
        .filter(template => template.category === category);
    }
  }
  
  // Export singleton instance
  export const templateManager = new TemplateManager();