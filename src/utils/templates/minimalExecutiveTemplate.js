// utils/templates/minimalExecutiveTemplate.js
import { CVTemplate } from './cvTemplate.js';

export class MinimalExecutiveTemplate extends CVTemplate {
  constructor() {
    super('minimal-executive', 'Minimal Executive', 'Ultra-clean, sophisticated design emphasizing executive presence and strategic impact');
  }

  generateStyles(theme, isExport = false) {
    const c = this.getColorScheme(theme, isExport);
    
    const colorAdjust = `
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `;

    const exportTweaks = isExport ? `
      .cv-container {
        max-width: 850px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 40px !important;
      }
    ` : '';

    return `
      ${colorAdjust}

      .cv-container {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        font-size: 0.95em;
        line-height: 1.65;
        color: ${c.primaryText};
        background: ${c.background};
        max-width: 850px;
        margin: 0 auto;
        padding: 50px;
        text-align: left;
      }

      /* Executive Header - Command Presence */
      .cv-container .executive-header {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 25px;
        position: relative;
      }

      .cv-container .executive-header::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 1px;
        background: ${c.primaryText};
      }

      .cv-container .executive-name {
        font-size: 2.5em;
        font-weight: 300;
        letter-spacing: 3px;
        margin: 0 0 20px 0;
        color: ${c.primaryText};
        text-transform: uppercase;
      }

      .cv-container .executive-title {
        font-size: 1.3em;
        font-weight: 400;
        color: ${c.mutedText};
        margin-bottom: 25px;
        letter-spacing: 1px;
      }

      .cv-container .executive-contact {
        display: flex;
        justify-content: center;
        gap: 40px;
        flex-wrap: wrap;
        font-size: 0.95em;
        color: ${c.secondaryText};
      }

      .cv-container .contact-item {
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      /* Minimal Section Design */
      .cv-container .executive-section {
        margin-bottom: 50px;
      }

      .cv-container .section-title {
        font-size: 1.1em;
        font-weight: 600;
        color: ${c.primaryText};
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 30px;
        position: relative;
        padding-bottom: 10px;
      }

      .cv-container .section-title::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 1px;
        background: ${c.primaryText};
      }

      /* Executive Summary */
      .cv-container .executive-summary {
        font-size: 1.15em;
        line-height: 1.8;
        color: ${c.primaryText};
        font-weight: 400;
        text-align: justify;
        max-width: 90%;
        white-space: pre-line;
      }

      /* Experience - Strategic Focus */
      .cv-container .executive-role {
        margin-bottom: 45px;
        position: relative;
      }

      .cv-container .role-header {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
        align-items: baseline;
        margin-bottom: 15px;
      }

      .cv-container .role-title {
        font-size: 1.4em;
        font-weight: 600;
        color: ${c.primaryText};
        margin: 0;
        line-height: 1.3;
      }

      .cv-container .role-period {
        text-align: right;
        font-size: 0.9em;
        color: ${c.mutedText};
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      .cv-container .role-company {
        font-size: 1.1em;
        color: ${c.mutedText};
        font-weight: 500;
        margin-bottom: 20px;
        font-style: italic;
      }

      .cv-container .role-description {
        color: ${c.secondaryText};
        line-height: 1.7;
        margin-bottom: 15px;
        white-space: pre-line;
      }

      /* Key Achievements - Executive Impact */
      .cv-container .achievements {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .cv-container .achievements li {
        position: relative;
        padding-left: 25px;
        margin-bottom: 12px;
        color: ${c.secondaryText};
        line-height: 1.6;
        font-weight: 400;
      }

      .cv-container .achievements li::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: ${c.mutedText};
        font-weight: bold;
        font-size: 1.1em;
      }

      /* Education - Minimalist */
      .cv-container .education-entry {
        margin-bottom: 20px;
      }

      .cv-container .degree-info {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 20px;
      }

      .cv-container .degree-title {
        font-size: 1.2em;
        font-weight: 600;
        color: ${c.primaryText};
      }

      .cv-container .degree-details {
        text-align: right;
        color: ${c.mutedText};
        font-size: 0.95em;
        line-height: 1.4;
      }

      .cv-container .institution {
        font-weight: 500;
      }

      /* Projects - Strategic Initiatives */
      .cv-container .project-entry {
        margin-bottom: 35px;
      }

      .cv-container .project-title {
        font-size: 1.2em;
        font-weight: 600;
        color: ${c.primaryText};
        margin-bottom: 8px;
      }

      .cv-container .project-tech {
        color: ${c.mutedText};
        font-size: 0.9em;
        margin-bottom: 12px;
        font-style: italic;
      }

      /* Certificates */
      .cv-container .cert-entry {
        margin-bottom: 25px;
      }

      .cv-container .cert-title {
        font-size: 1.1em;
        font-weight: 600;
        color: ${c.primaryText};
        margin-bottom: 8px;
      }

      .cv-container .cert-description {
        color: ${c.secondaryText};
        line-height: 1.6;
        white-space: pre-line;
      }

      /* Additional Training */
      .cv-container .training-content {
        color: ${c.secondaryText};
        line-height: 1.7;
        font-size: 1.05em;
        white-space: pre-line;
        max-width: 90%;
      }

      ${exportTweaks}

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .cv-container {
          padding: 30px 25px;
        }
        
        .cv-container .executive-name {
          font-size: 2.5em;
          letter-spacing: 2px;
        }
        
        .cv-container .executive-contact {
          flex-direction: column;
          gap: 15px;
        }
        
        .cv-container .role-header {
          grid-template-columns: 1fr;
          gap: 10px;
        }
        
        .cv-container .role-period {
          text-align: left;
        }
        
        .cv-container .degree-info {
          flex-direction: column;
          gap: 10px;
        }
        
        .cv-container .degree-details {
          text-align: left;
        }
      }

      @media print {
        .cv-container {
          max-width: 850px !important;
          margin: 0 auto !important;
          padding: 30px !important;
        }
        
        .cv-container .executive-header::after,
        .cv-container .section-title::after {
          background: #000 !important;
        }
      }
    `;
  }

