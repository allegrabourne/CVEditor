// utils/templates/richProfessionalTemplate.js
import { CVTemplate } from './cvTemplate.js';

export class RichProfessionalTemplate extends CVTemplate {
  constructor() {
    super('rich-professional', 'Rich Professional', 'Polished, modern layout with strong accents');
  }

  generateStyles(theme, isExport = false) {
    const c = this.getColorScheme(theme, isExport);
    const RADIUS = 14; // single source of truth

    // Encourage browsers/print to keep background colours & gradients
    const colorAdjust = `
      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `;

    // Export-only tweaks (keep visuals the same; drop fragile blur only)
    const exportTweaks = isExport ? `
      .cv-container {
        max-width: 800px !important;   /* match preview exactly */
        width: 100% !important;
        margin: 0 auto !important;
        padding: 24px !important;
        /* keep same background, shadows, radius as preview */
      }
      /* drop blur for PDF reliability (both markups) */
      .cv-container .contact .chip,
      .cv-container .contact-info .contact-item {
        backdrop-filter: none !important;
        background: #eef2ff !important;      /* soft indigo */
        color: #1f2937 !important;           /* slate-800 */
        border: 1px solid #c7d2fe !important;/* indigo-200 */
      }
    ` : '';

    return `
      ${colorAdjust}

      /* Root container */
      .cv-container {
        font-size: 0.95em;
        text-align: initial; /* fence off app-level alignments */
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        line-height: 1.55;
        color: ${c.primaryText};
        background: ${c.background};
        padding: 24px;
        max-width: 800px;
        margin: 0 auto;
        border-radius: ${RADIUS}px;
        overflow: hidden;
      }

      /* Header wrapper card (with border) */
      .cv-container .header {
        border-radius: ${RADIUS}px;
        overflow: hidden;
        margin-bottom: 24px;
        border: 1px solid ${c.borderColor};
        background: ${c.cardBackground};
      }

      /* Gradient header bar — support BOTH markups */
      /* New style: .header-bar */
      .cv-container .header-bar {
        background: linear-gradient(135deg, ${c.accentGradientStart}, ${c.accentGradientEnd});
        padding: 18px 20px;
        color: #fff;
        text-align: center;
      }
      .cv-container .header-bar h1 {
        margin: 0;
        font-size: 1.8em;
        font-weight: 800;
        letter-spacing: .2px;
   
        text-shadow: 0 1px 2px rgba(0,0,0,.20);
        display: inline-block;
      }

      /* Old style (no .header-bar): style .header directly */
      .cv-container .header > h1 {
        background: linear-gradient(135deg, ${c.accentGradientStart}, ${c.accentGradientEnd});
        -webkit-background-clip: text;
        background-clip: text;
        display: block;
        text-align: center;
        margin: 18px 20px 0 20px;
        font-size: 1.8em;
        font-weight: 800;
        letter-spacing: .2px;
        text-shadow: 0 1px 2px rgba(0,0,0,.10);
      }

      /* Contact row — support BOTH markups */
      .cv-container .contact,
      .cv-container .contact-info {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px 10px;
        padding: 14px 20px 18px;
      }

      /* Contact chips — BOTH markups */
      .cv-container .contact .chip,
      .cv-container .contact-info .contact-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,.35);
        background: rgba(255,255,255,.18);
        backdrop-filter: blur(10px); /* pretty in preview; disabled in exportTweaks */
        font-weight: 600;
      }

      /* Sections */
      .cv-container .section {
        border: 1px solid ${c.borderColor};
        border-radius: ${RADIUS}px;
        padding: 18px 20px;
        margin-bottom: 18px;
        background: ${c.cardBackground};
      }
      .cv-container .section-title {
        display: inline-block;
        font-size: 1.00em;
        font-weight: 800;
        letter-spacing: .3px;
        text-transform: uppercase;
        color: ${c.primaryText};
        border-bottom: 2px solid ${c.borderAccent};
        padding-bottom: 6px;
        margin-bottom: 12px;
      }

      /* Items & text */
      .cv-container .item { margin-bottom: 30px; }
      .cv-container .item:last-child { margin-bottom: 0; }
      .cv-container .job-title,
      .cv-container .project-title,
      .cv-container .certificate-title,
      .cv-container .degree {
        font-weight: 700; color: ${c.primaryText};
      }
      .cv-container .meta {
        color: ${c.mutedText}; font-weight: 600; margin-top: 2px;
      }
      .cv-container .description {
        margin-top: 6px; color: ${c.secondaryText}; white-space: pre-line;
      }
      .cv-container ul.bullets { margin-top: 6px; margin-bottom: 0; padding-left: 20px; }
      .cv-container ul.bullets li { margin-bottom: 4px; color: ${c.secondaryText}; }

      ${exportTweaks}

      /* Safety net for print paths that honour @media print */
      @media print {
        .cv-container {
          max-width: 800px !important;
          margin: 0 auto !important;
          border-radius: ${RADIUS}px !important;
        }
        .cv-container .header,
        .cv-container .section {
          border-radius: ${RADIUS}px !important;
        }
      }
    `;
  }

