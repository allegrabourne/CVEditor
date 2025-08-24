// utils/cvParser.js - Enhanced CV parser with better job history parsing and improved project/certificate handling

export const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
export const URL = /\bhttps?:\/\/[^\s]+|(?:www\.)[^\s]+\.[a-z]{2,}\b/i;

const UK_MOBILE = /\b(?:\+44\s?7\d{3}|\(0?7\d{3}\)|0?7\d{3})\s?\d{3}\s?\d{3}\b/;
const UK_LANDLINE = /\b(?:\+44\s?|\(0\)\s?|0)(?:1\d{3}|2\d{2}|3\d{2}|[58]\d{2})\s?\d{3}\s?\d{3,4}\b/;
export const PHONE = new RegExp(`${UK_MOBILE.source}|${UK_LANDLINE.source}`, 'i');

export const POSTCODE = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s?(\d[A-Z]{2})\b/i;
export const STREET_SUFFIX = /\b(street|st|road|rd|avenue|ave|lane|ln|close|cl|drive|dr|way|place|pl|court|ct|terrace|terr|crescent|cres|square|sq|gardens|gdns|hill|park|mews)\b/i;
export const HOUSE_NUM = /^[0-9]{1,4}[A-Z]?\s+/;

// Enhanced date matching patterns
const MONTH_NAMES = '(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*';
const DATE_RANGE = new RegExp(`\\b${MONTH_NAMES}\\s+\\d{4}\\s*(?:–|-|to)\\s*(?:present|current|${MONTH_NAMES}\\s+\\d{4})`, 'i');
const YEAR_RANGE = /\b\d{4}\s*(?:–|-|to)\s*(?:present|current|\d{4})\b/i;
const SIMPLE_DATE = new RegExp(`\\b(?:${MONTH_NAMES}\\s+)?\\d{4}(?:\\s*-\\s*(?:${MONTH_NAMES}\\s+)?\\d{4})?\\b`, 'i');

// Job title patterns
const JOB_TITLE_INDICATORS = /\b(senior|lead|principal|manager|director|head|chief|specialist|engineer|developer|analyst|consultant|coordinator|supervisor|assistant|intern|trainee)\b/i;
const COMPANY_INDICATORS = /\b(ltd|limited|inc|incorporated|corp|corporation|llc|plc|group|company|co\.|&|and|solutions|services|systems|technologies|consulting)\b/i;

// Bullet point patterns
const BULLET = /^\s*(?:[-–—•◦▪▫]|(\d+\.)|([a-z]\.))\s+/;

// Section headers with priority scoring
const SECTION_HEADERS = [
  { key: 'profile', re: /^\s*(profile|summary|professional summary|about|overview|career summary|personal profile)\s*$/i, priority: 10 },
  { key: 'experience', re: /^\s*(work experience|experience|employment history|career history|professional experience|work|jobs)\s*$/i, priority: 10 },
  { key: 'education', re: /^\s*(education|qualifications|academic background|academic qualifications)\s*$/i, priority: 9 },
  { key: 'projects', re: /^\s*(projects|personal projects|portfolio|key projects)\s*$/i, priority: 8 },
  { key: 'certs', re: /^\s*(certificates|certifications|professional certifications)\s*$/i, priority: 7 },
  { key: 'courses', re: /^\s*(courses|training|additional courses|professional development|continuing education)\s*$/i, priority: 6 }
];

