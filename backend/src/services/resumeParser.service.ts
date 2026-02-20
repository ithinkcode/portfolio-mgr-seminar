interface ParsedPortfolio {
  headline: string;
  summary: string;
  skills: Array<{ name: string; proficiency: number; category: string }>;
  experience: Array<{ company: string; role: string; startDate: string; endDate: string | null; highlights: string[] }>;
  education: Array<{ institution: string; degree: string; field: string; year: string; achievements: string[] }>;
  projects: Array<{ title: string; description: string; techStack: string[] }>;
  certifications: Array<{ name: string; issuer: string; year: string }>;
  languages: Array<{ language: string; proficiency: string }>;
  contact: { email?: string; linkedin?: string; github?: string; website?: string };
}

const SECTION_PATTERNS: Record<string, RegExp> = {
  experience: /^#{0,3}\s*(professional\s+)?experience|work\s*(history|experience)|employment/i,
  education: /^#{0,3}\s*education|academic/i,
  skills: /^#{0,3}\s*(technical\s+)?skills|technologies|competenc/i,
  projects: /^#{0,3}\s*projects|portfolio|personal\s+projects/i,
  certifications: /^#{0,3}\s*certifications?|licenses?|credentials/i,
  languages: /^#{0,3}\s*languages/i,
  summary: /^#{0,3}\s*(professional\s+)?summary|objective|profile|about(\s+me)?/i,
  contact: /^#{0,3}\s*contact(\s+info(rmation)?)?/i,
};

function identifySections(lines: string[]): Record<string, string[]> {
  const sections: Record<string, string[]> = {};
  let currentSection = 'header';
  sections[currentSection] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let matched = false;
    for (const [name, pattern] of Object.entries(SECTION_PATTERNS)) {
      if (pattern.test(trimmed)) {
        currentSection = name;
        sections[currentSection] = [];
        matched = true;
        break;
      }
    }

    if (!matched) {
      if (!sections[currentSection]) sections[currentSection] = [];
      sections[currentSection].push(trimmed);
    }
  }

  return sections;
}

function parseSkills(lines: string[]): ParsedPortfolio['skills'] {
  const skills: ParsedPortfolio['skills'] = [];
  for (const line of lines) {
    const items = line.split(/[,|;•·]/).map((s) => s.trim()).filter(Boolean);
    for (const item of items) {
      const cleaned = item.replace(/^[-*]\s*/, '').trim();
      if (cleaned && cleaned.length < 40) {
        skills.push({ name: cleaned, proficiency: 75, category: 'General' });
      }
    }
  }
  return skills;
}

function parseExperience(lines: string[]): ParsedPortfolio['experience'] {
  const entries: ParsedPortfolio['experience'] = [];
  let current: ParsedPortfolio['experience'][0] | null = null;

  const datePattern = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}\s*[-–—to]+\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}|Present|Current)/i;
  const yearPattern = /\d{4}\s*[-–—to]+\s*(?:\d{4}|Present|Current)/i;

  for (const line of lines) {
    const isBullet = /^[-*•]\s/.test(line);
    const hasDate = datePattern.test(line) || yearPattern.test(line);

    if (!isBullet && (hasDate || (!current && line.length < 100 && !line.startsWith(' ')))) {
      if (current) entries.push(current);

      const dateMatch = line.match(datePattern) || line.match(yearPattern);
      const parts = line.replace(dateMatch?.[0] || '', '').split(/[|@,]/).map((s) => s.trim()).filter(Boolean);

      current = {
        company: parts[1] || parts[0] || 'Unknown',
        role: parts[0] || 'Role',
        startDate: '2020-01',
        endDate: null,
        highlights: [],
      };

      if (dateMatch) {
        const dates = dateMatch[0].split(/[-–—]|to/i).map((d) => d.trim());
        if (dates[0]) {
          const yearM = dates[0].match(/\d{4}/);
          if (yearM) current.startDate = `${yearM[0]}-01`;
        }
        if (dates[1] && !/present|current/i.test(dates[1])) {
          const yearM = dates[1].match(/\d{4}/);
          if (yearM) current.endDate = `${yearM[0]}-01`;
        }
      }
    } else if (isBullet && current) {
      current.highlights.push(line.replace(/^[-*•]\s*/, '').trim());
    }
  }

  if (current) entries.push(current);
  return entries;
}

function parseEducation(lines: string[]): ParsedPortfolio['education'] {
  const entries: ParsedPortfolio['education'] = [];
  const degreePattern = /\b(B\.?S\.?|B\.?A\.?|M\.?S\.?|M\.?A\.?|M\.?B\.?A\.?|Ph\.?D\.?|Bachelor|Master|Doctor|Associate)/i;

  let current: ParsedPortfolio['education'][0] | null = null;

  for (const line of lines) {
    const hasDegree = degreePattern.test(line);
    const yearMatch = line.match(/\b(20\d{2}|19\d{2})\b/);
    const isBullet = /^[-*•]\s/.test(line);

    if (!isBullet && (hasDegree || yearMatch)) {
      if (current) entries.push(current);
      current = {
        institution: '',
        degree: '',
        field: '',
        year: yearMatch ? yearMatch[1] : '',
        achievements: [],
      };

      const degreeMatch = line.match(degreePattern);
      if (degreeMatch) {
        current.degree = degreeMatch[0];
        const parts = line.split(/[,|]/).map((s) => s.trim());
        current.institution = parts[0]?.replace(degreePattern, '').replace(yearMatch?.[0] || '', '').trim() || 'Institution';
        if (parts[1]) current.field = parts[1].replace(yearMatch?.[0] || '', '').trim();
      } else {
        current.institution = line.replace(yearMatch?.[0] || '', '').trim();
      }
    } else if (isBullet && current) {
      current.achievements.push(line.replace(/^[-*•]\s*/, '').trim());
    }
  }

  if (current) entries.push(current);
  return entries;
}

function parseContact(lines: string[], allText: string): ParsedPortfolio['contact'] {
  const contact: ParsedPortfolio['contact'] = {};
  const text = [...lines, allText].join(' ');

  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  if (emailMatch) contact.email = emailMatch[0];

  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/);
  if (linkedinMatch) contact.linkedin = `https://${linkedinMatch[0]}`;

  const githubMatch = text.match(/github\.com\/[\w-]+/);
  if (githubMatch) contact.github = `https://${githubMatch[0]}`;

  const websiteMatch = text.match(/https?:\/\/(?!(?:linkedin|github|twitter)\.com)[\w.-]+\.\w+[\w/]*/);
  if (websiteMatch) contact.website = websiteMatch[0];

  return contact;
}

export function parseResume(text: string): ParsedPortfolio {
  const lines = text.split('\n');
  const sections = identifySections(lines);

  const summaryLines = sections['summary'] || sections['header']?.slice(0, 5) || [];
  const summary = summaryLines.filter((l) => l.length > 20).slice(0, 3).join('\n');

  return {
    headline: sections['header']?.[0]?.substring(0, 80) || '',
    summary,
    skills: parseSkills(sections['skills'] || []),
    experience: parseExperience(sections['experience'] || []),
    education: parseEducation(sections['education'] || []),
    projects: [],
    certifications: [],
    languages: [],
    contact: parseContact(sections['contact'] || [], text),
  };
}
