export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function generateUniqueSlug(
  baseName: string,
  existsCheck: (slug: string) => Promise<boolean>
): Promise<string> {
  const base = slugify(baseName);
  let slug = base;
  let counter = 1;

  while (await existsCheck(slug)) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}
