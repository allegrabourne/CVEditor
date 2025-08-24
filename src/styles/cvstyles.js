// styles/cvStyles.js - Complete enhanced CV styling with theme support

export const lightThemeCSS = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
    background: white;
    font-size: 12px;
  }
  .cv-container {
    background: white;
    color: #333;
  }
`;

export const darkThemeCSS = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: #e4e4e7;
    background: #18181b;
    font-size: 12px;
  }
  .cv-container {
    background: #18181b;
    color: #e4e4e7;
  }
  /* Dark theme overrides */
  .header h1 { color: #a5b4fc; }
  .personal-details {
    background: linear-gradient(135deg, rgba(165, 180, 252, 0.1), rgba(196, 181, 253, 0.1));
    border: 1px solid #374151;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  .personal-details h2 { 
    color: #a5b4fc;
    border-bottom: 1px solid #a5b4fc;
  }
  .contact-item strong { color: #a5b4fc; }
  .section h2 {
    color: #a5b4fc;
    border-bottom: 2px solid #a5b4fc;
    background: linear-gradient(90deg, rgba(165, 180, 252, 0.1), transparent);
  }
  .job::before {
    background: #a5b4fc;
    box-shadow: 0 0 0 3px #18181b, 0 0 0 6px #a5b4fc;
  }
  .job-title { color: #a5b4fc; }
  .company { color: #e4e4e7; }
  .dates { color: #9ca3af; }
  .company-description {
    color: #9ca3af;
    background: rgba(165, 180, 252, 0.08);
    border-left: 2px solid #a5b4fc;
  }
  .project::before {
    background: #c4b5fd;
    box-shadow: 0 0 0 3px #18181b, 0 0 0 6px #c4b5fd;
  }
  .technologies { color: #c4b5fd; }
  .certificate .job-title { color: #a5b4fc; }
`;

export const richStyledCSS = `
  .header {
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 30px;
    border-bottom: 2px solid #667eea;
  }
  .header h1 {
    font-size: 2em;
    margin: 0;
    color: #2c5aa0;
    font-weight: bold;
  }
  .personal-details {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 25px;
    border: 1px solid #e9ecef;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  .personal-details h2 {
    color: #2c5aa0;
    font-size: 1.2em;
    margin-top: 0;
    padding-bottom: 5px;
    border-bottom: 1px solid #667eea;
  }
  .contact-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .contact-item {
    margin: 2px 0;
    display: flex;
    align-items: center;
  }
  .contact-item strong {
    color: #2c5aa0;
    min-width: 70px;
  }
  .section {
    margin-bottom: 30px;
    position: relative;
  }
  .section h2 {
    color: #2c5aa0;
    font-size: 1.3em;
    padding-bottom: 8px;
    margin-bottom: 20px;
    border-bottom: 2px solid #667eea;
    background: linear-gradient(90deg, rgba(102, 126, 234, 0.1), transparent);
    padding-left: 10px;
    margin-left: -10px;
    border-radius: 5px 0 0 0;
  }
  .profile {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    padding: 25px;
    border-radius: 12px;
    font-size: 1.05em;
    line-height: 1.7;
    border-left: 4px solid #667eea;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  .job {
    margin-bottom: 25px;
    border-left: 4px solid #667eea;
    padding-left: 20px;
    position: relative;
    background: linear-gradient(90deg, rgba(102, 126, 234, 0.03), transparent);
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 0 8px 8px 0;
    margin-left: -5px;
    padding-left: 25px;
  }
  .job::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 15px;
    width: 8px;
    height: 8px;
    background: #667eea;
    border-radius: 50%;
    box-shadow: 0 0 0 3px white, 0 0 0 6px #667eea;
  }
  .job-title {
    font-size: 1.1em;
    font-weight: bold;
    color: #2c5aa0;
    margin-bottom: 5px;
  }
  .company {
    font-weight: bold;
    font-size: 1em;
    margin-bottom: 3px;
    color: #333;
  }
  .dates {
    font-style: italic;
    color: #666;
    margin-bottom: 8px;
    font-size: 0.95em;
  }
  .company-description {
    font-style: italic;
    color: #666;
    margin-bottom: 12px;
    background: rgba(102, 126, 234, 0.08);
    padding: 10px;
    border-radius: 6px;
    border-left: 2px solid #667eea;
  }
  .project {
    margin-bottom: 25px;
    border-left: 4px solid #764ba2;
    padding-left: 20px;
    position: relative;
    background: linear-gradient(90deg, rgba(118, 75, 162, 0.03), transparent);
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 0 8px 8px 0;
    margin-left: -5px;
    padding-left: 25px;
  }
  .project::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 15px;
    width: 8px;
    height: 8px;
    background: #764ba2;
    border-radius: 50%;
    box-shadow: 0 0 0 3px white, 0 0 0 6px #764ba2;
  }
  .technologies {
    font-style: italic;
    color: #764ba2;
    margin-bottom: 8px;
    font-size: 0.95em;
    font-weight: 500;
  }
  .certificate {
    margin-bottom: 20px;
    padding: 15px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }
  .certificate .job-title {
    color: #667eea;
    margin-bottom: 10px;
  }
  ul {
    margin: 0;
    padding-left: 18px;
  }
  li {
    margin-bottom: 6px;
    line-height: 1.6;
  }
`;

