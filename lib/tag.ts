import { prisma } from "./prisma";

export async function createTags(
  events: Array<{
    title: string;
    tags: string[]; // Liste des tags associés à l'événement
  }>
) {
  const createdTags = [];

  for (const event of events) {
    const { tags } = event;

    for (const tagName of tags) {
      let tag = await prisma.tag.findUnique({
        where: {
          name: tagName,
        },
      });

      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagName,
          },
        });
      }
    }
  }
}
