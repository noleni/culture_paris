import { prisma } from "./prisma";
import { slugify } from "../app/utils/slugify";
import type { User as PrismaUsers } from "@prisma/client";

export interface Users extends PrismaUsers {
  status?: string;
}

export async function getUserById(slug: string): Promise<Users | null> {
  if (!slug) {
    throw new Error("Slug is undefined");
  }

  const user = await prisma.user.findUnique({
    where: {
      slug,
    },
  });

  return user as Users;
}

export async function generateUniqueSlug(name: string): Promise<string> {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.user.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
