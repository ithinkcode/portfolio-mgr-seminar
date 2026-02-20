import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('demo1234', 12);

  const user = await prisma.user.upsert({
    where: { email: 'demo@folioforge.dev' },
    update: {},
    create: {
      email: 'demo@folioforge.dev',
      passwordHash,
      firstName: 'Alex',
      lastName: 'Chen',
    },
  });

  await prisma.portfolio.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      slug: 'alex-chen',
      headline: 'Full-Stack Engineer & Systems Thinker',
      summary:
        'I\'m a full-stack engineer with 3 years of experience building scalable web applications and distributed systems. My journey started with a fascination for how software can solve real-world problems at scale, and that passion drives everything I build today.\n\nI specialize in TypeScript and React on the frontend, with Node.js and PostgreSQL powering the backend. I\'ve led feature development for products serving 50K+ users, and I care deeply about clean architecture, developer experience, and shipping code that matters.\n\nWhen I\'m not coding, you\'ll find me contributing to open-source projects, mentoring junior developers, or exploring the latest in distributed systems and cloud infrastructure. I believe great software is built by empathetic teams who communicate well and iterate fast.',
      skills: [
        { name: 'TypeScript', proficiency: 95, category: 'Frontend' },
        { name: 'React', proficiency: 92, category: 'Frontend' },
        { name: 'Next.js', proficiency: 88, category: 'Frontend' },
        { name: 'Node.js', proficiency: 90, category: 'Backend' },
        { name: 'PostgreSQL', proficiency: 85, category: 'Backend' },
        { name: 'Express.js', proficiency: 88, category: 'Backend' },
        { name: 'Docker', proficiency: 80, category: 'DevOps' },
        { name: 'AWS', proficiency: 75, category: 'DevOps' },
        { name: 'Python', proficiency: 78, category: 'Backend' },
        { name: 'Figma', proficiency: 70, category: 'Design' },
      ],
      experience: [
        {
          company: 'Streamline Technologies',
          role: 'Full-Stack Engineer',
          startDate: '2022-06',
          endDate: null,
          highlights: [
            'Led development of a real-time analytics dashboard serving 50K+ monthly active users',
            'Architected a microservices migration that reduced API latency by 40%',
            'Mentored 3 junior developers through code reviews and pair programming sessions',
            'Implemented CI/CD pipelines with GitHub Actions, reducing deployment time from 45 to 8 minutes',
          ],
        },
        {
          company: 'DataPulse Inc.',
          role: 'Software Engineer',
          startDate: '2021-01',
          endDate: '2022-05',
          highlights: [
            'Built a customer-facing reporting tool with React and D3.js, used by 200+ enterprise clients',
            'Designed RESTful APIs handling 10K+ requests per minute with Express and Redis caching',
            'Reduced database query times by 60% through indexing optimization and query refactoring',
          ],
        },
      ],
      education: [
        {
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          year: '2020',
          achievements: [
            'Dean\'s List — 6 consecutive semesters',
            'Published research on distributed consensus algorithms',
            'Teaching Assistant for CS 161 (Computer Security)',
          ],
        },
      ],
      projects: [
        {
          title: 'CloudBoard',
          description:
            'A real-time collaborative whiteboard application with multi-cursor support, infinite canvas, and live synchronization using WebSockets and CRDTs. Supports up to 50 concurrent users per board.',
          techStack: ['React', 'TypeScript', 'Node.js', 'WebSocket', 'Redis', 'PostgreSQL'],
          liveUrl: 'https://cloudboard.demo.dev',
          repoUrl: 'https://github.com/alexchen/cloudboard',
        },
        {
          title: 'DevMetrics CLI',
          description:
            'An open-source command-line tool that analyzes Git repositories and generates developer productivity reports with visual charts. Downloaded 2K+ times on npm.',
          techStack: ['TypeScript', 'Node.js', 'Commander.js', 'Chart.js'],
          repoUrl: 'https://github.com/alexchen/devmetrics',
        },
      ],
      certifications: [
        {
          name: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          year: '2023',
          url: 'https://aws.amazon.com/certification/',
        },
        {
          name: 'Meta Front-End Developer Professional Certificate',
          issuer: 'Meta / Coursera',
          year: '2022',
        },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Mandarin', proficiency: 'Conversational' },
        { language: 'Spanish', proficiency: 'Basic' },
      ],
      contact: {
        email: 'alex@folioforge.dev',
        linkedin: 'https://linkedin.com/in/alexchen',
        github: 'https://github.com/alexchen',
        twitter: 'https://twitter.com/alexchen_dev',
        website: 'https://alexchen.dev',
      },
      theme: 'obsidian',
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log('Seed completed: demo user and portfolio created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
