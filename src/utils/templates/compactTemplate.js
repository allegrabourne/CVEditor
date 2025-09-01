// utils/templates/compactProfessionalTemplate.js
import { CVTemplate } from './cvTemplate.js';

export class CompactProfessionalTemplate extends CVTemplate {
  constructor() {
    super(
      'compact-professional',
      'Compact Professional',
      'Space-efficient design optimized for single-page CVs with maximum information density'
    );
  }

  generateStyles(theme, isExport = false) {
    const c = this.getColorScheme(theme, isExport);

    const colorAdjust = `
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `;

    const exportTweaks = isExport ? `
      .cv-container {
        max-width: 800px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 20px !important;
      }
    ` : '';

    return `
      ${colorAdjust}

      .cv-container {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        font-size: 0.82em;
        line-height: 1.35;
        color: ${c.primaryText};
        background: ${c.background};
        max-width: 800px;
        margin: 0 auto;
        padding: 16px;
        text-align: left;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      /* Compact header with horizontal contact layout */
      .cv-container .compact-header {
        margin-bottom: 16px;
        padding-bottom: 10px;
        border-bottom: 2px solid ${c.borderAccent};
        page-break-after: avoid;
        break-after: avoid;
      }

      .cv-container .compact-name {
        font-size: 2.0em;
        font-weight: 700;
        margin: 0 0 10px 0;
        color: ${c.primaryText};
        letter-spacing: 0.5px;
      }

      .cv-container .compact-contact {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 16px;
        font-size: 0.9em;
        color: ${c.secondaryText};
        font-weight: 500;
      }

      .cv-container .contact-separator {
        color: ${c.mutedText};
      }

      /* Ultra-compact sections */
      .cv-container .compact-section {
        margin-bottom: 14px;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .cv-container .compact-section:last-child {
        margin-bottom: 0;
      }

      .cv-container .section-title {
        font-size: 1.0em;
        font-weight: 700;
        color: ${c.primaryText};
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
        padding-bottom: 3px;
        border-bottom: 1px solid ${c.borderColor};
        page-break-after: avoid;
        break-after: avoid;
        orphans: 2;
        widows: 2;
      }

      /* Profile - condensed with shorter line height to prevent page breaks */
      .cv-container .compact-profile {
        font-size: 0.9em;
        line-height: 1.4;
        color: ${c.secondaryText};
        margin-bottom: 12px;
        white-space: pre-line;
      }

      /* Experience items - minimal spacing */
      .cv-container .compact-item {
        margin-bottom: 12px;
        padding-bottom: 8px;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .cv-container .compact-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
      }

      /* Minimal items for older positions */
      .cv-container .compact-item-minimal {
        margin-bottom: 10px;
        padding-bottom: 6px;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .cv-container .compact-item-minimal:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .cv-container .compact-item-minimal .item-title,
      .cv-container .compact-item-minimal .project-title {
        font-size: 0.95em;
        font-weight: 600;
      }

      .cv-container .compact-item-minimal .item-subtitle,
      .cv-container .compact-item-minimal .project-tech {
        font-size: 0.85em;
        opacity: 0.9;
      }

      .cv-container .item-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 4px;
        gap: 12px;
        page-break-after: avoid;
        break-after: avoid;
      }

      .cv-container .item-title {
        font-weight: 700;
        color: ${c.primaryText};
        font-size: 1.05em;
        flex-grow: 1;
      }

      .cv-container .item-dates {
        font-size: 0.85em;
        color: ${c.mutedText};
        font-weight: 600;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .cv-container .item-subtitle {
        color: ${c.mutedText};
        font-weight: 600;
        margin-bottom: 5px;
        font-style: italic;
      }

      .cv-container .item-description {
        color: ${c.secondaryText};
        line-height: 1.4;
        margin-bottom: 6px;
        white-space: pre-line;
        font-size: 0.95em;
      }

      /* Compact bullet points */
      .cv-container .compact-bullets {
        list-style: none;
        margin: 6px 0 0 0;
        padding: 0;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .cv-container .compact-bullets li {
        position: relative;
        padding-left: 12px;
        margin-bottom: 3px;
        color: ${c.secondaryText};
        line-height: 1.4;
        font-size: 0.9em;
      }

      .cv-container .compact-bullets li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: ${c.mutedText};
        font-weight: bold;
      }

      /* Project bullets limited to 2 lines maximum */
      .cv-container .project-bullets {
        list-style: none;
        margin: 6px 0 0 0;
        padding: 0;
        max-height: 2.8em; /* 2 lines max */
        overflow: hidden;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .cv-container .project-bullets li {
        position: relative;
        padding-left: 12px;
        margin-bottom: 3px;
        color: ${c.secondaryText};
        line-height: 1.4;
        font-size: 0.85em; /* Slightly smaller for projects */
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .cv-container .project-bullets li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: ${c.mutedText};
        font-weight: bold;
      }

      /* Education - inline format */
      .cv-container .compact-education {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: baseline;
      }

      .cv-container .education-degree {
        font-weight: 700;
        color: ${c.primaryText};
      }

      .cv-container .education-details {
        color: ${c.mutedText};
        font-size: 0.9em;
      }

      .cv-container .education-separator {
        color: ${c.mutedText};
      }

      /* Projects - condensed format */
      .cv-container .project-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 4px;
        page-break-after: avoid;
        break-after: avoid;
      }

      .cv-container .project-title {
        font-weight: 700;
        color: ${c.primaryText};
        flex-grow: 1;
      }

      .cv-container .project-tech {
        color: ${c.mutedText};
        font-size: 0.85em;
        font-style: italic;
        flex-shrink: 0;
      }

      /* Certificates - minimal format */
      .cv-container .cert-title {
        font-weight: 700;
        color: ${c.primaryText};
        margin-bottom: 3px;
      }

      .cv-container .cert-description {
        color: ${c.secondaryText};
        line-height: 1.4;
        font-size: 0.9em;
        white-space: pre-line;
      }

      /* Courses - compact paragraph */
      .cv-container .courses-content {
        color: ${c.secondaryText};
        line-height: 1.4;
        font-size: 0.9em;
        white-space: pre-line;
      }

      /* Two-column layout for better space utilization */
      .cv-container .two-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      ${exportTweaks}

      /* Responsive - stack columns on mobile */
      @media (max-width: 768px) {
        .cv-container {
          padding: 16px;
          font-size: 0.9em;
        }
        
        .cv-container .compact-name {
          font-size: 1.8em;
        }
        
        .cv-container .compact-contact {
          flex-direction: column;
          gap: 6px;
        }
        
        .cv-container .item-header {
          flex-direction: column;
          gap: 2px;
        }
        
        .cv-container .item-dates {
          align-self: flex-start;
        }
        
        .cv-container .compact-education {
          flex-direction: column;
        }
        
        .cv-container .two-column {
          grid-template-columns: 1fr;
          gap: 16px;
        }
      }

      @media print {
        .cv-container {
          max-width: 800px !important;
          margin: 0 auto !important;
          padding: 16px !important;
          font-size: 0.80em !important;
          line-height: 1.3 !important;
          orphans: 3;
          widows: 3;
        }
        
        .cv-container .compact-header {
          page-break-after: avoid;
          break-after: avoid;
          margin-bottom: 18px;
        }
        
        .cv-container .compact-section {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 16px;
        }
        
        .cv-container .compact-item,
        .cv-container .compact-item-minimal {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 14px;
        }
        
        .cv-container .section-title {
          page-break-after: avoid;
          break-after: avoid;
          orphans: 2;
          widows: 2;
        }
        
        .cv-container .item-header,
        .cv-container .project-header {
          page-break-after: avoid;
          break-after: avoid;
        }
        
        .cv-container .compact-bullets,
        .cv-container .project-bullets {
          page-break-inside: avoid;
          break-inside: avoid;
        }
      }
    `;
  }

