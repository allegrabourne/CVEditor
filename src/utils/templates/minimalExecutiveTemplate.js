// utils/templates/MinimalExecutiveTemplate.js - Minimal Executive Template

import { CVTemplate } from './CVTemplate.js';

/**
 * Minimal Executive Template - Clean, sophisticated design for executive-level positions
 */
export class MinimalExecutiveTemplate extends CVTemplate {
  constructor() {
    super('minimal-executive', 'Minimal Executive', 'Clean, sophisticated design for executive-level positions');
  }

  generateStyles(theme) {
    const isDark = theme === 'dark';
    
    return `
        /* Reset for CV preview - scoped to prevent editor interference */
        .cv-container * {
            font-size: 0.95em;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* All styles scoped to .cv-container to prevent editor interference */
        .cv-container {
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.6;
            color: ${isDark ? '#f3f4f6' : '#1a202c'};
            background: ${isDark ? '#1a202c' : '#ffffff'};
    
            max-width: 750px;
            margin: 0 auto;
        }

        .cv-container .header {
            margin-bottom: 50px;
            padding-bottom: 30px;
            border-bottom: 3px solid ${isDark ? '#4a5568' : '#1a202c'};
        }

        .cv-container .header h1 {
            font-size: 2.8em;
            font-weight: normal;
            margin-bottom: 15px;
            color: ${isDark ? '#f7fafc' : '#1a202c'};
            letter-spacing: 2px;
        }

        .cv-container .contact-info {
            line-height: 1.8;
            color: ${isDark ? '#cbd5e0' : '#4a5568'};
        }

        .cv-container .contact-info div {
            margin-bottom: 5px;
        }

        .cv-container .content {
            max-width: 100%;
        }

        .cv-container .section {
            margin-bottom: 45px;
        }

        .cv-container .section-title {
            font-size: 1.4em;
            font-weight: normal;
            color: ${isDark ? '#f7fafc' : '#1a202c'};
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 3px;
            position: relative;
        }

        .cv-container .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 1px;
            background: ${isDark ? '#4a5568' : '#1a202c'};
        }

        .cv-container .profile {
            line-height: 1.8;
            margin-bottom: 20px;
            color: ${isDark ? '#cbd5e0' : '#2d3748'};
            max-width: 90%;
            white-space: pre-line;
        }

        .cv-container .job, 
        .cv-container .project, 
        .cv-container .certificate {
            margin-bottom: 35px;
            text-align: left;
        }

        .cv-container .job-title, 
        .cv-container .project-title, 
        .cv-container .certificate-title {
            font-weight: bold;
            color: ${isDark ? '#f7fafc' : '#1a202c'};
            margin-bottom: 5px;
        }

        .cv-container .job-company, 
        .cv-container .project-tech {
            font-style: italic;
            color: ${isDark ? '#a0aec0' : '#4a5568'};
            margin-bottom: 5px;
        }

        .cv-container .job-dates {
            color: ${isDark ? '#a0aec0' : '#718096'};
            margin-bottom: 10px;
        }

        .cv-container .job-description, 
        .cv-container .certificate-description {
            color: ${isDark ? '#cbd5e0' : '#4a5568'};
            margin-bottom: 10px;
            line-height: 1.7;
            white-space: pre-line;
        }

        .cv-container .responsibilities {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .cv-container .responsibilities li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 6px;
            color: ${isDark ? '#cbd5e0' : '#4a5568'};
            line-height: 1.6;
        }

        .cv-container .responsibilities li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: ${isDark ? '#a0aec0' : '#718096'};
        }

        .cv-container .education-item {
            margin-bottom: 15px;
            text-align: left;
        }

        .cv-container .degree {
            font-weight: bold;
            color: ${isDark ? '#f7fafc' : '#1a202c'};
            margin-bottom: 5px;
        }

        .cv-container .university {
            font-style: italic;
            color: ${isDark ? '#a0aec0' : '#4a5568'};
            margin-bottom: 5px;
        }

        .cv-container .education-dates, 
        .cv-container .education-grade {
            color: ${isDark ? '#a0aec0' : '#718096'};
            margin-bottom: 5px;
        }

        .cv-container .courses-content {
            line-height: 1.7;
            color: ${isDark ? '#cbd5e0' : '#4a5568'};
            white-space: pre-line;
            max-width: 90%;
        }

        /* Print styles scoped to cv-container */
        @media print {
            .cv-container {
                padding: 20px;
                background: white;
                color: black;
            }

            .cv-container .header {
                border-bottom: 3px solid #1a202c;
            }

            .cv-container .section-title {
                color: #1a202c;
            }

            .cv-container .section-title::after {
                background: #1a202c;
            }

            .cv-container .job-title, 
            .cv-container .project-title, 
            .cv-container .certificate-title, 
            .cv-container .degree {
                color: #1a202c;
            }
        }
    `;
  }

