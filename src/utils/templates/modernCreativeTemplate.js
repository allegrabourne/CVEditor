// utils/templates/ModernCreativeTemplate.js - Modern Creative Template with consistent styling

import { CVTemplate } from './cvTemplate.js';

/**
 * Modern Creative Template - Contemporary design with consistent visual elements
 */
export class ModernCreativeTemplate extends CVTemplate {
  constructor() {
    super('modern-creative', 'Modern Creative', 'Contemporary design with creative elements and typography');
  }

  generateStyles(theme, isExport = false) {
    const colors = this.getColorScheme(theme, isExport);
    
    return `
        /* Reset for CV preview - scoped to prevent editor interference */
        .cv-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* All styles scoped to .cv-container to prevent editor interference */
        .cv-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: ${colors.primaryText};
            background: ${colors.background};
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Header - structural design always consistent */
        .cv-container .header {
            background: linear-gradient(135deg, ${colors.accentGradientStart} 0%, ${colors.accentSecondary} 50%, ${colors.accentGradientEnd} 100%);
            color: white;
            padding: 50px 40px;
            position: relative;
            overflow: hidden;
            margin: -20px -20px 0 -20px;
            text-align: center;
        }

        .cv-container .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            transform: rotate(30deg);
        }

        .cv-container .header h1 {
            font-size: 3em;
            font-weight: 300;
            margin-bottom: 10px;
            letter-spacing: -0.02em;
            position: relative;
            z-index: 1;
            color: white;
        }

        .cv-container .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 25px;
            position: relative;
            z-index: 1;
        }

        .cv-container .contact-item {
            font-size: 1em;
            opacity: 0.95;
            color: white;
        }

        .cv-container .content {
            padding: 50px 40px 20px 40px;
        }

        .cv-container .section {
            margin-bottom: 40px;
            position: relative;
        }

        /* Section titles - structural color always consistent */
        .cv-container .section-title {
            font-size: 1.8em;
            font-weight: 600;
            color: ${colors.accentPrimary};
            margin-bottom: 25px;
            position: relative;
            padding-left: 25px;
            text-align: left;
        }

        .cv-container .section-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 30px;
            background: linear-gradient(135deg, ${colors.accentPrimary}, ${colors.accentSecondary});
            border-radius: 2px;
        }

        /* Profile section - left aligned */
        .cv-container .profile {
            font-size: 1.1em;
            line-height: 1.8;
            color: ${colors.secondaryText};
            background: ${colors.cardBackground};
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid ${colors.accentPrimary};
            white-space: pre-line;
            text-align: left;
        }

        /* Cards - left aligned content */
        .cv-container .job, 
        .cv-container .project, 
        .cv-container .certificate {
            margin-bottom: 30px;
            padding: 25px;
            background: ${colors.cardBackground};
            border-radius: 12px;
            position: relative;
            transition: transform 0.2s ease;
            text-align: left;
        }

        .cv-container .job::before, 
        .cv-container .project::before, 
        .cv-container .certificate::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(135deg, ${colors.accentPrimary}, ${colors.accentSecondary});
            border-radius: 0 2px 2px 0;
        }

        .cv-container .job-title, 
        .cv-container .project-title, 
        .cv-container .certificate-title {
            font-size: 1.3em;
            font-weight: 600;
            color: ${colors.primaryText};
            margin-bottom: 8px;
            text-align: left;
        }

        .cv-container .job-company, 
        .cv-container .project-tech {
            font-weight: 500;
            color: ${colors.accentPrimary};
            margin-bottom: 8px;
            font-size: 1.05em;
            text-align: left;
        }

        .cv-container .job-dates {
            color: ${colors.mutedText};
            font-style: italic;
            margin-bottom: 12px;
            font-size: 0.95em;
            text-align: left;
        }

        .cv-container .job-description, 
        .cv-container .certificate-description {
            color: ${colors.secondaryText};
            margin-bottom: 12px;
            line-height: 1.6;
            white-space: pre-line;
            text-align: left;
        }

        .cv-container .responsibilities {
            list-style: none;
            margin: 0;
            padding: 0;
            text-align: left;
        }

        .cv-container .responsibilities li {
            position: relative;
            padding-left: 25px;
            margin-bottom: 8px;
            color: ${colors.secondaryText};
            line-height: 1.6;
            text-align: left;
        }

        .cv-container .responsibilities li::before {
            content: '↗';
            position: absolute;
            left: 0;
            color: ${colors.accentPrimary};
            font-weight: bold;
            font-size: 1.1em;
        }

        /* Education section */
        .cv-container .education-item {
            background: ${colors.cardBackground};
            padding: 25px;
            border-radius: 12px;
            position: relative;
            text-align: left;
        }

        .cv-container .education-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(135deg, ${colors.accentPrimary}, ${colors.accentSecondary});
            border-radius: 0 2px 2px 0;
        }

        .cv-container .degree {
            font-size: 1.3em;
            font-weight: 600;
            color: ${colors.primaryText};
            margin-bottom: 8px;
            text-align: left;
        }

        .cv-container .university {
            font-weight: 500;
            color: ${colors.accentPrimary};
            margin-bottom: 8px;
            font-size: 1.05em;
            text-align: left;
        }

        .cv-container .education-dates, 
        .cv-container .education-grade {
            color: ${colors.mutedText};
            margin-bottom: 5px;
            text-align: left;
        }

        /* Courses section */
        .cv-container .courses-content {
            line-height: 1.7;
            color: ${colors.secondaryText};
            white-space: pre-line;
            background: ${colors.cardBackground};
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid ${colors.accentPrimary};
            text-align: left;
        }

        /* Print styles - maintain exact same styling as light theme */
        @media print {
            .cv-container {
                box-shadow: none;
                border-radius: 0;
                padding: 20px;
                background: #ffffff;
                color: #1a202c;
            }

            .cv-container .header {
                background: linear-gradient(135deg, #667eea 0%, #3182ce 50%, #764ba2 100%);
                color: white;
            }
            
            .cv-container .header h1 {
                color: white;
            }
            
            .cv-container .contact-item {
                color: white;
            }

            .cv-container .section-title {
                color: #4299e1;
            }
            
            .cv-container .section-title::before {
                background: linear-gradient(135deg, #4299e1, #3182ce);
            }
            
            .cv-container .job::before, 
            .cv-container .project::before, 
            .cv-container .certificate::before,
            .cv-container .education-item::before {
                background: linear-gradient(135deg, #4299e1, #3182ce);
            }
            
            .cv-container .job-company, 
            .cv-container .project-tech,
            .cv-container .university {
                color: #4299e1;
            }
            
            .cv-container .responsibilities li::before {
                color: #4299e1;
            }
            
            .cv-container .profile,
            .cv-container .courses-content {
                border-left: 4px solid #4299e1;
                background: #f7fafc;
            }

            .cv-container .job,
            .cv-container .project,
            .cv-container .certificate,
            .cv-container .education-item {
                background: #f7fafc;
            }

            .cv-container .job-title,
            .cv-container .project-title,
            .cv-container .certificate-title,
            .cv-container .degree {
                color: #1a202c;
            }

            .cv-container .job-description,
            .cv-container .certificate-description,
            .cv-container .profile,
            .cv-container .courses-content,
            .cv-container .responsibilities li {
                color: #4a5568;
            }

            .cv-container .job-dates,
            .cv-container .education-dates,
            .cv-container .education-grade {
                color: #718096;
            }
        }
    `;
  }

  generateBody(cvData, visibleSections) {
    let html = '<div class="cv-container">';

    // Header - always centered
    if (this.shouldRenderSection('personal', visibleSections, cvData)) {
      html += `
        <div class="header">
          <h1>${cvData.personalDetails?.name || ''}</h1>
          <div class="contact-info">
            ${cvData.personalDetails?.phone ? `<div class="contact-item">${cvData.personalDetails.phone}</div>` : ''}
            ${cvData.personalDetails?.email ? `<div class="contact-item">${cvData.personalDetails.email}</div>` : ''}
            ${cvData.personalDetails?.address ? `<div class="contact-item">${cvData.personalDetails.address}</div>` : ''}
            ${cvData.personalDetails?.website ? `<div class="contact-item">${cvData.personalDetails.website}</div>` : ''}
          </div>
        </div>
      `;
    }

    html += '<div class="content">';

    // Render sections in order - all left-aligned content except header
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