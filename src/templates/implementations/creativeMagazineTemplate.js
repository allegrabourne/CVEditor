// templates/implementations/creativeMagazineTemplate.js - Example creative template

import { BaseTemplate } from '../baseTemplate.js';

export class CreativeMagazineTemplate extends BaseTemplate {
  generateCSS(isDark = false) {
    const baseCSS = this.generateBaseCSS();
    const colors = this.getColors();
    
    return `
      ${baseCSS}
      
      /* Magazine-inspired layout */
      body {
        font-family: 'Georgia', 'Times New Roman', serif;
        background: ${isDark ? '#1a1a1a' : '#f8f8f8'};
      }
      
      .cv-container {
        max-width: 900px;
        margin: 2rem auto;
        background: ${isDark ? '#2d2d2d' : 'white'};
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        overflow: hidden;
      }
      
      /* Bold magazine-style header */
      .header {
        background: linear-gradient(45deg, var(--cv-primary), var(--cv-secondary));
        color: white;
        padding: 3rem 2rem;
        text-align: left;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: repeating-linear-gradient(
          45deg,
          rgba(255,255,255,0.05),
          rgba(255,255,255,0.05) 2px,
          transparent 2px,
          transparent 20px
        );
        animation: slidePattern 20s linear infinite;
      }
      
      @keyframes slidePattern {
        0% { transform: translateX(-100px); }
        100% { transform: translateX(100px); }
      }
      
      .header h1 {
        font-size: 3.5rem;
        font-weight: 900;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: -2px;
        position: relative;
        z-index: 2;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      
      /* Two-column magazine layout */
      .content-wrapper {
        display: grid;
        grid-template-columns: 1fr 2fr;
        min-height: 100vh;
      }
      
      /* Left sidebar */
      .sidebar {
        background: linear-gradient(180deg, var(--cv-primary), var(--cv-accent));
        color: white;
        padding: 2rem;
      }
      
      .personal-details {
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        padding: 1.5rem;
        margin-bottom: 2rem;
        border: 1px solid rgba(255,255,255,0.2);
      }
      
      .personal-details h2 {
        color: white;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 700;
      }
      
      .contact-info {
        display: block;
      }
      
      .contact-item {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        color: rgba(255,255,255,0.9);
      }
      
      .contact-item strong {
        color: white;
        min-width: auto;
        margin-right: 0.5rem;
        font-weight: 600;
      }
      
      /* Main content area */
      .main-content {
        padding: 2rem;
        background: ${isDark ? '#2d2d2d' : 'white'};
      }
      
      .section {
        margin-bottom: 3rem;
        position: relative;
      }
      
      .section h2 {
        font-size: 2rem;
        font-weight: 900;
        color: var(--cv-primary);
        margin-bottom: 1.5rem;
        text-transform: uppercase;
        letter-spacing: -1px;
        position: relative;
      }
      
      .section h2::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 60px;
        height: 4px;
        background: linear-gradient(90deg, var(--cv-secondary), var(--cv-accent));
        border-radius: 2px;
      }
      
      /* Profile section - magazine style intro */
      .profile {
        font-size: 1.1rem;
        line-height: 1.8;
        color: ${isDark ? '#e2e8f0' : '#333'};
        position: relative;
        padding: 2rem;
        background: linear-gradient(135deg, 
          rgba(${this.hexToRgb(colors.primary)}, 0.05), 
          rgba(${this.hexToRgb(colors.secondary)}, 0.05)
        );
        border-radius: 1rem;
        border-left: 5px solid var(--cv-accent);
      }
      
      .profile::first-letter {
        font-size: 4rem;
        font-weight: 900;
        color: var(--cv-primary);
        float: left;
        line-height: 3rem;
        margin: 0.5rem 0.5rem 0 0;
        font-family: 'Georgia', serif;
      }
      
      /* Dynamic job cards */
      .job {
        background: ${isDark ? '#3d3d3d' : '#f9f9f9'};
        border-radius: 1rem;
        padding: 1.5rem;
        margin-bottom: 2rem;
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .job:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }
      
      .job::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background: linear-gradient(180deg, var(--cv-primary), var(--cv-secondary));
      }
      
      .job-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--cv-primary);
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .company {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--cv-secondary);
        margin-bottom: 0.5rem;
      }
      
      .dates {
        font-style: italic;
        color: var(--cv-accent);
        font-size: 0.9rem;
        margin-bottom: 1rem;
        font-weight: 500;
      }
      
      .company-description {
        font-style: italic;
        color: var(--cv-muted);
        margin-bottom: 1rem;
        padding: 1rem;
        background: rgba(${this.hexToRgb(colors.accent)}, 0.1);
        border-radius: 0.5rem;
        border-left: 3px solid var(--cv-accent);
      }
      
      .responsibilities {
        margin: 0;
        padding-left: 0;
        list-style: none;
      }
      
      .responsibilities li {
        margin-bottom: 0.8rem;
        padding-left: 1.5rem;
        position: relative;
        line-height: 1.6;
        color: ${isDark ? '#cbd5e0' : '#4a5568'};
      }
      
      .responsibilities li::before {
        content: '▶';
        position: absolute;
        left: 0;
        color: var(--cv-accent);
        font-size: 0.8rem;
      }
      
      /* Projects with creative styling */
      .project {
        background: linear-gradient(135deg, 
          rgba(${this.hexToRgb(colors.secondary)}, 0.1), 
          rgba(${this.hexToRgb(colors.accent)}, 0.1)
        );
        border-radius: 1rem;
        padding: 1.5rem;
        margin-bottom: 2rem;
        position: relative;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      
      .project::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, var(--cv-secondary), var(--cv-accent));
        border-radius: 1rem;
        padding: 2px;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        z-index: -1;
      }
      
      .technologies {
        display: inline-block;
        background: linear-gradient(90deg, var(--cv-secondary), var(--cv-accent));
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 1rem;
      }
      
      /* Certificate badges */
      .certificate {
        background: ${isDark ? '#3d3d3d' : 'white'};
        border: 2px solid var(--cv-accent);
        border-radius: 1rem;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        position: relative;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }
      
      .certificate::before {
        content: '🏆';
        position: absolute;
        top: -10px;
        right: 1rem;
        background: var(--cv-accent);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
      
      .certificate .job-title {
        color: var(--cv-secondary);
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }
      
      /* Responsive design */
      @media (max-width: 768px) {
        .content-wrapper {
          grid-template-columns: 1fr;
        }
        
        .sidebar {
          order: 2;
        }
        
        .main-content {
          order: 1;
        }
        
        .header h1 {
          font-size: 2.5rem;
        }
        
        .section h2 {
          font-size: 1.5rem;
        }
      }
      
      /* Dark Mode Overrides */
      ${isDark ? this.generateDarkModeOverrides() : ''}
      
      /* Print Styles */
      ${this.generatePrintCSS()}
    `;
  }
  
