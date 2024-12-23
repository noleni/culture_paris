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
      value,
    },
    create: {
      eventId,
      userId,
      value,
    },
  });
};

export const getRating = async ( eventId: string, userId: string): Promise<number | null> => {
  const rating = await prisma.rating.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  return rating?.value || null;
}

export const getAverageRating = async (eventId: string): Promise<number | null> => {
  const ratings = await prisma.rating.findMany({
    where: {
      eventId,
    },
  });

  if (ratings.length === 0) {
    return null;
  }

  const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
  return sum / ratings.length;
}
