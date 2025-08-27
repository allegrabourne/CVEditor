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

    // Keep colours in print/PDF
    const colorAdjust = `
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `;

    // Use identical dimensions in preview & export
    const WIDTH = 800;
    const RADIUS = 10;
    const GUTTER = 18;
    const SIDEBAR = 260;

    // No export divergence—we keep the same look; exportTweaks only enforces width/centering (identical values)
    const exportTweaks = isExport ? `
      .cv-container {
        max-width: ${WIDTH}px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 24px !important;
      }
    ` : '';

    return `
      ${colorAdjust}

      .cv-container {
        text-align: initial;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size: 0.96em;
        line-height: 1.55;
        color: ${c.primaryText};
        background: ${c.background};
        padding: 24px;
        max-width: ${WIDTH}px;
        margin: 0 auto;
        border-radius: ${RADIUS}px;
        overflow: hidden;
      }

      /* Name header across full width */
      .cv-container .name-header {
        text-align: center;
        margin-bottom: ${GUTTER}px;
      }
      .cv-container .name-header h1 {
        margin: 0;
        font-size: 2.0em;
        letter-spacing: 0.5px;
        font-weight: 800;
        color: ${c.primaryText};
      }

      /* Two-column grid */
      .cv-container .layout {
        display: grid;
        grid-template-columns: ${SIDEBAR}px 1fr; /* fixed columns for parity */
        gap: ${GUTTER}px;
      }

      /* Sidebar card */
      .cv-container .sidebar {
        border: 1px solid ${c.borderColor};
        border-radius: ${RADIUS}px;
        background: ${c.cardBackground};
        padding: 14px 14px;
      }
      .cv-container .sidebar .sidebar-title {
        font-size: 0.95em;
        font-weight: 800;
        text-transform: uppercase;
        color: ${c.primaryText};
        border-bottom: 2px solid ${c.borderAccent};
        padding-bottom: 6px;
        margin-bottom: 10px;
      }
      .cv-container .sidebar .kv {
        margin-bottom: 10px;
      }
      .cv-container .sidebar .kv .label {
        display: block;
        font-size: 0.82em;
        text-transform: uppercase;
        color: ${c.mutedText};
        letter-spacing: 0.4px;
      }
      .cv-container .sidebar .kv .value {
        display: block;
        font-weight: 700;
        color: ${c.primaryText};
        margin-top: 2px;
        word-break: break-word;
      }

      /* Main column sections */
      .cv-container .main .section {
        border: 1px solid ${c.borderColor};
        border-radius: ${RADIUS}px;
        background: ${c.cardBackground};
        padding: 16px 18px;
        margin-bottom: ${GUTTER}px;
      }
      .cv-container .main .section-title {
        display: inline-block;
        font-size: 1.0em;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        color: ${c.primaryText};
        border-bottom: 2px solid ${c.borderAccent};
        padding-bottom: 6px;
        margin-bottom: 10px;
      }

      /* Items and text */
      .cv-container .item { margin-bottom: 14px; }
      .cv-container .item:last-child { margin-bottom: 0; }

      .cv-container .job-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: baseline;
        flex-wrap: wrap;
      }
      .cv-container .job-title {
        font-weight: 700;
        color: ${c.primaryText};
      }
      .cv-container .job-meta {
        color: ${c.mutedText};
        font-weight: 600;
      }
      .cv-container .description {
        margin-top: 6px;
        color: ${c.secondaryText};
        white-space: pre-line;
      }
      .cv-container ul.bullets {
        margin-top: 6px;
        margin-bottom: 0;
        padding-left: 18px;
      }
      .cv-container ul.bullets li {
        margin-bottom: 4px;
        color: ${c.secondaryText};
      }

      /* Simple list in sidebar (no bullets) */
      .cv-container .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .cv-container .sidebar li {
        margin: 6px 0;
        color: ${c.secondaryText};
      }

      ${exportTweaks}

      /* Print safety net (same dimensions) */
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

    // Name header (top)
    const name = pd.name || '';
    html += `
      <div class="name-header">
        <h1>${name}</h1>
      </div>
    `;

    // Layout grid (sidebar + main)
    html += `<div class="layout">`;

    // Sidebar: Personal Details
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

    // Main column
    html += `<main class="main">`;

    // Profile
    if (show('profile')) {
      html += `
        <section class="section">
          <div class="section-title">Professional Profile</div>
          <div class="description">${cvData.profile || ''}</div>
        </section>
      `;
    }

    // Experience
    if (show('experience')) {
      html += `<section class="section"><div class="section-title">Work Experience</div>`;
      (cvData.workExperience || []).forEach(j => {
        const left = j.title || '';
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

    // Projects (optional)
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

    // Education
    if (show('education')) {
      const ed = cvData.education || {};
      const meta = [ed.university, ed.dates, ed.grade].filter(Boolean).join(' • ');
      html += `
        <section class="section">
          <div class="section-title">Education</div>
          <div class="item">
            <div class="job-head">
              <div class="job-title">${ed.degree || ''}</div>
              <div class="job-meta">${meta}</div>
            </div>
          </div>
        </section>
      `;
    }

    // Certificates
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

    // Courses
    if (show('courses')) {
      html += `
        <section class="section">
          <div class="section-title">Courses & Qualifications</div>
          <div class="description">${cvData.courses || ''}</div>
        </section>
      `;
    }

    html += `</main></div></div>`;
    return html;
  }
}
