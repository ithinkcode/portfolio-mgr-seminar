interface Skill {
  name: string;
  proficiency: number;
  category: string;
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  achievements?: string[];
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface Language {
  language: string;
  proficiency: string;
}

interface Contact {
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

interface PortfolioData {
  headline: string;
  summary: string;
  photoBase64?: string | null;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  contact: Contact;
  theme: string;
}

interface UserData {
  firstName: string;
  lastName: string;
}

const themes = {
  obsidian: {
    sidebarBg: '#1a1a2e',
    sidebarText: '#e0e0e0',
    accent: '#e6b54a',
    mainBg: '#ffffff',
    mainText: '#2d2d2d',
    headingColor: '#1a1a2e',
    subText: '#666666',
    borderColor: '#e6b54a',
  },
  arctic: {
    sidebarBg: '#e8f4f8',
    sidebarText: '#2c3e50',
    accent: '#4da8da',
    mainBg: '#ffffff',
    mainText: '#333333',
    headingColor: '#2c3e50',
    subText: '#666666',
    borderColor: '#4da8da',
  },
  ember: {
    sidebarBg: '#8b2635',
    sidebarText: '#faf5ef',
    accent: '#c46a4a',
    mainBg: '#faf5ef',
    mainText: '#3d2c2c',
    headingColor: '#8b2635',
    subText: '#6b5555',
    borderColor: '#c46a4a',
  },
};

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return month ? `${months[parseInt(month, 10) - 1]} ${year}` : year;
}

function getInitials(first: string, last: string): string {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

function renderSkills(skills: Skill[], t: typeof themes.obsidian): string {
  const categories = [...new Set(skills.map((s) => s.category))];
  return categories
    .map(
      (cat) => `
      <div style="margin-bottom: 14px;">
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: ${t.accent}; margin-bottom: 8px;">${cat}</div>
        ${skills
          .filter((s) => s.category === cat)
          .map(
            (s) => `
          <div style="margin-bottom: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
              <span>${s.name}</span>
              <span style="color: ${t.accent};">${s.proficiency}%</span>
            </div>
            <div style="background: rgba(255,255,255,0.15); border-radius: 3px; height: 5px; overflow: hidden;">
              <div style="background: ${t.accent}; width: ${s.proficiency}%; height: 100%; border-radius: 3px;"></div>
            </div>
          </div>`
          )
          .join('')}
      </div>`
    )
    .join('');
}

function renderExperience(experience: Experience[], t: typeof themes.obsidian): string {
  return experience
    .map(
      (exp) => `
    <div style="margin-bottom: 20px; page-break-inside: avoid; position: relative; padding-left: 20px;">
      <div style="position: absolute; left: 0; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: ${t.accent};"></div>
      <div style="position: absolute; left: 4px; top: 18px; width: 2px; height: calc(100% - 18px); background: ${t.borderColor}; opacity: 0.3;"></div>
      <div style="font-size: 14px; font-weight: 700; color: ${t.headingColor}; font-family: 'Playfair Display', serif;">${exp.role}</div>
      <div style="font-size: 12px; color: ${t.accent}; font-weight: 600; margin-top: 2px;">${exp.company}</div>
      <div style="font-size: 10px; color: ${t.subText}; margin-top: 2px;">${formatDate(exp.startDate)} — ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>
      <ul style="margin: 8px 0 0 0; padding-left: 16px; font-size: 11px; color: ${t.mainText}; line-height: 1.6;">
        ${exp.highlights.map((h) => `<li style="margin-bottom: 3px;">${h}</li>`).join('')}
      </ul>
    </div>`
    )
    .join('');
}

function renderEducation(education: Education[], t: typeof themes.obsidian): string {
  return education
    .map(
      (edu) => `
    <div style="margin-bottom: 16px; page-break-inside: avoid;">
      <div style="font-size: 14px; font-weight: 700; color: ${t.headingColor}; font-family: 'Playfair Display', serif;">${edu.institution}</div>
      <div style="font-size: 12px; color: ${t.mainText}; margin-top: 2px;">${edu.degree} in ${edu.field}</div>
      <div style="font-size: 10px; color: ${t.subText};">Class of ${edu.year}</div>
      ${
        edu.achievements && edu.achievements.length > 0
          ? `<ul style="margin: 6px 0 0 0; padding-left: 16px; font-size: 11px; color: ${t.mainText};">
          ${edu.achievements.map((a) => `<li>${a}</li>`).join('')}
        </ul>`
          : ''
      }
    </div>`
    )
    .join('');
}

function renderProjects(projects: Project[], t: typeof themes.obsidian): string {
  return projects
    .map(
      (proj) => `
    <div style="margin-bottom: 16px; page-break-inside: avoid; padding: 12px; background: rgba(0,0,0,0.02); border-radius: 6px; border-left: 3px solid ${t.accent};">
      <div style="font-size: 14px; font-weight: 700; color: ${t.headingColor}; font-family: 'Playfair Display', serif;">${proj.title}</div>
      <div style="font-size: 11px; color: ${t.mainText}; margin-top: 4px; line-height: 1.5;">${proj.description}</div>
      <div style="margin-top: 6px; display: flex; flex-wrap: wrap; gap: 4px;">
        ${proj.techStack.map((tech) => `<span style="font-size: 9px; padding: 2px 8px; background: ${t.accent}22; color: ${t.accent}; border-radius: 10px;">${tech}</span>`).join('')}
      </div>
      ${proj.liveUrl || proj.repoUrl ? `<div style="margin-top: 6px; font-size: 10px; color: ${t.accent};">${proj.liveUrl ? `Live: ${proj.liveUrl}` : ''} ${proj.repoUrl ? `Repo: ${proj.repoUrl}` : ''}</div>` : ''}
    </div>`
    )
    .join('');
}

function renderCertifications(certs: Certification[], t: typeof themes.obsidian): string {
  if (!certs.length) return '';
  return `
    <div style="margin-bottom: 16px;">
      ${certs
        .map(
          (c) => `
        <div style="margin-bottom: 8px; font-size: 11px;">
          <div style="font-weight: 600; color: ${t.headingColor};">${c.name}</div>
          <div style="color: ${t.subText};">${c.issuer} — ${c.year}</div>
        </div>`
        )
        .join('')}
    </div>`;
}

function renderContactSidebar(contact: Contact, t: typeof themes.obsidian): string {
  const items: string[] = [];
  if (contact.email) items.push(`<div style="margin-bottom: 6px; word-break: break-all;">✉ ${contact.email}</div>`);
  if (contact.linkedin) items.push(`<div style="margin-bottom: 6px; word-break: break-all;">in ${contact.linkedin.replace('https://linkedin.com/in/', '')}</div>`);
  if (contact.github) items.push(`<div style="margin-bottom: 6px; word-break: break-all;">⌘ ${contact.github.replace('https://github.com/', '')}</div>`);
  if (contact.website) items.push(`<div style="margin-bottom: 6px; word-break: break-all;">🌐 ${contact.website}</div>`);
  if (contact.twitter) items.push(`<div style="margin-bottom: 6px; word-break: break-all;">𝕏 ${contact.twitter.replace('https://twitter.com/', '@')}</div>`);
  return items.join('');
}

function renderLanguages(languages: Language[], t: typeof themes.obsidian): string {
  if (!languages.length) return '';
  return languages
    .map(
      (l) => `
    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
      <span>${l.language}</span>
      <span style="color: ${t.accent}; font-size: 10px;">${l.proficiency}</span>
    </div>`
    )
    .join('');
}

export function generatePortfolioHtml(portfolio: PortfolioData, user: UserData): string {
  const themeName = (portfolio.theme || 'obsidian') as keyof typeof themes;
  const t = themes[themeName] || themes.obsidian;
  const initials = getInitials(user.firstName, user.lastName);
  const fullName = `${user.firstName} ${user.lastName}`;

  const skills = portfolio.skills as Skill[];
  const experience = portfolio.experience as Experience[];
  const education = portfolio.education as Education[];
  const projects = portfolio.projects as Project[];
  const certifications = portfolio.certifications as Certification[];
  const languages = portfolio.languages as Language[];
  const contact = portfolio.contact as Contact;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Source+Sans+3:wght@300;400;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Source Sans 3', sans-serif;
      font-size: 12px;
      color: ${t.mainText};
      background: ${t.mainBg};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      position: relative;
      display: flex;
    }

    .watermark {
      position: fixed;
      top: 50%;
      left: 65%;
      transform: translate(-50%, -50%);
      font-family: 'Playfair Display', serif;
      font-size: 200px;
      font-weight: 900;
      color: ${t.headingColor};
      opacity: 0.03;
      pointer-events: none;
      z-index: 0;
    }

    .sidebar {
      width: 30%;
      background: ${t.sidebarBg};
      color: ${t.sidebarText};
      padding: 30px 20px;
      position: relative;
      z-index: 1;
    }

    .main {
      width: 70%;
      padding: 30px 28px;
      position: relative;
      z-index: 1;
    }

    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 700;
      color: ${t.headingColor};
      margin-bottom: 14px;
      padding-bottom: 6px;
      border-bottom: 2px solid ${t.accent};
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .sidebar .section-title {
      color: ${t.accent};
      border-bottom-color: ${t.accent}66;
    }

    .photo-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 auto 20px;
      overflow: hidden;
      border: 3px solid ${t.accent};
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${t.accent}22;
    }

    .photo-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-initials {
      font-family: 'Playfair Display', serif;
      font-size: 40px;
      font-weight: 700;
      color: ${t.accent};
    }

    .name {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      font-weight: 900;
      text-align: center;
      margin-bottom: 4px;
      color: ${t.sidebarText};
    }

    .headline-sidebar {
      font-size: 11px;
      text-align: center;
      color: ${t.accent};
      margin-bottom: 24px;
      line-height: 1.4;
    }

    .summary-text {
      font-size: 11.5px;
      line-height: 1.7;
      color: ${t.mainText};
      white-space: pre-line;
    }
  </style>
</head>
<body>
  <div class="watermark">${initials}</div>
  <div class="page">
    <div class="sidebar">
      <div class="photo-container">
        ${portfolio.photoBase64 ? `<img src="${portfolio.photoBase64}" alt="${fullName}" />` : `<div class="photo-initials">${initials}</div>`}
      </div>
      <div class="name">${fullName}</div>
      <div class="headline-sidebar">${portfolio.headline}</div>

      <div class="section-title" style="font-size: 13px;">Contact</div>
      <div style="font-size: 11px; margin-bottom: 20px; line-height: 1.8;">
        ${renderContactSidebar(contact, t)}
      </div>

      <div class="section-title" style="font-size: 13px;">Skills</div>
      ${renderSkills(skills, t)}

      <div class="section-title" style="font-size: 13px;">Languages</div>
      ${renderLanguages(languages, t)}
    </div>

    <div class="main">
      <div style="margin-bottom: 24px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: ${t.headingColor}; line-height: 1.2;">${fullName}</div>
        <div style="font-size: 14px; color: ${t.accent}; margin-top: 4px; font-weight: 600;">${portfolio.headline}</div>
      </div>

      <div class="section-title">About</div>
      <div class="summary-text" style="margin-bottom: 24px;">${portfolio.summary}</div>

      <div class="section-title">Experience</div>
      ${renderExperience(experience, t)}

      <div class="section-title">Education</div>
      ${renderEducation(education, t)}

      <div class="section-title">Projects</div>
      ${renderProjects(projects, t)}

      ${certifications.length > 0 ? `<div class="section-title">Certifications</div>${renderCertifications(certifications, t)}` : ''}
    </div>
  </div>
</body>
</html>`;
}
