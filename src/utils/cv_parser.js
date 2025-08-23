// src/utils/cv_parser.js
// Regexes & helpers

export const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
export const URL = /\bhttps?:\/\/[^\s]+|(?:www\.)[^\s]+\.[a-z]{2,}\b/i;

const UK_MOBILE = /\b(?:\+44\s?7\d{3}|\(0?7\d{3}\)|0?7\d{3})\s?\d{3}\s?\d{3}\b/;
const UK_LANDLINE = /\b(?:\+44\s?|\(0\)\s?|0)(?:1\d{3}|2\d{2}|3\d{2}|[58]\d{2})\s?\d{3}\s?\d{3,4}\b/;
export const PHONE = new RegExp(`${UK_MOBILE.source}|${UK_LANDLINE.source}`, 'i');

export const POSTCODE = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s?(\d[A-Z]{2})\b/i;
export const STREET_SUFFIX = /\b(street|st|road|rd|avenue|ave|lane|ln|close|cl|drive|dr|way|place|pl|court|ct|terrace|terr|crescent|cres|square|sq|gardens|gdns|hill|park|mews)\b/i;
export const HOUSE_NUM = /^[0-9]{1,4}[A-Z]?\s+/;

const DATE_RANGE = /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s+\d{4}\s*(?:–|-|to)\s*(?:present|\d{4})/i;
const YEAR_RANGE = /\b\d{4}\s*(?:–|-|to)\s*(?:present|\d{4})\b/i;
const BULLET = /^\s*(?:[-–•●]|(\d+\.))\s+/;

function normaliseWhitespace(s) {
  return (s ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}
function safeMatch(text, re) {
  try { const m = text.match(re); return m ? m[0] : ''; } catch { return ''; }
}
function linesFrom(text) {
  return (text ?? '')
    .toString()
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(l => (l ?? '').trim())
    .filter(Boolean);
}

export function isLikelyAddressLine(line) {
  const L = normaliseWhitespace(line);
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
    return parts.length >= 2 && parts.length <= 4 && parts.every(w => /^[A-Z][a-z'’-]+$/.test(w));
  };
  return head.find(looksLikeName) || '';
}

const SECTION_HEADERS = [
  { key: 'profile', re: /^\s*(profile|summary|professional summary)\s*$/i },
  { key: 'experience', re: /^\s*(work experience|experience|employment history)\s*$/i },
  { key: 'education', re: /^\s*(education|qualifications)\s*$/i },
  { key: 'projects', re: /^\s*(projects|personal projects)\s*$/i },
  { key: 'certs', re: /^\s*(certificates|certifications)\s*$/i },
  { key: 'courses', re: /^\s*(courses|training|additional courses)\s*$/i }
];

function indexSections(lines) {
  return lines.map((l, i) => {
    const hit = SECTION_HEADERS.find(h => h.re.test(l));
    return hit ? { i, key: hit.key } : null;
  }).filter(Boolean);
}

function sliceSection(lines, starts, key) {
  const entry = starts.find(s => s.key === key);
  if (!entry) return [];
  const pos = entry.i + 1;
  const next = starts.find(s => s.i > entry.i);
  return lines.slice(pos, next ? next.i : lines.length);
}

function parseProfile(lines) {
  return lines.join(' ').slice(0, 600);
}

function parseExperience(lines) {
  const items = [];
  let current = null;
  for (const line of lines) {
    if (DATE_RANGE.test(line) || YEAR_RANGE.test(line)) {
      if (current) items.push(current);
      current = { title: '', company: '', dates: safeMatch(line, DATE_RANGE) || safeMatch(line, YEAR_RANGE), description: '', responsibilities: [] };
    } else if (BULLET.test(line)) {
      if (!current) current = { title: '', company: '', dates: '', description: '', responsibilities: [] };
      current.responsibilities.push(line.replace(BULLET, '').trim());
    } else {
      if (!current) current = { title: line, company: '', dates: '', description: '', responsibilities: [] };
      else if (!current.description) current.description = line;
      else current.description += ' ' + line;
    }
  }
  if (current) items.push(current);
  return items;
}

function parseEducation(lines) {
  const text = lines.join(' ');
  return {
    degree: lines.find(l => /(BSc|MSc|PhD|Bachelor|Master|Degree)/i.test(l)) || '',
    university: lines.find(l => /(University|College|Institute|School)/i.test(l)) || '',
    dates: safeMatch(text, DATE_RANGE) || safeMatch(text, YEAR_RANGE),
    grade: lines.find(l => /(First|Second|Upper|Lower|Honours|Merit|Distinction)/i.test(l)) || ''
  };
}

function parseSimpleList(lines, type) {
  return lines.map(l => type === 'cert' ? { title: l, description: '' } : { title: l, technologies: '', responsibilities: [] });
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

      data.personalDetails.email = safeMatch(normalised, EMAIL);
      data.personalDetails.phone = safeMatch(normalised, PHONE);
      data.personalDetails.website = safeMatch(normalised, URL);
      data.personalDetails.address = extractAddressBlock(lines);
      data.personalDetails.name = guessName(lines);

      const starts = indexSections(lines);

      const profileLines = sliceSection(lines, starts, 'profile');
      if (profileLines.length) data.profile = parseProfile(profileLines);

      const expLines = sliceSection(lines, starts, 'experience');
      if (expLines.length) data.workExperience = parseExperience(expLines);

      const eduLines = sliceSection(lines, starts, 'education');
      if (eduLines.length) data.education = parseEducation(eduLines);

      const projLines = sliceSection(lines, starts, 'projects');
      if (projLines.length) data.personalProjects = parseSimpleList(projLines, 'proj');

      const certLines = sliceSection(lines, starts, 'certs');
      if (certLines.length) data.certificates = parseSimpleList(certLines, 'cert');

      const courseLines = sliceSection(lines, starts, 'courses');
      if (courseLines.length) data.courses = courseLines.join('; ');

      return { success: true, data, message: 'Parsed CV data.' };
    } catch (error) {
      return { success: true, data, message: 'Parsed with defaults due to error.', error };
    }
  }
};

export default CVParser;
