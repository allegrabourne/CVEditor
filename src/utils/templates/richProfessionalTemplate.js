// utils/templates/richProfessionalTemplate.js
import { CVTemplate } from './cvTemplate.js';

export class RichProfessionalTemplate extends CVTemplate {
  constructor() {
    super(
      'rich-professional',
      'Rich Professional',
      'Professional classic two-column layout with sidebar for personal details'
    );
  }

  generateStyles(theme, isExport = false) {
    const c = this.getColorScheme(theme, isExport);

    // Dimensions / rhythm
    const WIDTH   = 800;
    const RADIUS  = 10;
    const GUTTER  = 14;  
    const SIDEBAR = 220;
    const BASE_FS = 0.92; // down a touch from ~0.96

    const colorAdjust = `
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `;

    // No visual changes for export—just enforce same width/centering.
    const exportTweaks = isExport ? `
      .cv-container {
        max-width: ${WIDTH}px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 22px !important; /* slightly tighter padding */
      }
    ` : '';

    return `
      ${colorAdjust}

      .cv-container {
        text-align: initial;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size: ${BASE_FS}em;
        line-height: 1.5;                     /* a touch tighter */
        color: ${c.primaryText};
        background: ${c.background};
        padding: 22px;                        /* a touch tighter */
        max-width: ${WIDTH}px;
        margin: 0 auto;
        border-radius: ${RADIUS}px;
        overflow: hidden;
      }

      /* Name header */
      .cv-container .name-header {
        text-align: center;
        margin-bottom: ${GUTTER}px;
      }
      .cv-container .name-header h1 {
        margin: 0;
        font-size: 1.9em;                     /* slightly smaller */
        letter-spacing: 0.4px;
        font-weight: 800;
        color: ${c.primaryText};
      }

      /* Two-column grid */
      .cv-container .layout {
        display: grid;
        grid-template-columns: ${SIDEBAR}px 1fr;
        gap: ${GUTTER}px;
      }

      /* Sidebar */
      .cv-container .sidebar {
        border: 1px solid ${c.borderColor};
        border-radius: ${RADIUS}px;
        background: ${c.cardBackground};
        padding: 12px 12px;                   /* tighter */
      }
      .cv-container .sidebar .sidebar-title {
        font-size: 0.92em;                    /* smaller title */
        font-weight: 800;
        text-transform: uppercase;
        color: ${c.primaryText};
        border-bottom: 2px solid ${c.borderAccent};
        padding-bottom: 6px;
        margin-bottom: 8px;
      }
      .cv-container .sidebar .kv { margin-bottom: 8px; }
      .cv-container .sidebar .kv .label {
        display: block;
        font-size: 0.78em;                    /* smaller label */
        text-transform: uppercase;
        color: ${c.mutedText};
        letter-spacing: 0.35px;
      }
      .cv-container .sidebar .kv .value {
        display: block;
        font-weight: 700;
        color: ${c.primaryText};
        margin-top: 2px;
        word-break: break-word;
      }
      .cv-container .sidebar ul { list-style: none; padding: 0; margin: 0; }
      .cv-container .sidebar li { margin: 5px 0; color: ${c.secondaryText}; }

      /* Main sections */
      .cv-container .main .section {
        border: 1px solid ${c.borderColor};
        border-radius: ${RADIUS}px;
        background: ${c.cardBackground};
        padding: 14px 16px;                   /* tighter */
        margin-bottom: ${GUTTER}px;
      }
      .cv-container .main .section-title {
        display: inline-block;
        font-size: 0.98em;                    /* tighter */
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.28px;
        color: ${c.primaryText};
        border-bottom: 2px solid ${c.borderAccent};
        padding-bottom: 5px;
        margin-bottom: 8px;
      }

      /* Work Experience: extra-tight rhythm */
      .cv-container .section-experience .item { margin-bottom: 30px; }
      .cv-container .section-experience .job-head {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: baseline;
        flex-wrap: wrap;
      }
      .cv-container .section-experience .job-title {
        font-weight: 700;
        color: ${c.primaryText};
      }
      .cv-container .section-experience .job-meta {
        color: ${c.mutedText};
        font-weight: 600;
        font-size: 0.92em;                    /* slightly smaller meta */
      }
      .cv-container .section-experience .description {
        margin-top: 4px;                      /* tighter */
        color: ${c.secondaryText};
        white-space: pre-line;
      }
      .cv-container .section-experience ul.bullets {
        margin-top: 4px;                      /* tighter */
        margin-bottom: 0;
        padding-left: 16px;                   /* smaller indent */
      }
      .cv-container .section-experience ul.bullets li {
        margin-bottom: 2px;                   /* tighter */
        color: ${c.secondaryText};
      }

      /* Generic items (non-experience) */
      .cv-container .item { margin-bottom: 12px; }
      .cv-container .item:last-child { margin-bottom: 0; }

      .cv-container .job-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: baseline;
        flex-wrap: wrap;
      }
      .cv-container .job-title { font-weight: 700; color: ${c.primaryText}; }
      .cv-container .job-meta { color: ${c.mutedText}; font-weight: 600; }
      .cv-container .description { margin-top: 6px; color: ${c.secondaryText}; white-space: pre-line; }

      .cv-container ul.bullets { margin-top: 6px; margin-bottom: 0; padding-left: 18px; }
      .cv-container ul.bullets li { margin-bottom: 4px; color: ${c.secondaryText}; }

      ${exportTweaks}

      @media print {
        .cv-container {
          max-width: ${WIDTH}px !important;
          margin: 0 auto !important;
        }
      }
    `;
  }