// Utility functions
function normalizeWhitespace(s) {
  return (s ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function safeMatch(text, re) {
  try { 
    const m = text.match(re); 
    return m ? m[0].trim() : ''; 
  } catch { 
    return ''; 
  }
}

function linesFrom(text) {
  return (text ?? '')
    .toString()
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(l => (l ?? '').trim())
    .filter(Boolean);
}

function isLikelyJobTitle(line) {
  const normalized = normalizeWhitespace(line).toLowerCase();
  return JOB_TITLE_INDICATORS.test(normalized) || 
         (line.length < 100 && !/[@.]/.test(line) && 
          line.split(' ').length <= 6 && line.split(' ').length >= 2);
}

function isLikelyCompany(line) {
  const normalized = normalizeWhitespace(line);
  return COMPANY_INDICATORS.test(normalized) || 
         (line.includes(',') && line.length < 120) ||
         (line.length < 100 && !BULLET.test(line) && !DATE_RANGE.test(line));
}

function isLikelyDate(line) {
  return DATE_RANGE.test(line) || YEAR_RANGE.test(line) || SIMPLE_DATE.test(line);
}

function isLikelyBulletPoint(line) {
  return BULLET.test(line);
}

export function isLikelyAddressLine(line) {
  const L = normalizeWhitespace(line);
  if (!L) return false;
  return POSTCODE.test(L) || (HOUSE_NUM.test(L) && STREET_SUFFIX.test(L));
}

export function extractAddressBlock(lines) {
  const idx = lines.findIndex((ln) => isLikelyAddressLine(ln));
  if (idx === -1) return '';
  
  const maxSpread = 3;
  let start = idx, end = idx;
  
  const looksAddressy = (ln) => POSTCODE.test(ln) || STREET_SUFFIX.test(ln) || /^[A-Za-z ,.'-]{2,40}$/.test(ln);
  
  for (let i = idx - 1; i >= 0 && start > idx - maxSpread; i--) {
    if (looksAddressy(lines[i])) start = i; else break;
  }
  for (let i = idx + 1; i < lines.length && end < idx + maxSpread; i++) {
    if (looksAddressy(lines[i])) end = i; else break;
  }
  
  return lines.slice(start, end + 1).join('\n');
}

export function guessName(lines) {
  const head = lines.slice(0, 5);
  const looksLikeName = (ln) => {
    if (!ln || /[@\d]/.test(ln) || ln.length > 60) return false;
    const parts = ln.split(/\s+/).filter(Boolean);
    return parts.length >= 2 && parts.length <= 4 && 
           parts.every(w => /^[A-Z][a-z''-]+$/.test(w));
  };
  return head.find(looksLikeName) || '';
}

function indexSections(lines) {
  const sections = [];
  
  lines.forEach((line, index) => {
    const normalizedLine = normalizeWhitespace(line);
    
    SECTION_HEADERS.forEach(header => {
      if (header.re.test(normalizedLine)) {
        sections.push({
          index,
          key: header.key,
          priority: header.priority,
          title: normalizedLine
        });
      }
    });
  });
  
  // Sort by priority and then by position in document
  return sections.sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority;
    return a.index - b.index;
  });
}

function sliceSection(lines, sections, key) {
  const section = sections.find(s => s.key === key);
  if (!section) return [];
  
  const startPos = section.index + 1;
  const nextSection = sections.find(s => s.index > section.index);
  const endPos = nextSection ? nextSection.index : lines.length;
  
  return lines.slice(startPos, endPos);
}

function parseProfile(lines) {
  return lines.join(' ').slice(0, 600);
}

function parseExperienceEnhanced(lines) {
  const jobs = [];
  let currentJob = null;
  let currentSection = null;
  
  lines.forEach((line, index) => {
    const normalizedLine = normalizeWhitespace(line);
    if (!normalizedLine) return;
    
    // Check if this looks like a date range - likely end of previous job
    if (isLikelyDate(normalizedLine)) {
      if (currentJob && !currentJob.dates) {
        currentJob.dates = safeMatch(normalizedLine, DATE_RANGE) || 
                          safeMatch(normalizedLine, YEAR_RANGE) || 
                          safeMatch(normalizedLine, SIMPLE_DATE);
      }
      currentSection = 'dates';
      return;
    }
    
    // Check for bullet points
    if (isLikelyBulletPoint(normalizedLine)) {
      if (!currentJob) {
        currentJob = { title: '', company: '', dates: '', description: '', responsibilities: [] };
      }
      const cleanedBullet = normalizedLine.replace(BULLET, '').trim();
      if (cleanedBullet) {
        currentJob.responsibilities.push(cleanedBullet);
      }
      currentSection = 'responsibilities';
      return;
    }
    
    // Check if this looks like a job title
    if (isLikelyJobTitle(normalizedLine) && currentSection !== 'responsibilities') {
      // Save previous job if exists
      if (currentJob && (currentJob.title || currentJob.company || currentJob.responsibilities.length > 0)) {
        jobs.push(currentJob);
      }
      
      // Start new job
      currentJob = {
        title: normalizedLine,
        company: '',
        dates: '',
        description: '',
        responsibilities: []
      };
      currentSection = 'title';
      return;
    }
    
    // Check if this looks like a company name
    if (isLikelyCompany(normalizedLine) && currentSection === 'title') {
      if (currentJob) {
        currentJob.company = normalizedLine;
        currentSection = 'company';
      }
      return;
    }
    
    // Handle other content based on current section
    if (currentJob) {
      if (currentSection === 'company' || currentSection === 'dates') {
        // This might be a company description
        if (normalizedLine.length > 30 && !isLikelyJobTitle(normalizedLine)) {
          if (currentJob.description) {
            currentJob.description += ' ' + normalizedLine;
          } else {
            currentJob.description = normalizedLine;
          }
          currentSection = 'description';
        }
      } else if (!currentSection || currentSection === 'description') {
        // Default to adding as description or responsibility
        if (normalizedLine.length < 200 && !currentJob.title) {
          currentJob.title = normalizedLine;
          currentSection = 'title';
        } else if (!currentJob.description && normalizedLine.length > 30) {
          currentJob.description = normalizedLine;
          currentSection = 'description';
        } else {
          // Add as responsibility if it's substantial content
          if (normalizedLine.length > 20) {
            currentJob.responsibilities.push(normalizedLine);
          }
        }
      }
    } else {
      // No current job - try to start one
      currentJob = {
        title: normalizedLine,
        company: '',
        dates: '',
        description: '',
        responsibilities: []
      };
      currentSection = 'title';
    }
  });
  
  // Don't forget the last job
  if (currentJob && (currentJob.title || currentJob.company || currentJob.responsibilities.length > 0)) {
    jobs.push(currentJob);
  }
  
  // Clean up jobs - ensure they have at least a title or company
  return jobs.filter(job => job.title.trim() || job.company.trim()).map(job => ({
    ...job,
    title: job.title.trim(),
    company: job.company.trim(),
    dates: job.dates.trim(),
    description: job.description.trim(),
    responsibilities: job.responsibilities.filter(r => r.trim()).map(r => r.trim())
  }));
}

function parseEducation(lines) {
  const text = lines.join(' ');
  return {
    degree: lines.find(l => /(BSc|MSc|PhD|Bachelor|Master|Degree|Diploma|Certificate)/i.test(l)) || '',
    university: lines.find(l => /(University|College|Institute|School)/i.test(l)) || '',
    dates: safeMatch(text, DATE_RANGE) || safeMatch(text, YEAR_RANGE) || safeMatch(text, SIMPLE_DATE),
    grade: lines.find(l => /(First|Second|Upper|Lower|Honours|Honor|Merit|Distinction|GPA|Grade)/i.test(l)) || ''
  };
}

// Enhanced parsing for projects and certificates that groups related lines
function parseProjectsEnhanced(lines) {
  const projects = [];
  let currentProject = null;
  let currentSection = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const isBullet = isLikelyBulletPoint(line);
    const hasTechnologies = /technologies?:/i.test(line);
    
    // If we find a non-bullet line that looks like a title and we're not already in a project
    if (!isBullet && !hasTechnologies && (!currentProject || currentSection === 'complete')) {
      // Save previous project if it exists
      if (currentProject && (currentProject.title || currentProject.responsibilities.length > 0)) {
        projects.push(currentProject);
      }
      
      // Start new project
      currentProject = {
        title: line,
        technologies: '',
        responsibilities: []
      };
      currentSection = 'title';
    } 
    // Handle technologies line
    else if (hasTechnologies) {
      if (currentProject) {
        currentProject.technologies = line.replace(/^technologies?:\s*/i, '').trim();
        currentSection = 'technologies';
      }
    }
    // Handle bullet points (project details)
    else if (isBullet) {
      if (!currentProject) {
        // If we don't have a current project, create one with empty title
        currentProject = {
          title: '',
          technologies: '',
          responsibilities: []
        };
      }
      
      const cleanedBullet = line.replace(BULLET, '').trim();
      if (cleanedBullet) {
        currentProject.responsibilities.push(cleanedBullet);
      }
      currentSection = 'responsibilities';
    }
    // Handle additional content that might be part of the current project
    else if (currentProject && currentSection !== 'complete') {
      // If it's not a title-looking line and we have a current project, add as responsibility
      if (line.length > 30) {
        currentProject.responsibilities.push(line);
      }
    }
  }
  
  // Don't forget the last project
  if (currentProject && (currentProject.title || currentProject.responsibilities.length > 0)) {
    projects.push(currentProject);
  }
  
  // Clean up projects
  return projects
    .filter(project => project.title.trim() || project.responsibilities.length > 0)
    .map(project => ({
      title: project.title.trim(),
      technologies: project.technologies.trim(),
      responsibilities: project.responsibilities.filter(r => r.trim()).map(r => r.trim())
    }));
}