  generateBody(cvData, visibleSections) {
    const pd = cvData.personalDetails || {};
    const show = s => this.shouldRenderSection(s, visibleSections, cvData);
    
    let html = `<div class="cv-container">`;

    // Executive Header
    if (show('personal')) {
      html += `
        <header class="executive-header">
          <h1 class="executive-name">${pd.name || ''}</h1>
          <div class="executive-title">${cvData.workExperience[0].title || ''}</div>   
          <div class="executive-contact">
            ${pd.phone ? `<span class="contact-item">${pd.phone}</span>` : ''}
            ${pd.email ? `<span class="contact-item">${pd.email}</span>` : ''}
            ${pd.website ? `<span class="contact-item">${pd.website}</span>` : ''}
            ${pd.address ? `<span class="contact-item">${pd.address}</span>` : ''}
          </div>
        </header>
      `;
    }

    // Render sections in the order specified by visibleSections
    visibleSections.forEach(sectionId => {
      switch (sectionId) {
        case 'profile':
          if (show('profile')) {
            html += `
              <section class="executive-section">
                <h2 class="section-title">Executive Summary</h2>
                <div class="executive-summary">${cvData.profile || ''}</div>
              </section>
            `;
          }
          break;

        case 'experience':
          if (show('experience')) {
            html += `<section class="executive-section"><h2 class="section-title">Leadership Experience</h2>`;
            (cvData.workExperience || []).forEach(job => {
              html += `
                <div class="executive-role">
                  <div class="role-header">
                    <h3 class="role-title">${job.title || ''}</h3>
                    <div class="role-period">${job.dates || ''}</div>
                  </div>
                  <div class="role-company">${job.company || ''}</div>
                  ${job.description ? `<div class="role-description">${job.description}</div>` : ''}
                  ${(job.responsibilities && job.responsibilities.length) ? `
                    <ul class="achievements">
                      ${job.responsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}
                    </ul>
                  ` : ''}
                </div>
              `;
            });
            html += `</section>`;
          }
          break;

        case 'projects':
          if (show('projects')) {
            html += `<section class="executive-section"><h2 class="section-title">Strategic Initiatives</h2>`;
            (cvData.personalProjects || []).forEach(project => {
              html += `
                <div class="project-entry">
                  <h3 class="project-title">${project.title || ''}</h3>
                  <div class="project-tech">${project.technologies || ''}</div>
                  ${(project.responsibilities && project.responsibilities.length) ? `
                    <ul class="achievements">
                      ${project.responsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}
                    </ul>
                  ` : ''}
                </div>
              `;
            });
            html += `</section>`;
          }
          break;

          case 'education':
            if (show('education')) {
              html += `<section class="executive-section"><h2 class="section-title">Education</h2>`;
              (cvData.education || []).forEach(ed => {
                html += `
                  <div class="education-entry">
                    <div class="degree-info">
                      <div class="degree-title">${ed.degree || ''}</div>
                      <div class="degree-details">
                        <div class="institution">${ed.university || ''}</div>
                        ${ed.dates ? `<div>${ed.dates}</div>` : ''}
                        ${ed.grade ? `<div>${ed.grade}</div>` : ''}
                      </div>
                    </div>
                  </div>
                `;
              });
              html += `</section>`;
            }
            break;
          
        case 'certificates':
          if (show('certificates')) {
            html += `<section class="executive-section"><h2 class="section-title">Executive Credentials</h2>`;
            (cvData.certificates || []).forEach(cert => {
              html += `
                <div class="cert-entry">
                  <h3 class="cert-title">${cert.title || ''}</h3>
                  ${cert.description ? `<div class="cert-description">${cert.description}</div>` : ''}
                </div>
              `;
            });
            html += `</section>`;
          }
          break;

        case 'courses':
          if (show('courses')) {
            html += `
              <section class="executive-section">
                <h2 class="section-title">Executive Development</h2>
                <div class="training-content">${cvData.courses || ''}</div>
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