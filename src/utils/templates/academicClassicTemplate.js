// utils/templates/academicClassicTemplate.js
import { CVTemplate } from './cvTemplate.js';

export class AcademicClassicTemplate extends CVTemplate {
  constructor() {
    super(
      'academic-classic',
      'Academic Classic',
      'Traditional academic layout suitable for Oxford, Cambridge and scholarly institutions'
    );
  }

  generateStyles(theme, isExport = false) {
    const c = this.getColorScheme(theme, isExport);

    // Academic styling emphasizes readability and formal structure
    const WIDTH = 800;
    const BASE_FS = 0.91;
    const LINE_HEIGHT = 1.55; // Tighter for better density
    
    const colorAdjust = `
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `;

    const exportTweaks = isExport ? `
      .cv-container {
        max-width: ${WIDTH}px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 28px !important;
      }
    ` : '';

    return `
      ${colorAdjust}

      .cv-container {
        font-family: "Times New Roman", Georgia, Times, serif;
        font-size: ${BASE_FS}em;
        line-height: ${LINE_HEIGHT};
        color: ${c.primaryText};
        background: ${c.background};
        padding: 24px;
        max-width: ${WIDTH}px;
        margin: 0 auto;
        text-align: left;
      }

      /* Academic header with centered name and formal contact layout */
      .cv-container .academic-header {
        text-align: center;
        margin-bottom: 28px;
        padding-bottom: 18px;
        border-bottom: 1px solid ${c.borderColor};
      }

      .cv-container .academic-header h1 {
        margin: 0 0 10px 0;
        font-size: 2.0em;
        font-weight: normal;
        letter-spacing: 0.8px;
        color: ${c.primaryText};
        text-transform: uppercase;
        font-variant: small-caps;
      }

      .cv-container .academic-contact {
        font-size: 0.90em;
        color: ${c.secondaryText};
        line-height: 1.3;
      }

      .cv-container .academic-contact .contact-line {
        margin: 2px 0;
      }

      /* Academic section styling with Roman numerals aesthetic */
      .cv-container .academic-section {
        margin-bottom: 24px;
      }

      .cv-container .academic-section-title {
        font-size: 1.12em;
        font-weight: bold;
        color: ${c.primaryText};
        text-transform: uppercase;
        letter-spacing: 0.6px;
        margin-bottom: 14px;
        padding-bottom: 5px;
        border-bottom: 2px solid ${c.borderAccent};
        position: relative;
      }

      /* Academic profile - longer paragraphs expected */
      .cv-container .academic-profile {
        font-size: 1.02em;
        line-height: 1.7;
        color: ${c.secondaryText};
        text-align: justify;
        margin-bottom: 18px;
        white-space: pre-line;
      }

      /* Academic positions/experience */
      .cv-container .academic-item {
        margin-bottom: 20px;
        padding-bottom: 14px;
      }

      .cv-container .academic-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .cv-container .academic-position {
        font-weight: bold;
        font-size: 1.05em;
        color: ${c.primaryText};
        margin-bottom: 4px;
        font-style: italic;
      }

      .cv-container .academic-institution {
        font-weight: bold;
        color: ${c.primaryText};
        margin-bottom: 4px;
        font-size: 1.0em;
      }

      .cv-container .academic-dates {
        color: ${c.mutedText};
        font-size: 0.94em;
        margin-bottom: 8px;
        font-style: italic;
      }

      .cv-container .academic-description {
        color: ${c.secondaryText};
        line-height: 1.7;
        margin-bottom: 8px;
        text-align: justify;
        white-space: pre-line;
      }

      /* Academic achievements/responsibilities - more formal list styling */
      .cv-container .academic-achievements {
        list-style: none;
        margin: 6px 0 0 0;
        padding: 0;
      }

      .cv-container .academic-achievements li {
        position: relative;
        padding-left: 16px;
        margin-bottom: 5px;
        color: ${c.secondaryText};
        line-height: 1.55;
        text-align: justify;
      }

      .cv-container .academic-achievements li::before {
        content: '—';
        position: absolute;
        left: 0;
        color: ${c.mutedText};
        font-weight: bold;
      }

      /* Education section - most important for academic CVs */
      .cv-container .academic-degree {
        font-weight: bold;
        font-size: 1.05em;
        color: ${c.primaryText};
        margin-bottom: 4px;
      }

      .cv-container .academic-university {
        font-weight: bold;
        color: ${c.primaryText};
        margin-bottom: 4px;
      }

      .cv-container .academic-grade {
        color: ${c.mutedText};
        font-style: italic;
        margin-bottom: 4px;
      }

      /* Project titles should be italicized in academic context */
      .cv-container .academic-project-title {
        font-weight: bold;
        font-style: italic;
        color: ${c.primaryText};
        margin-bottom: 4px;
        font-size: 1.02em;
      }

      .cv-container .academic-project-tech {
        color: ${c.mutedText};
        font-size: 0.92em;
        margin-bottom: 8px;
      }

      /* Certificate styling for academic credentials */
      .cv-container .academic-certificate {
        font-weight: bold;
        color: ${c.primaryText};
        margin-bottom: 4px;
        font-size: 1.02em;
      }

      .cv-container .academic-cert-description {
        color: ${c.secondaryText};
        line-height: 1.65;
        margin-bottom: 8px;
        white-space: pre-line;
      }

      /* Courses section for additional qualifications */
      .cv-container .academic-courses {
        color: ${c.secondaryText};
        line-height: 1.7;
        text-align: justify;
        white-space: pre-line;
      }

      ${exportTweaks}

      @media print {
        .cv-container {
          max-width: ${WIDTH}px !important;
          margin: 0 auto !important;
          padding: 20px !important;
        }
        
        .cv-container .academic-header {
          page-break-after: avoid;
        }
        
        .cv-container .academic-item {
          page-break-inside: avoid;
        }
      }
    `;
  }