  generateBody(cvData, visibleSections) {
    const pd = cvData.personalDetails || {};
    const show = s => this.shouldRenderSection(s, visibleSections, cvData);
    let html = `<div class="cv-container">`;

    // Name header
    html += `
      <div class="name-header">
        <h1>${pd.name || ''}</h1>
      </div>
    `;

    // Layout
    html += `<div class="layout">`;

    // Sidebar
    html += `<aside class="sidebar">`;
    if (show('personal')) {
      html += `<div class="sidebar-title">Personal Details</div>`;
      const rows = [
        ['Name', pd.name],
        ['Address', pd.address],
        ['Phone', pd.phone],
        ['Email', pd.email],
        ['Website', pd.website],
      ].filter(([, v]) => v);
      rows.forEach(([label, value]) => {
        html += `
          <div class="kv">
            <span class="label">${label}</span>
            <span class="value">${value}</span>
          </div>
        `;
      });
    }
    html += `</aside>`;

    // Main content - now responsive to section ordering
    html += `<main class="main">`;

    // Render sections in the order specified by visibleSections array
    visibleSections.forEach(sectionId => {
      switch (sectionId) {
        case 'profile':
          if (show('profile')) {
            html += `
              <section class="section">
                <div class="section-title">Professional Profile</div>
                <div class="description">${cvData.profile || ''}</div>
              </section>
            `;
          }
          break;

        case 'experience':
          if (show('experience')) {
            html += `<section class="section section-experience"><div class="section-title">Work Experience</div>`;
            (cvData.workExperience || []).forEach(j => {
              const left  = j.title || '';
              const right = [j.company, j.dates].filter(Boolean).join(' • ');
              html += `
                <div class="item">
                  <div class="job-head">
                    <div class="job-title">${left}</div>
                    <div class="job-meta">${right}</div>
                  </div>
                  ${j.description ? `<div class="description">${j.description}</div>` : ''}
                  ${(j.responsibilities && j.responsibilities.length)
                    ? `<ul class="bullets">${j.responsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}</ul>`
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
            html += `<section class="section"><div class="section-title">Personal Projects</div>`;
            (cvData.personalProjects || []).forEach(p => {
              html += `
                <div class="item">
                  <div class="job-head">
                    <div class="job-title">${p.title || ''}</div>
                    <div class="job-meta">${p.technologies || ''}</div>
                  </div>
                  ${(p.responsibilities && p.responsibilities.length)
                    ? `<ul class="bullets">${p.responsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}</ul>`
                    : ''
                  }
                </div>
              `;
            });
            html += `</section>`;
          }
          break;

          case 'education':
            if (show('education')) {
              html += `<section class="section"><div class="section-title">Education</div>`;
              (cvData.education || []).forEach(ed => {
                const meta = [ed.university, ed.dates, ed.grade].filter(Boolean).join(' • ');
                html += `
                  <div class="item">
                    <div class="job-head">
                      <div class="job-title">${ed.degree || ''}</div>
                      <div class="job-meta">${meta}</div>
                    </div>
                  </div>
                `;
              });
              html += `</section>`;
            }
            break;
            
        case 'certificates':
          if (show('certificates')) {
            html += `<section class="section"><div class="section-title">Certificates</div>`;
            (cvData.certificates || []).forEach(cert => {
              html += `
                <div class="item">
                  <div class="job-title">${cert.title || ''}</div>
                  ${cert.description ? `<div class="description">${cert.description}</div>` : ''}
                </div>
              `;
            });
            html += `</section>`;
          }
          break;

        case 'courses':
          if (show('courses')) {
            html += `
              <section class="section">
                <div class="section-title">Courses & Qualifications</div>
                <div class="description">${cvData.courses || ''}</div>
              </section>
            `;
          }
          break;
      }
    });

    html += `</main></div></div>`;
    return html;
  }
}