import prisma from '../config/prisma';
import { CreatePortfolioInput, PatchPortfolioInput } from '../schemas/portfolio.schema';
import { generateUniqueSlug } from '../utils/slugify';

export async function getByUserId(userId: string) {
  return prisma.portfolio.findUnique({ where: { userId }, include: { user: { select: { firstName: true, lastName: true, email: true } } } });
}

export async function getBySlug(slug: string) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
    include: { user: { select: { firstName: true, lastName: true, email: true } } },
  });

  if (!portfolio || !portfolio.isPublished) return null;
  return portfolio;
}

export async function create(userId: string, data: CreatePortfolioInput) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const err = new Error('User not found') as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  const slug = data.slug || await generateUniqueSlug(
    `${user.firstName} ${user.lastName}`,
    async (s) => !!(await prisma.portfolio.findUnique({ where: { slug: s } }))
  );

  return prisma.portfolio.create({
    data: {
      userId,
      slug,
      headline: data.headline,
      summary: data.summary,
      photoBase64: data.photoBase64,
      skills: data.skills as any,
      experience: data.experience as any,
      education: data.education as any,
      projects: data.projects as any,
      certifications: data.certifications as any,
      languages: data.languages as any,
      contact: data.contact as any,
      theme: data.theme || 'obsidian',
    },
  });
}

export async function update(userId: string, data: CreatePortfolioInput) {
  return prisma.portfolio.update({
    where: { userId },
    data: {
      headline: data.headline,
      summary: data.summary,
      photoBase64: data.photoBase64,
      slug: data.slug,
      skills: data.skills as any,
      experience: data.experience as any,
      education: data.education as any,
      projects: data.projects as any,
      certifications: data.certifications as any,
      languages: data.languages as any,
      contact: data.contact as any,
      theme: data.theme,
    },
  });
}

export async function patch(userId: string, data: PatchPortfolioInput) {
  const updateData: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      updateData[key] = value;
    }
  }

  return prisma.portfolio.update({
    where: { userId },
    data: updateData,
  });
}

export async function publish(userId: string) {
  return prisma.portfolio.update({
    where: { userId },
    data: { isPublished: true, publishedAt: new Date() },
  });
}

export async function unpublish(userId: string) {
  return prisma.portfolio.update({
    where: { userId },
    data: { isPublished: false },
  });
}

export async function remove(userId: string) {
  return prisma.portfolio.delete({ where: { userId } });
}