  generateBody(cvData, visibleSections) {
    const pd = cvData.personalDetails || {};
    const show = s => this.shouldRenderSection(s, visibleSections, cvData);
    let html = `<div class="cv-container">`;

    // Compact header
    if (show('personal')) {
      const contactItems = [
        pd.phone,
        pd.email,
        pd.website,
        pd.address
      ].filter(Boolean);
      
      html += `
        <header class="compact-header">
          <h1 class="compact-name">${pd.name || ''}</h1>
          <div class="compact-contact">
            ${contactItems.join(' • ')}
          </div>
        </header>
      `;
    }

    // Render sections in order
    visibleSections.forEach(sectionId => {
      switch (sectionId) {
        case 'profile':
          if (show('profile')) {
            html += `
              <section class="compact-section">
                <h2 class="section-title">Profile</h2>
                <div class="compact-profile">${cvData.profile || ''}</div>
              </section>
            `;
          }
          break;

        case 'experience':
          if (show('experience')) {
            html += `<section class="compact-section"><h2 class="section-title">Experience</h2>`;
            (cvData.workExperience || []).forEach((job, index) => {
              if (index === 0) {
                // Full details for most recent position only
                const limitedResponsibilities = job.responsibilities?.slice(0, 4) || []; // Max 4 bullets
                html += `
                  <div class="compact-item">
                    <div class="item-header">
                      <div class="item-title">${job.title || ''}</div>
                      <div class="item-dates">${job.dates || ''}</div>
                    </div>
                    <div class="item-subtitle">${job.company || ''}</div>
                    ${job.description ? `<div class="item-description">${job.description}</div>` : ''}
                    ${limitedResponsibilities.length ? `
                      <ul class="compact-bullets">
                        ${limitedResponsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}
                      </ul>
                    ` : ''}
                  </div>
                `;
              } else if (index === 1) {
                // Medium details for second position
                const limitedResponsibilities = job.responsibilities?.slice(0, 3) || []; // Max 4 bullets
                html += `
                  <div class="compact-item">
                    <div class="item-header">
                      <div class="item-title">${job.title || ''}</div>
                      <div class="item-dates">${job.dates || ''}</div>
                    </div>
                    <div class="item-subtitle">${job.company || ''}</div>
                    ${limitedResponsibilities.length ? `
                      <ul class="compact-bullets">
                        ${limitedResponsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}
                      </ul>
                    ` : ''}
                  </div>
                `;
              } else if (index === 2) {
                const limitedResponsibilities = job.responsibilities?.slice(0, 2) || []; // Max 2 bullets
                html += `
                  <div class="compact-item">
                    <div class="item-header">
                      <div class="item-title">${job.title || ''}</div>
                      <div class="item-dates">${job.dates || ''}</div>
                    </div>
                    <div class="item-subtitle">${job.company || ''}</div>
                    ${limitedResponsibilities.length ? `
                      <ul class="compact-bullets">
                        ${limitedResponsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}
                      </ul>
                    ` : ''}
                  </div>
                `;
              } else if (index === 3) {
                const limitedResponsibilities = job.responsibilities?.slice(0, 1) || []; // Max 1 bullets
                html += `
                  <div class="compact-item">
                    <div class="item-header">
                      <div class="item-title">${job.title || ''}</div>
                      <div class="item-dates">${job.dates || ''}</div>
                    </div>
                    <div class="item-subtitle">${job.company || ''}</div>
                    ${limitedResponsibilities.length ? `
                      <ul class="compact-bullets">
                        ${limitedResponsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}
                      </ul>
                    ` : ''}
                  </div>
                `;
              } else if (index < 8) {
                // Title-only for positions 3-8
                html += `
                  <div class="compact-item-minimal">
                    <div class="item-header">
                      <div class="item-title">${job.title || ''}</div>
                      <div class="item-dates">${job.dates || ''}</div>
                    </div>
                    <div class="item-subtitle">${job.company || ''}</div>
                  </div>
                `;
              }
              // Skip positions beyond index 7 entirely to save space
            });
            html += `</section>`;
          }
          break;

        case 'education':
          if (show('education')) {
            const ed = cvData.education || {};
            const details = [ed.university, ed.dates, ed.grade].filter(Boolean);
            html += `
              <section class="compact-section">
                <h2 class="section-title">Education</h2>
                <div class="compact-education">
                  <span class="education-degree">${ed.degree || ''}</span>
                  ${details.length ? `<span class="education-details">${details.join(' • ')}</span>` : ''}
                </div>
              </section>
            `;
          }
          break;

        case 'projects':
          if (show('projects')) {
            html += `<section class="compact-section"><h2 class="section-title">Projects</h2>`;
            (cvData.personalProjects || []).forEach((project, index) => {
              const isRecent = index < 2; // Show full details for first 2 projects only
              
              if (isRecent) {
                // Full details for recent projects - limit to first 2 bullet points
                const limitedResponsibilities = project.responsibilities?.slice(0, 2) || [];
                html += `
                  <div class="compact-item">
                    <div class="project-header">
                      <div class="project-title">${project.title || ''}</div>
                      <div class="project-tech">${project.technologies || ''}</div>
                    </div>
                    ${limitedResponsibilities.length ? `
                      <ul class="project-bullets">
                        ${limitedResponsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}
                      </ul>
                    ` : ''}
                  </div>
                `;
              } else {
                // Title-only for older projects
                html += `
                  <div class="compact-item-minimal">
                    <div class="project-header">
                      <div class="project-title">${project.title || ''}</div>
                      <div class="project-tech">${project.technologies || ''}</div>
                    </div>
                  </div>
                `;
              }
            });
            html += `</section>`;
          }
          break;

        case 'certificates':
          if (show('certificates')) {
            html += `<section class="compact-section"><h2 class="section-title">Certificates</h2>`;
            (cvData.certificates || []).forEach(cert => {
              html += `
                <div class="compact-item">
                  <div class="cert-title">${cert.title || ''}</div>
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
              <section class="compact-section">
                <h2 class="section-title">Additional Training</h2>
                <div class="courses-content">${cvData.courses || ''}</div>
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