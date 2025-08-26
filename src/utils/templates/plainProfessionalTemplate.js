// utils/templates/PlainProfessionalTemplate.js - Plain Professional Template

import { CVTemplate } from './CVTemplate.js';

/**
 * Plain Professional Template - Clean, minimal template suitable for ATS systems
 */
export class PlainProfessionalTemplate extends CVTemplate {
  constructor() {
    super('plain-professional', 'Plain Professional', 'Clean, minimal template suitable for ATS systems');
  }

  generateStyles(theme) {
    const isDark = theme === 'dark';
    
    return `
        /* Reset for CV preview - scoped to prevent editor interference */
        .cv-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* All styles scoped to .cv-container to prevent editor interference */
        .cv-container {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: ${isDark ? '#f3f4f6' : '#333'};
            background: ${isDark ? '#1f2937' : '#ffffff'};
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }

        .cv-container .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid ${isDark ? '#4b5563' : '#333'};
        }

        .cv-container .header h1 {
            font-size: 2.2em;
            font-weight: bold;
            margin-bottom: 10px;
            color: ${isDark ? '#f3f4f6' : '#333'};
        }

        .cv-container .contact-info {
            font-size: 1em;
            line-height: 1.4;
        }

        .cv-container .content {
            max-width: 100%;
        }

        .cv-container .section {
            margin-bottom: 25px;
        }

        .cv-container .section-title {
            font-size: 1.3em;
            font-weight: bold;
            color: ${isDark ? '#f3f4f6' : '#333'};
            margin-bottom: 15px;
            text-transform: uppercase;
            border-bottom: 1px solid ${isDark ? '#4b5563' : '#666'};
            padding-bottom: 5px;
        }

        .cv-container .profile {
            font-size: 1em;
            line-height: 1.6;
            text-align: justify;
            margin-bottom: 15px;
            white-space: pre-line;
        }

        .cv-container .job, 
        .cv-container .project, 
        .cv-container .certificate {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px dotted ${isDark ? '#4b5563' : '#ccc'};
        }

        .cv-container .job:last-child, 
        .cv-container .project:last-child, 
        .cv-container .certificate:last-child {
            border-bottom: none;
        }

        .cv-container .job-title, 
        .cv-container .project-title, 
        .cv-container .certificate-title {
            font-size: 1.1em;
            font-weight: bold;
            color: ${isDark ? '#f3f4f6' : '#333'};
            margin-bottom: 3px;
        }

        .cv-container .job-company, 
        .cv-container .project-tech {
            font-weight: bold;
            color: ${isDark ? '#d1d5db' : '#666'};
            margin-bottom: 3px;
        }

        .cv-container .job-dates {
            color: ${isDark ? '#9ca3af' : '#666'};
            font-style: italic;
            margin-bottom: 8px;
        }

        .cv-container .job-description, 
        .cv-container .certificate-description {
            margin-bottom: 8px;
            color: ${isDark ? '#d1d5db' : '#555'};
            white-space: pre-line;
        }

        .cv-container .responsibilities {
            list-style: disc;
            padding-left: 20px;
            margin: 0;
        }

        .cv-container .responsibilities li {
            margin-bottom: 3px;
            color: ${isDark ? '#d1d5db' : '#555'};
        }

        .cv-container .education-item {
            margin-bottom: 15px;
        }

        .cv-container .degree {
            font-size: 1.1em;
            font-weight: bold;
            color: ${isDark ? '#f3f4f6' : '#333'};
            margin-bottom: 3px;
        }

        .cv-container .university {
            font-weight: bold;
            color: ${isDark ? '#d1d5db' : '#666'};
            margin-bottom: 3px;
        }

        .cv-container .education-dates, 
        .cv-container .education-grade {
            color: ${isDark ? '#9ca3af' : '#666'};
            margin-bottom: 3px;
        }

        .cv-container .courses-content {
            line-height: 1.6;
            white-space: pre-line;
        }

        /* Print styles scoped to cv-container */
        @media print {
            .cv-container {
                padding: 10px;
                background: white;
                color: black;
            }

            .cv-container .header {
                border-bottom: 2px solid #333;
            }

            .cv-container .section-title {
                color: #333;
                border-bottom: 1px solid #666;
            }

            .cv-container .job-title, 
            .cv-container .project-title, 
            .cv-container .certificate-title, 
            .cv-container .degree {
                color: #333;
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
            ${cvData.personalDetails?.phone || ''}${cvData.personalDetails?.phone && cvData.personalDetails?.email ? ' | ' : ''}
            ${cvData.personalDetails?.email || ''}${(cvData.personalDetails?.phone || cvData.personalDetails?.email) && cvData.personalDetails?.address ? '<br>' : ''}
            ${cvData.personalDetails?.address || ''}${cvData.personalDetails?.address && cvData.personalDetails?.website ? '<br>' : ''}
            ${cvData.personalDetails?.website || ''}
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
                <h2 class="section-title">Professional Profile</h2>
                <div class="profile">${cvData.profile || ''}</div>
              </div>
            `;
          }
          break;

        case 'experience':
          if (this.shouldRenderSection('experience', visibleSections, cvData)) {
            html += `<div class="section"><h2 class="section-title">Work Experience</h2>`;
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
            html += `<div class="section"><h2 class="section-title">Personal Projects</h2>`;
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
            html += `<div class="section"><h2 class="section-title">Certificates</h2>`;
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
                <h2 class="section-title">Additional Courses</h2>
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