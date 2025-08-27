// utils/templates/PlainProfessionalTemplate.js - Plain Professional Template

import { CVTemplate } from './CVTemplate.js';

/**
 * Plain Professional Template - Clean, minimal template suitable for ATS systems
 */
export class PlainProfessionalTemplate extends CVTemplate {
  constructor() {
    super('plain-professional', 'Plain Professional', 'Clean, minimal template suitable for ATS systems');
  }

  generateStyles(theme, isExport = false) {
    const colors = this.getColorScheme(theme, isExport);
    
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
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: ${colors.primaryText};
            background: ${colors.background};
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }

        /* Header styling - always left aligned for consistent layout */
        .cv-container .header {
            text-align: left;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid ${colors.borderAccent};
        }

        .cv-container .header h1 {
            font-size: 2.2em;
            font-weight: bold;
            margin-bottom: 10px;
            color: ${colors.primaryText};
            text-align: left;
        }

        .cv-container .contact-info {
            line-height: 1.4;
            color: ${colors.secondaryText};
            text-align: left;
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
            color: ${colors.primaryText};
            margin-bottom: 15px;
            text-transform: uppercase;
            border-bottom: 1px solid ${colors.borderAccent};
            padding-bottom: 5px;
            text-align: left;
        }

        .cv-container .profile {
            line-height: 1.6;
            text-align: left;
            margin-bottom: 15px;
            white-space: pre-line;
            color: ${colors.secondaryText};
        }

        .cv-container .job, 
        .cv-container .project, 
        .cv-container .certificate {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px dotted ${colors.borderColor};
            text-align: left;
        }

        .cv-container .job:last-child, 
        .cv-container .project:last-child, 
        .cv-container .certificate:last-child {
            border-bottom: none;
        }

        .cv-container .job-title, 
        .cv-container .project-title, 
        .cv-container .certificate-title {
            font-weight: bold;
            color: ${colors.primaryText};
            margin-bottom: 3px;
            text-align: left;
        }

        .cv-container .job-company, 
        .cv-container .project-tech {
            font-weight: bold;
            color: ${colors.mutedText};
            margin-bottom: 3px;
            text-align: left;
        }

        .cv-container .job-dates {
            color: ${colors.mutedText};
            font-style: italic;
            margin-bottom: 8px;
            text-align: left;
        }

        .cv-container .job-description, 
        .cv-container .certificate-description {
            margin-bottom: 8px;
            color: ${colors.secondaryText};
            white-space: pre-line;
            text-align: left;
        }

        .cv-container .responsibilities {
            list-style: disc;
            padding-left: 20px;
            margin: 0;
            text-align: left;
        }

        .cv-container .responsibilities li {
            margin-bottom: 3px;
            color: ${colors.secondaryText};
            text-align: left;
        }

        .cv-container .education-item {
            margin-bottom: 15px;
            text-align: left;
        }

        .cv-container .degree {
            font-weight: bold;
            color: ${colors.primaryText};
            margin-bottom: 3px;
            text-align: left;
        }

        .cv-container .university {
            font-weight: bold;
            color: ${colors.mutedText};
            margin-bottom: 3px;
            text-align: left;
        }

        .cv-container .education-dates, 
        .cv-container .education-grade {
            color: ${colors.mutedText};
            margin-bottom: 3px;
            text-align: left;
        }

        .cv-container .courses-content {
            line-height: 1.6;
            white-space: pre-line;
            color: ${colors.secondaryText};
            text-align: left;
        }

        /* Print styles - maintain exact same layout as screen */
        @media print {
            .cv-container {
                padding: 10px;
                background: white !important;
                color: #1a202c !important;
                max-width: none !important;
            }

            .cv-container .header {
                border-bottom: 2px solid #4299e1 !important;
                text-align: left !important;
            }

            .cv-container .header h1 {
                color: #1a202c !important;
                text-align: left !important;
            }

            .cv-container .contact-info {
                color: #4a5568 !important;
                text-align: left !important;
            }

            .cv-container .section-title {
                color: #1a202c !important;
                border-bottom: 1px solid #4299e1 !important;
                text-align: left !important;
            }

            .cv-container .job-title, 
            .cv-container .project-title, 
            .cv-container .certificate-title, 
            .cv-container .degree {
                color: #1a202c !important;
                text-align: left !important;
            }

            .cv-container .job-company,
            .cv-container .project-tech,
            .cv-container .university,
            .cv-container .job-dates,
            .cv-container .education-dates,
            .cv-container .education-grade {
                color: #718096 !important;
                text-align: left !important;
            }

            .cv-container .profile,
            .cv-container .job-description,
            .cv-container .certificate-description,
            .cv-container .courses-content,
            .cv-container .responsibilities li {
                color: #4a5568 !important;
                text-align: left !important;
            }

            /* Ensure all elements maintain left alignment in print */
            .cv-container * {
                text-align: left !important;
            }
        }
    `;
  }

  generateBody(cvData, visibleSections) {
    let html = '<div class="cv-container">';

    // Header - left aligned
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