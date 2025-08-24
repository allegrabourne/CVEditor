// utils/templateGenerator.js - Utility to help create new templates

import { BaseTemplate } from '../templates/baseTemplate.js';

/**
 * Template Generator - Creates template boilerplate and provides utilities
 */
export class TemplateGenerator {
  
  /**
   * Generate a new template class file
   */
  static generateTemplateClass(templateConfig) {
    const className = templateConfig.id
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Template';
    
    return `// templates/implementations/${templateConfig.id}Template.js
import { BaseTemplate } from '../baseTemplate.js';

export class ${className} extends BaseTemplate {
  generateCSS(isDark = false) {
    const baseCSS = this.generateBaseCSS();
    const colors = this.getColors();
    
    return \`
      \${baseCSS}
      
      /* Header Styles */
      .header {
        text-align: center;
        padding: 2rem 0;
        margin-bottom: 2rem;
        /* Add your header styling here */
      }
      
      .header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        color: var(--cv-primary);
      }
      
      /* Personal Details */
      .personal-details {
        padding: 1.5rem;
        border-radius: 1rem;
        margin-bottom: 2rem;
        /* Add your personal details styling here */
      }
      
      .personal-details h2 {
        color: var(--cv-primary);
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }
      
      .contact-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        margin: 0.25rem 0;
      }
      
      .contact-item strong {
        color: var(--cv-secondary);
        min-width: 4rem;
        font-weight: 600;
      }
      
      /* Section Styles */
      .section {
        margin-bottom: 2rem;
      }
      
      .section h2 {
        color: var(--cv-primary);
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
      }
      
      /* Profile Section */
      .profile {
        padding: 1.5rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        line-height: 1.6;
        /* Add your profile styling here */
      }
      
      /* Job/Experience Styles */
      .job {
        margin-bottom: 1.5rem;
        padding: 1rem;
        border-radius: 0.5rem;
        position: relative;
        /* Add your job styling here */
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
      
      .company-description {
        font-style: italic;
        color: var(--cv-muted);
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.25rem;
      }
      
      .responsibilities {
        margin: 0;
        padding-left: 1rem;
      }
      
      .responsibilities li {
        margin-bottom: 0.25rem;
        line-height: 1.5;
      }
      
      /* Project Styles */
      .project {
        margin-bottom: 1.5rem;
        padding: 1rem;
        border-radius: 0.5rem;
        /* Add your project styling here */
      }
      
      .technologies {
        font-style: italic;
        color: var(--cv-accent);
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        font-weight: 500;
      }
      
      /* Certificate Styles */
      .certificate {
        margin-bottom: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
      }
      
      /* Dark Mode Overrides */
      \${isDark ? this.generateDarkModeOverrides() : ''}
      
      /* Print Styles */
      \${this.generatePrintCSS()}
    \`;
  }
  
  generateDarkModeOverrides() {
    return \`
      /* Add dark mode specific overrides here */
      body {
        background: #0f172a;
        color: #e2e8f0;
      }
      
      .personal-details {
        background: rgba(30, 64, 175, 0.1);
        border: 1px solid var(--cv-accent);
      }
      
      .profile {
        background: rgba(30, 64, 175, 0.05);
      }
      
      .job, .project, .certificate {
        background: rgba(30, 64, 175, 0.05);
      }
    \`;
  }
  
  generateHTML(cvData, sectionOrder, isDark = false) {
    const sectionsHTML = sectionOrder.map(sectionId => {
      switch (sectionId) {
        case 'personal':
          return this.renderPersonalDetails(cvData.personalDetails);
        case 'profile':
          return this.renderProfile(cvData.profile);
        case 'experience':
          return this.renderWorkExperience(cvData.workExperience);
        case 'projects':
          return this.renderPersonalProjects(cvData.personalProjects);
        case 'certificates':
          return this.renderCertificates(cvData.certificates);
        case 'education':
          return this.renderEducation(cvData.education);
        case 'courses':
          return this.renderCourses(cvData.courses);
        default:
          return '';
      }
    }).filter(Boolean).join('');
    
    return \`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>\${cvData.personalDetails.name} - CV</title>
          <style>\${this.generateCSS(isDark)}</style>
        </head>
        <body>
          <div class="cv-container">
            <div class="header">
              <h1>\${cvData.personalDetails.name}</h1>
            </div>
            \${sectionsHTML}
          </div>
        </body>
      </html>
    \`;
  }
  
  // Additional render methods
  renderProfile(profile) {
    if (!profile?.trim()) return '';
    return \`
      <div class="section profile-section">
        <h2>Profile</h2>
        <div class="profile">
          \${profile.split('\\n').map(p => p.trim()).filter(p => p).join('<br><br>')}
        </div>
      </div>
    \`;
  }
  
  renderPersonalProjects(projects) {
    if (!projects?.length) return '';
    return \`
      <div class="section projects-section">
        <h2>Personal Projects</h2>
        \${projects.map(project => \`
          <div class="project">
            <div class="job-title">\${project.title}</div>
            \${project.technologies ? \`<div class="technologies">Technologies: \${project.technologies}</div>\` : ''}
            \${project.responsibilities?.length ? \`
              <ul class="responsibilities">
                \${project.responsibilities.map(resp => \`<li>\${resp}</li>\`).join('')}
              </ul>
            \` : ''}
          </div>
        \`).join('')}
      </div>
    \`;
  }
  
  renderCertificates(certificates) {
    if (!certificates?.length) return '';
    return \`
      <div class="section certificates-section">
        <h2>Certificates</h2>
        \${certificates.map(cert => \`
          <div class="certificate">
            <div class="job-title">\${cert.title}</div>
            \${cert.description ? \`<p>\${cert.description}</p>\` : ''}
          </div>
        \`).join('')}
      </div>
    \`;
  }
  
  renderEducation(education) {
    if (!education || (!education.degree && !education.university)) return '';
    return \`
      <div class="section education-section">
        <h2>Education</h2>
        <div class="job">
          \${education.degree ? \`<div class="job-title">\${education.degree}</div>\` : ''}
          \${education.university ? \`<div class="company">\${education.university}</div>\` : ''}
          \${education.dates ? \`<div class="dates">\${education.dates}</div>\` : ''}
          \${education.grade ? \`<p>\${education.grade}</p>\` : ''}
        </div>
      </div>
    \`;
  }
  
  renderCourses(courses) {
    if (!courses?.trim()) return '';
    return \`
      <div class="section courses-section">
        <h2>Additional Courses</h2>
        <div class="profile">
          \${courses}
        </div>
      </div>
    \`;
  }
}
`;
  }