function parseCertificatesEnhanced(lines) {
  const certificates = [];
  let currentCert = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const isBullet = isLikelyBulletPoint(line);
    
    // If it's not a bullet point, it's likely a certificate title
    if (!isBullet) {
      // Save previous certificate if it exists
      if (currentCert && currentCert.title) {
        certificates.push(currentCert);
      }
      
      // Start new certificate
      currentCert = {
        title: line,
        description: ''
      };
    } 
    // If it's descriptive text and we have a current certificate
    else if (currentCert) {
      const cleanedDescription = line.replace(BULLET, '').trim();
      if (cleanedDescription) {
        if (currentCert.description) {
          currentCert.description += ' ' + cleanedDescription;
        } else {
          currentCert.description = cleanedDescription;
        }
      }
    }
  }
  
  // Don't forget the last certificate
  if (currentCert && currentCert.title) {
    certificates.push(currentCert);
  }
  
  // Handle multi-line descriptions by looking ahead for non-title lines
  const refinedCertificates = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const isBullet = isLikelyBulletPoint(line);
    
    if (!isBullet && !line.startsWith(' ')) {
      // This looks like a title
      const cert = {
        title: line,
        description: ''
      };
      
      // Look ahead for description lines
      const descriptionLines = [];
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();
        if (!nextLine) continue;
        
        const nextIsBullet = isLikelyBulletPoint(nextLine);
        
        // If the next line looks like another title, stop
        if (!nextIsBullet && !nextLine.startsWith(' ') && 
            nextLine.length < 200 && 
            !(/(certificate|certification|program|course|training)/i.test(cert.title) && 
              /(A comprehensive|program|skills|including)/i.test(nextLine))) {
          break;
        }
        
        // Add this line as part of the description
        const cleanedLine = nextLine.replace(BULLET, '').trim();
        if (cleanedLine) {
          descriptionLines.push(cleanedLine);
        }
        i = j; // Skip ahead
      }
      
      cert.description = descriptionLines.join(' ');
      refinedCertificates.push(cert);
    }
  }
  
  // Return the refined certificates if we found any, otherwise fall back to simple parsing
  return refinedCertificates.length > 0 ? refinedCertificates : certificates;
}

