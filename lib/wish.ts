"use server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export const addOrDeleteWish = async (
  eventId: string,
  userId: string,
  firstPathSegment: string | null
): Promise<void> => {
  const wish = await prisma.wishlistItem.findFirst({
    where: {
      userId,
      eventId,
    },
  });

  if (wish) {
    await prisma.wishlistItem.delete({
      where: {
        id: wish.id,
      },
    });
  } else {
    await prisma.wishlistItem.create({
      data: {
        userId,
        eventId,
      },
    });
  }
  if (firstPathSegment) revalidatePath(`/${firstPathSegment}/[id]`, `layout`);
}
