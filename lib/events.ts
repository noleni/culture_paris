import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import type { EventsData } from "@prisma/client";

export type EventWithRelations = Prisma.EventsDataGetPayload<{
  include: { tags: true; place: true };
}>;

export async function getCurrentEvents(
  tag: string
): Promise<EventWithRelations[]> {
  // Récupérer tous les événements avec le tag "Expo"
  const events = await prisma.eventsData.findMany({
    where: {
      tags: {
        some: {
          name: tag,
        },
      },
    },
    include: {
      place: true, // Inclure les informations sur le lieu
      tags: true, // Inclure les tags
    },
    // retourner les propriétés nécessaires
  });

  return events;
}

export async function getToComeEvents(tag: string): Promise<EventsData[]> {
  // Récupérer tous les événements avec le tag "Expo"

  const events = await prisma.eventsData.findMany({
    where: {
      tags: {
        some: {
          name: tag,
        },
      },
    },
    include: {
      place: true, // Inclure les informations sur le lieu
    },
  });

  return events;
}

export async function getEventById(id: string): Promise<EventsData | null> {
  const event = await prisma.eventsData.findUnique({
    where: {
      id: id,
    },
    include: {
      place: true,
      tags: true,
    },
  });
  return event;
}
