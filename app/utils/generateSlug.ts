import slugify from 'slugify'
import { prisma } from './prisma'
import { nanoid } from 'nanoid'

export const generateUniqueSlug = async (title: string): Promise<string> => {
  const baseSlug = slugify(title, { lower: true, strict: true })
  let slug = baseSlug

  while (await prisma.question.findFirst({ 
    where: { 
        slug 
    } 
  })) {
    slug = `${baseSlug}-${nanoid(4)}` 
  }

  return slug
}