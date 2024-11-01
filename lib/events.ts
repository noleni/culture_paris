import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCurrentEvents(tag : string) {
  // Récupérer tous les événements avec le tag "Expo"
  const today = new Date();
  const events = await prisma.eventsData.findMany({
    where: {
      tags: {
        some: {
          name: tag,
        },
      },
      date_start: { lte: today }, // date_start est antérieure ou égale à aujourd'hui
      date_end: { gte: today },
    },
    include: {
      place: true, // Inclure les informations sur le lieu
    },
  });

  return events;
}

export async function getToComeEvents(tag : string) {
  // Récupérer tous les événements avec le tag "Expo"
  const today = new Date();
  const events = await prisma.eventsData.findMany({
    where: {
      tags: {
        some: {
          name: tag,
        },
      },
      date_start: { gte: today }, // date_start est postérieure ou égale à aujourd'hui
    },
    include: {
      place: true, // Inclure les informations sur le lieu
    },
  });

  return events;
}

export async function getEventById(id : number) {
  const event = await prisma.eventsData.findUnique({
    where: {
      id,
    },
    include: {
      place: true,
    },
  });

  return event;
}