  generateBody(cvData, visibleSections) {
    let html = '<div class="cv-container">';

    // Header
    if (this.shouldRenderSection('personal', visibleSections, cvData)) {
      html += `
        <div class="header">
          <h1>${cvData.personalDetails?.name || ''}</h1>
          <div class="contact-info">
            ${cvData.personalDetails?.phone ? `<div>${cvData.personalDetails.phone}</div>` : ''}
            ${cvData.personalDetails?.email ? `<div>${cvData.personalDetails.email}</div>` : ''}
            ${cvData.personalDetails?.address ? `<div>${cvData.personalDetails.address}</div>` : ''}
            ${cvData.personalDetails?.website ? `<div>${cvData.personalDetails.website}</div>` : ''}
          </div>
        </div>
      `;
    }

    html += '<div class="content">';

    // Render sections in order
    visibleSections.forEach(sectionId => {
      switch (sectionId) {
        case 'profile':
          if (this.shouldRenderSection('profile', visibleSections, cvData)) {
            html += `
              <div class="section">
                <h2 class="section-title">Executive Summary</h2>
                <div class="profile">${cvData.profile || ''}</div>
              </div>
            `;
          }
          break;

        case 'experience':
          if (this.shouldRenderSection('experience', visibleSections, cvData)) {
            html += `<div class="section"><h2 class="section-title">Professional Experience</h2>`;
            cvData.workExperience?.forEach(job => {
              html += `
                <div class="job">
                  <div class="job-title">${job.title || ''}</div>
                  <div class="job-company">${job.company || ''}</div>
                  <div class="job-dates">${job.dates || ''}</div>
                  ${job.description ? `<div class="job-description">${job.description}</div>` : ''}
                  ${job.responsibilities?.length > 0 ? `
                    <ul class="responsibilities">
                      ${job.responsibilities.map(resp => resp.trim() ? `<li>${resp}</li>` : '').join('')}
                    </ul>
                  ` : ''}
                </div>
              `;
            });
            html += '</div>';
          }
          break;

        case 'projects':
          if (this.shouldRenderSection('projects', visibleSections, cvData)) {
            html += `<div class="section"><h2 class="section-title">Key Projects</h2>`;
            cvData.personalProjects?.forEach(project => {
              html += `
                <div class="project">
                  <div class="project-title">${project.title || ''}</div>
                  <div class="project-tech">${project.technologies || ''}</div>
                  ${project.responsibilities?.length > 0 ? `
                    <ul class="responsibilities">
                      ${project.responsibilities.map(resp => resp.trim() ? `<li>${resp}</li>` : '').join('')}
                    </ul>
                  ` : ''}
                </div>
              `;
            });
            html += '</div>';
          }
          break;

        case 'education':
          if (this.shouldRenderSection('education', visibleSections, cvData)) {
            html += `
              <div class="section">
                <h2 class="section-title">Education</h2>
                <div class="education-item">
                  <div class="degree">${cvData.education?.degree || ''}</div>
                  <div class="university">${cvData.education?.university || ''}</div>
                  <div class="education-dates">${cvData.education?.dates || ''}</div>
                  <div class="education-grade">${cvData.education?.grade || ''}</div>
                </div>
              </div>
            `;
          }
          break;

        case 'certificates':
          if (this.shouldRenderSection('certificates', visibleSections, cvData)) {
            html += `<div class="section"><h2 class="section-title">Professional Certifications</h2>`;
            cvData.certificates?.forEach(cert => {
              html += `
                <div class="certificate">
                  <div class="certificate-title">${cert.title || ''}</div>
                  <div class="certificate-description">${cert.description || ''}</div>
                </div>
              `;
            });
            html += '</div>';
          }
          break;

        case 'courses':
          if (this.shouldRenderSection('courses', visibleSections, cvData)) {
            html += `
              <div class="section">
                <h2 class="section-title">Additional Qualifications</h2>
                <div class="courses-content">${cvData.courses || ''}</div>
              </div>
            `;
          }
          break;
      }
    });

    html += '</div></div>';
    return html;
  }
}