"use server";
import { prisma } from "./prisma";

export const addOrUpdateRating = async (
  eventId: string,
  userId: string,
  value: number
): Promise<void> => {
  await prisma.rating.upsert({
    where: {
      userId_eventId: {
        eventId,
        userId,
      },
    },
    update: {
      value: value,
    },
    create: {
      eventId: eventId,
      userId: userId,
      value: value,
    },
  });
};

export const getRating = async ( eventId: string, userId: string): Promise<number | null> => {
  const rating = await prisma.rating.findFirst({
    where: {
      eventId: eventId,
      userId: userId,
    },
  });

  return rating?.value || null;
}
