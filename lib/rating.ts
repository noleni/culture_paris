import { prisma } from "./prisma";

export const addRating = async (
  eventId: string,
  userId: string,
  rating: number
): Promise<void> => {
  await prisma.rating.create({
    data: {
      value: rating,
      event: {
        connect: {
          id: eventId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