  /**
   * Generate template registry entry
   */
  static generateRegistryEntry(templateConfig) {
    return `
  ${templateConfig.id}: {
    id: '${templateConfig.id}',
    name: '${templateConfig.name}',
    category: TEMPLATE_CATEGORIES.${templateConfig.category.toUpperCase()},
    description: '${templateConfig.description}',
    preview: '/previews/${templateConfig.id}.jpg',
    tags: [${templateConfig.tags.map(tag => `'${tag}'`).join(', ')}],
    colorSchemes: [${templateConfig.colorSchemes.map(scheme => `'${scheme}'`).join(', ')}]
  },`;
  }

  /**
   * Generate color scheme definitions
   */
  static generateColorSchemes(schemes) {
    return schemes.map(scheme => `
  '${scheme.id}': {
    primary: '${scheme.primary}',
    secondary: '${scheme.secondary}',
    accent: '${scheme.accent}',
    text: '${scheme.text}',
    muted: '${scheme.muted}'${scheme.glass ? `,\n    glass: '${scheme.glass}'` : ''}
  },`).join('');
  }

  /**
   * Generate a complete template package
   */
  static generateTemplatePackage(templateConfig) {
    const templateClass = this.generateTemplateClass(templateConfig);
    const registryEntry = this.generateRegistryEntry(templateConfig);
    
    return {
      templateClass,
      registryEntry,
      filename: `${templateConfig.id}Template.js`,
      instructions: `
To add this template:

1. Create file: templates/implementations/${templateConfig.id}Template.js
   Content: ${templateClass}

2. Add to templateRegistry.js in TEMPLATE_REGISTRY:
   ${registryEntry}

3. Import and add to TEMPLATE_CLASSES in templateManager.js:
   import { ${templateConfig.id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Template } from './implementations/${templateConfig.id}Template.js';
   
   const TEMPLATE_CLASSES = {
     // ... existing templates
     ${templateConfig.id}: ${templateConfig.id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Template,
   };

4. Create preview image: public/previews/${templateConfig.id}.jpg

5. Test the template in your CV editor!
      `
    };
  }
}

// Example usage:
export const createMinimalTemplate = () => {
  const templateConfig = {
    id: 'minimal_clean',
    name: 'Clean Minimal',
    category: 'Minimal',
    description: 'Ultra-clean minimal design with perfect typography',
    tags: ['minimal', 'clean', 'typography'],
    colorSchemes: ['pure-minimal', 'minimal-blue', 'minimal-gray']
  };

  return TemplateGenerator.generateTemplatePackage(templateConfig);
};

export const createCreativeTemplate = () => {
  const templateConfig = {
    id: 'creative_vibrant',
    name: 'Vibrant Creative',
    category: 'Creative',
    description: 'Bold, colorful design for creative professionals',
    tags: ['vibrant', 'creative', 'bold', 'colorful'],
    colorSchemes: ['rainbow', 'neon', 'sunset']
  };

  return TemplateGenerator.generateTemplatePackage(templateConfig);
};

// Template validation utilities
export const validateTemplate = (templateClass, cvData) => {
  try {
    const template = new templateClass({}, null);
    const html = template.generateHTML(cvData, ['personal', 'profile', 'experience'], false);
    const css = template.generateCSS(false);
    
    return {
      valid: true,
      html: html.length > 100,
      css: css.length > 100,
      errors: []
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error.message]
    };
  }
};

// Preview generation for template development
export const generateTemplatePreview = (templateId, cvData) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Template Preview - ${templateId}</title>
        <style>
          body { 
            margin: 20px; 
            transform: scale(0.8); 
            transform-origin: top left;
            background: #f5f5f5;
          }
          .preview-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="preview-container">
          <!-- Template content will be inserted here -->
        </div>
      </body>
    </html>
  `;
  
  return html;
};

export default TemplateGenerator;