export function makeDefaultCV() {
  return {
    personalDetails: { name: '', phone: '', address: '', email: '', website: '' },
    profile: '',
    education: { degree: '', university: '', dates: '', grade: '' },
    workExperience: [],
    personalProjects: [],
    certificates: [],
    courses: ''
  };
}

export const CVParser = {
  parseCV(text) {
    const data = makeDefaultCV();
    
    try {
      const raw = (text ?? '').toString();
      const lines = linesFrom(raw);
      const normalised = raw;

      // Extract contact information
      data.personalDetails.email = safeMatch(normalised, EMAIL);
      data.personalDetails.phone = safeMatch(normalised, PHONE);
      data.personalDetails.website = safeMatch(normalised, URL);
      data.personalDetails.address = extractAddressBlock(lines);
      data.personalDetails.name = guessName(lines);

      // Find and parse sections
      const sections = indexSections(lines);

      const profileLines = sliceSection(lines, sections, 'profile');
      if (profileLines.length) {
        data.profile = parseProfile(profileLines);
      }

      const expLines = sliceSection(lines, sections, 'experience');
      if (expLines.length) {
        data.workExperience = parseExperienceEnhanced(expLines);
      }

      const eduLines = sliceSection(lines, sections, 'education');
      if (eduLines.length) {
        data.education = parseEducation(eduLines);
      }

      const projLines = sliceSection(lines, sections, 'projects');
      if (projLines.length) {
        data.personalProjects = parseProjectsEnhanced(projLines);
      }

      const certLines = sliceSection(lines, sections, 'certs');
      if (certLines.length) {
        data.certificates = parseCertificatesEnhanced(certLines);
      }

      const courseLines = sliceSection(lines, sections, 'courses');
      if (courseLines.length) {
        data.courses = courseLines.join('; ');
      }

      return { 
        success: true, 
        data, 
        message: `Successfully parsed CV. Found ${data.workExperience.length} work experience entries, ${data.personalProjects.length} projects, ${data.certificates.length} certificates.`,
        debug: {
          sectionsFound: sections.map(s => ({ key: s.key, title: s.title })),
          linesProcessed: lines.length
        }
      };
    } catch (error) {
      console.error('CV parsing error:', error);
      return { 
        success: true, 
        data, 
        message: 'Parsed with defaults due to error.', 
        error: error.message 
      };
    }
  }
};

export default CVParser;