  generateDarkModeOverrides() {
    return `
      .cv-container {
        background: #2d2d2d;
        color: #e2e8f0;
      }
      
      .main-content {
        background: #2d2d2d;
      }
      
      .job {
        background: #3d3d3d;
        border: 1px solid #4a5568;
      }
      
      .project {
        background: linear-gradient(135deg, 
          rgba(124, 58, 237, 0.2), 
          rgba(59, 130, 246, 0.2)
        );
      }
      
      .certificate {
        background: #3d3d3d;
        border-color: #4a5568;
      }
      
      .profile {
        background: linear-gradient(135deg, 
          rgba(124, 58, 237, 0.1), 
          rgba(59, 130, 246, 0.1)
        );
        color: #e2e8f0;
      }
      
      .responsibilities li {
        color: #cbd5e0;
      }
    `;
  }
  
  generateHTML(cvData, sectionOrder, isDark = false) {
    // Separate sidebar and main content sections
    const sidebarSections = ['personal'];
    const mainSections = sectionOrder.filter(id => !sidebarSections.includes(id));
    
    const sidebarHTML = sidebarSections.map(sectionId => {
      if (sectionId === 'personal') {
        return this.renderPersonalDetails(cvData.personalDetails);
      }
      return '';
    }).filter(Boolean).join('');
    
    const mainHTML = mainSections.map(sectionId => {
      switch (sectionId) {
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
            <div class="content-wrapper">
              <div class="sidebar">
                ${sidebarHTML}
              </div>
              <div class="main-content">
                ${mainHTML}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  
  // Custom render methods for magazine layout
  renderProfile(profile) {
    if (!profile?.trim()) return '';
    return `
      <div class="section profile-section">
        <h2>Profile</h2>
        <div class="profile">
          ${profile.split('\n').map(p => p.trim()).filter(p => p).join(' ')}
        </div>
      </div>
    `;
  }
  
  renderPersonalProjects(projects) {
    if (!projects?.length) return '';
    return `
      <div class="section projects-section">
        <h2>Projects</h2>
        ${projects.map(project => `
          <div class="project">
            <div class="job-title">${project.title}</div>
            ${project.technologies ? `<div class="technologies">${project.technologies}</div>` : ''}
            ${project.responsibilities?.length ? `
              <ul class="responsibilities">
                ${project.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  
  renderCertificates(certificates) {
    if (!certificates?.length) return '';
    return `
      <div class="section certificates-section">
        <h2>Certificates</h2>
        ${certificates.map(cert => `
          <div class="certificate">
            <div class="job-title">${cert.title}</div>
            ${cert.description ? `<p>${cert.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  
  renderEducation(education) {
    if (!education || (!education.degree && !education.university)) return '';
    return `
      <div class="section education-section">
        <h2>Education</h2>
        <div class="job">
          ${education.degree ? `<div class="job-title">${education.degree}</div>` : ''}
          ${education.university ? `<div class="company">${education.university}</div>` : ''}
          ${education.dates ? `<div class="dates">${education.dates}</div>` : ''}
          ${education.grade ? `<p>${education.grade}</p>` : ''}
        </div>
      </div>
    `;
  }
  
  renderCourses(courses) {
    if (!courses?.trim()) return '';
    return `
      <div class="section courses-section">
        <h2>Additional Courses</h2>
        <div class="profile">
          ${courses}
        </div>
      </div>
    `;
  }
  
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
      '0, 0, 0';
  }
}

// Export the template
export default CreativeMagazineTemplate;