  generateBody(cvData, visibleSections) {
    const pd = cvData.personalDetails || {};
    let html = `<div class="cv-container">`;

    // Header (use .header-bar + contact-info for maximum compat)
    if (this.shouldRenderSection('personal', visibleSections, cvData)) {
      html += `
        <div class="header">
          <div class="header-bar">
            <h1>${pd.name || ''}</h1>
          </div>
          <div class="contact-info">
            ${pd.phone   ? `<span class="contact-item">📱 ${pd.phone}</span>`   : ''}
            ${pd.email   ? `<span class="contact-item">✉️ ${pd.email}</span>`   : ''}
            ${pd.website ? `<span class="contact-item">🌐 ${pd.website}</span>` : ''}
            ${pd.address ? `<span class="contact-item">📍 ${pd.address}</span>` : ''}
          </div>
        </div>
      `;
    }

    // Profile
    if (this.shouldRenderSection('profile', visibleSections, cvData)) {
      html += `
        <div class="section">
          <div class="section-title">Professional Profile</div>
          <div class="description">${cvData.profile || ''}</div>
        </div>
      `;
    }

    // Experience
    if (this.shouldRenderSection('experience', visibleSections, cvData)) {
      html += `<div class="section"><div class="section-title">Work Experience</div>`;
      (cvData.workExperience || []).forEach(j => {
        html += `
          <div class="item">
            <div class="job-title">${j.title || ''}</div>
            <div class="meta">${[j.company, j.dates].filter(Boolean).join(' • ')}</div>
            ${j.description ? `<div class="description">${j.description}</div>` : ''}
            ${(j.responsibilities && j.responsibilities.length)
              ? `<ul class="bullets">${j.responsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}</ul>`
              : ''
            }
          </div>
        `;
      });
      html += `</div>`;
    }

    // Projects
    if (this.shouldRenderSection('projects', visibleSections, cvData)) {
      html += `<div class="section"><div class="section-title">Personal Projects</div>`;
      (cvData.personalProjects || []).forEach(p => {
        html += `
          <div class="item">
            <div class="project-title">${p.title || ''}</div>
            <div class="meta">${p.technologies || ''}</div>
            ${(p.responsibilities && p.responsibilities.length)
              ? `<ul class="bullets">${p.responsibilities.map(r => r?.trim() ? `<li>${r}</li>` : '').join('')}</ul>`
              : ''
            }
          </div>
        `;
      });
      html += `</div>`;
    }

    // Education
    if (this.shouldRenderSection('education', visibleSections, cvData)) {
      const ed = cvData.education || {};
      html += `
        <div class="section">
          <div class="section-title">Education</div>
          <div class="item">
            <div class="degree">${ed.degree || ''}</div>
            <div class="meta">${[ed.university, ed.dates, ed.grade].filter(Boolean).join(' • ')}</div>
          </div>
        </div>
      `;
    }

    // Certificates
    if (this.shouldRenderSection('certificates', visibleSections, cvData)) {
      html += `<div class="section"><div class="section-title">Certificates</div>`;
      (cvData.certificates || []).forEach(cert => {
        html += `
          <div class="item">
            <div class="certificate-title">${cert.title || ''}</div>
            ${cert.description ? `<div class="description">${cert.description}</div>` : ''}
          </div>
        `;
      });
      html += `</div>`;
    }

    // Courses
    if (this.shouldRenderSection('courses', visibleSections, cvData)) {
      html += `
        <div class="section">
          <div class="section-title">Additional Courses</div>
          <div class="description">${cvData.courses || ''}</div>
        </div>
      `;
    }

    html += `</div>`;
    return html;
  }
}