export const plainCSS = `
  .header h1 {
    font-size: 1.8em;
    margin: 0 0 20px 0;
    font-weight: bold;
    text-align: center;
  }
  .section h2 {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .job-title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .company {
    font-weight: bold;
    margin-bottom: 3px;
  }
  .dates {
    font-style: italic;
    margin-bottom: 8px;
  }
  .contact-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    margin-bottom: 15px;
  }
  .contact-item strong {
    font-weight: bold;
  }
  .personal-details h2 {
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 10px;
  }
  .job, .project {
    margin-bottom: 15px;
  }
  .company-description {
    font-style: italic;
    margin-bottom: 10px;
  }
  .technologies {
    font-style: italic;
    margin-bottom: 8px;
  }
  .certificate {
    margin-bottom: 15px;
  }
`;

export const printMediaCSS = `
  @media print {
    body { 
      font-size: 11px; 
      background: white !important;
      color: black !important;
    }
    .no-print { display: none; }
    .job::before { box-shadow: 0 0 0 3px white, 0 0 0 6px #667eea; }
    .project::before { box-shadow: 0 0 0 3px white, 0 0 0 6px #764ba2; }
    * { color-adjust: exact !important; }
  }
`;

export const generatePrintableHTML = (cvData, selectedStyle, theme = 'light', sectionOrder) => {
  const baseCSS = theme === 'dark' ? darkThemeCSS : lightThemeCSS;
  const styleCSS = selectedStyle === 'styled' ? richStyledCSS : plainCSS;
  const themeCSS = theme === 'dark' ? darkThemeCSS : '';

  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case 'personal':
        return `
          <div class="personal-details">
            <h2>CONTACT DETAILS</h2>
            <div class="contact-info">
              <div class="contact-item"><strong>Phone:</strong> ${cvData.personalDetails.phone}</div>
              <div class="contact-item"><strong>Address:</strong> ${cvData.personalDetails.address}</div>
              <div class="contact-item"><strong>Email:</strong> ${cvData.personalDetails.email}</div>
              <div class="contact-item"><strong>Website:</strong> ${cvData.personalDetails.website}</div>
            </div>
          </div>
        `;

      case 'profile':
        return cvData.profile ? `
          <div class="section">
            <h2>PROFILE</h2>
            <div class="profile">
              ${cvData.profile.split('\n').map(p => p.trim()).filter(p => p).join('<br><br>')}
            </div>
          </div>
        ` : '';

      case 'experience':
        return cvData.workExperience.length > 0 ? `
          <div class="section">
            <h2>WORK EXPERIENCE</h2>
            ${cvData.workExperience.map(job => `
              <div class="job">
                <div class="job-title">${job.title}</div>
                <div class="company">${job.company}</div>
                <div class="dates">${job.dates}</div>
                ${job.description ? `<div class="company-description">${job.description}</div>` : ''}
                ${job.responsibilities.length > 0 ? `
                  <ul>
                    ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : '';

      case 'projects':
        return cvData.personalProjects.length > 0 ? `
          <div class="section">
            <h2>PERSONAL PROJECTS</h2>
            ${cvData.personalProjects.map(project => `
              <div class="project">
                <div class="job-title">${project.title}</div>
                <div class="technologies">Technologies: ${project.technologies}</div>
                ${project.responsibilities.length > 0 ? `
                  <ul>
                    ${project.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : '';

      case 'certificates':
        return cvData.certificates.length > 0 ? `
          <div class="section">
            <h2>CERTIFICATES</h2>
            ${cvData.certificates.map(cert => `
              <div class="certificate">
                <div class="job-title">${cert.title}</div>
                <p>${cert.description}</p>
              </div>
            `).join('')}
          </div>
        ` : '';

      case 'education':
        return (cvData.education.degree || cvData.education.university) ? `
          <div class="section">
            <h2>EDUCATION</h2>
            <div class="job">
              <div class="job-title">${cvData.education.degree}</div>
              <div class="company">${cvData.education.university}</div>
              <div class="dates">${cvData.education.dates}</div>
              <p>${cvData.education.grade}</p>
            </div>
          </div>
        ` : '';

      case 'courses':
        return cvData.courses ? `
          <div class="section">
            <h2>ADDITIONAL COURSES</h2>
            <p>${cvData.courses}</p>
          </div>
        ` : '';

      default:
        return '';
    }
  };

  const sectionsToRender = sectionOrder || [
    'personal', 'profile', 'experience', 
    'projects', 'certificates', 'education', 'courses'
  ];

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${cvData.personalDetails.name} - CV</title>
        <style>
          ${baseCSS}
          ${styleCSS}
          ${themeCSS}
          ${printMediaCSS}
        </style>
      </head>
      <body>
        <div class="cv-container">
          <div class="header">
            <h1>${cvData.personalDetails.name}</h1>
          </div>
          
          ${sectionsToRender.map(sectionId => renderSectionContent(sectionId)).join('')}
        </div>
      </body>
    </html>
  `;
};