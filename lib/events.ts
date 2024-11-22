import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import type { EventsData as PrismaEventsData } from "@prisma/client";

export interface EventsData extends PrismaEventsData {
  status?: string;
}

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
  let status;
  if (event?.date_start && event?.date_end) {
    const startDate = new Date(event.date_start);
    const endDate = new Date(event.date_end);
    const now = new Date();
    if (now > endDate) {
      status = "Passé";
    } else if (now > startDate && now < endDate) {
      status = "En cours";
    } else {
      status = "À venir";
    }
    (event as EventsData).status = status;
  }
  return event;
}