  generateBody(cvData, visibleSections) {
    const pd = cvData.personalDetails || {};
    const show = s => this.shouldRenderSection(s, visibleSections, cvData);
    let html = `<div class="cv-container">`;

    // Academic header with formal name presentation
    if (show('personal')) {
      html += `
        <header class="academic-header">
          <h1>${pd.name || ''}</h1>
          <div class="academic-contact">
            ${pd.address ? `<div class="contact-line">${pd.address}</div>` : ''}
            ${pd.phone ? `<div class="contact-line">Telephone: ${pd.phone}</div>` : ''}
            ${pd.email ? `<div class="contact-line">Email: ${pd.email}</div>` : ''}
            ${pd.website ? `<div class="contact-line">Web: ${pd.website}</div>` : ''}
          </div>
        </header>
      `;
    }

    // Render sections in order based on visibleSections array
    visibleSections.forEach(sectionId => {
      switch (sectionId) {
        case 'profile':
          if (show('profile')) {
            html += `
              <section class="academic-section">
                <h2 class="academic-section-title">Academic Profile</h2>
                <div class="academic-profile">${cvData.profile || ''}</div>
              </section>
            `;
          }
          break;

          case 'education':
            if (show('education')) {
              html += `<section class="academic-section"><h2 class="academic-section-title">Education</h2>`;
              (cvData.education || []).forEach(ed => {
                html += `
                  <div class="academic-item">
                    <div class="academic-degree">${ed.degree || ''}</div>
                    <div class="academic-university">${ed.university || ''}</div>
                    <div class="academic-dates">${ed.dates || ''}</div>
                    ${ed.grade ? `<div class="academic-grade">${ed.grade}</div>` : ''}
                  </div>
                `;
              });
              html += `</section>`;
            }
            break;

        case 'experience':
          if (show('experience')) {
            html += `
              <section class="academic-section">
                <h2 class="academic-section-title">Academic & Professional Experience</h2>
            `;
            (cvData.workExperience || []).forEach(job => {
              html += `
                <div class="academic-item">
                  <div class="academic-position">${job.title || ''}</div>
                  <div class="academic-institution">${job.company || ''}</div>
                  <div class="academic-dates">${job.dates || ''}</div>
                  ${job.description ? `<div class="academic-description">${job.description}</div>` : ''}
                  ${(job.responsibilities && job.responsibilities.length)
                    ? `<ul class="academic-achievements">${job.responsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}</ul>`
                    : ''
                  }
                </div>
              `;
            });
            html += `</section>`;
          }
          break;

        case 'projects':
          if (show('projects')) {
            html += `
              <section class="academic-section">
                <h2 class="academic-section-title">Research & Projects</h2>
            `;
            (cvData.personalProjects || []).forEach(project => {
              html += `
                <div class="academic-item">
                  <div class="academic-project-title">${project.title || ''}</div>
                  <div class="academic-project-tech">${project.technologies || ''}</div>
                  ${(project.responsibilities && project.responsibilities.length)
                    ? `<ul class="academic-achievements">${project.responsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}</ul>`
                    : ''
                  }
                </div>
              `;
            });
            html += `</section>`;
          }
          break;

        case 'certificates':
          if (show('certificates')) {
            html += `
              <section class="academic-section">
                <h2 class="academic-section-title">Professional Qualifications</h2>
            `;
            (cvData.certificates || []).forEach(cert => {
              html += `
                <div class="academic-item">
                  <div class="academic-certificate">${cert.title || ''}</div>
                  ${cert.description ? `<div class="academic-cert-description">${cert.description}</div>` : ''}
                </div>
              `;
            });
            html += `</section>`;
          }
          break;

        case 'courses':
          if (show('courses')) {
            html += `
              <section class="academic-section">
                <h2 class="academic-section-title">Additional Training & Courses</h2>
                <div class="academic-courses">${cvData.courses || ''}</div>
              </section>
            `;
          }
          break;
      }
    });

    html += `</div>`;
    return html;
  }
}