// utils/templates/RichProfessionalTemplate.js - Rich Professional Template

import { CVTemplate } from './CVTemplate.js';

/**
 * Rich Professional Template (existing 'styled' template)
 */
export class RichProfessionalTemplate extends CVTemplate {
  constructor() {
    super('rich-professional', 'Rich Professional', 'Professional template with colors and modern styling');
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: ${isDark ? '#f3f4f6' : '#1f2937'};
            background: ${isDark ? '#1f2937' : '#ffffff'};
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            overflow: hidden;
        }

        .cv-container .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            margin: -20px -20px 0 -20px;
        }

        .cv-container .header h1 {
            font-size: 2.5em;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .cv-container .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
            font-size: 1.1em;
        }

        .cv-container .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
        }

        .cv-container .content {
            padding: 40px 30px 20px 30px;
        }

        .cv-container .section {
            margin-bottom: 35px;
        }

        .cv-container .section-title {
            font-size: 1.5em;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #667eea;
            position: relative;
        }

        .cv-container .section-title::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 50px;
            height: 3px;
            background: #764ba2;
        }

        .cv-container .profile {
            font-size: 1.1em;
            line-height: 1.7;
            text-align: justify;
            color: ${isDark ? '#d1d5db' : '#4b5563'};
            white-space: pre-line;
        }

        .cv-container .job, 
        .cv-container .project, 
        .cv-container .certificate {
            margin-bottom: 25px;
            padding: 20px;
            background: ${isDark ? '#4b5563' : '#f8fafc'};
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }

        .cv-container .job-title, 
        .cv-container .project-title, 
        .cv-container .certificate-title {
            font-size: 1.2em;
            font-weight: 600;
            color: ${isDark ? '#f3f4f6' : '#1f2937'};
            margin-bottom: 8px;
        }

        .cv-container .job-company, 
        .cv-container .project-tech {
            font-weight: 500;
            color: #667eea;
            margin-bottom: 5px;
        }

        .cv-container .job-dates {
            color: ${isDark ? '#9ca3af' : '#6b7280'};
            font-style: italic;
            margin-bottom: 10px;
        }

        .cv-container .job-description, 
        .cv-container .certificate-description {
            color: ${isDark ? '#d1d5db' : '#4b5563'};
            margin-bottom: 10px;
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
            margin-bottom: 5px;
            color: ${isDark ? '#d1d5db' : '#4b5563'};
        }

        .cv-container .responsibilities li::before {
            content: '▸';
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
        }

        .cv-container .education-item {
            background: ${isDark ? '#4b5563' : '#f8fafc'};
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }

        .cv-container .degree {
            font-size: 1.2em;
            font-weight: 600;
            color: ${isDark ? '#f3f4f6' : '#1f2937'};
            margin-bottom: 8px;
        }

        .cv-container .university {
            font-weight: 500;
            color: #667eea;
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
            background: ${isDark ? '#4a5568' : '#f7fafc'};
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #4299e1;
        }

        /* Print styles scoped to cv-container */
        @media print {
            .cv-container {
                box-shadow: none;
                border-radius: 0;
                padding: 0;
            }

            .cv-container .header {
                background: #4299e1 !important;
                margin: 0;
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
            ${cvData.personalDetails?.phone ? `<div class="contact-item">📱 ${cvData.personalDetails.phone}</div>` : ''}
            ${cvData.personalDetails?.email ? `<div class="contact-item">✉️ ${cvData.personalDetails.email}</div>` : ''}
            ${cvData.personalDetails?.address ? `<div class="contact-item">📍 ${cvData.personalDetails.address}</div>` : ''}
            ${cvData.personalDetails?.website ? `<div class="contact-item">🌐 ${cvData.personalDetails.website}</div>` : ''}
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