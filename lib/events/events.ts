import { prisma } from "../prisma";
import { Event, EventTag } from "../../app/types/eventsTypes";
import {
  formatEventDates,
  formatEvent,
  getAllPlaces,
  getAllTags,
} from "./eventsUtils";

// Récupérer les événements actuels
export async function getCurrentEvents(tag: string): Promise<{
  events: Event[];
  allTags: EventTag[];
  allPlaces: string[];
  allZipcodes: string[];
}> {
  // Récupérer tous les événements avec le tag spécifié
  const events = await prisma.eventsData.findMany({
    where: {
      tags: {
        some: {
          name: tag,
        },
      },
      date_end: {
        gte: new Date(),
      },
    },
    include: {
      place: true, // Inclure les informations sur le lieu
      tags: true, // Inclure les tags
    },
  });

  const formattedEvents = events.map((event) => formatEventDates(event));

  const allTags = getAllTags(formattedEvents as Event[]); // Cast explicite vers Event[]
  const { allPlaces, allZipcodes } = getAllPlaces(formattedEvents as Event[]);

  return {
    events: formattedEvents as Event[],
    allTags,
    allPlaces,
    allZipcodes,
  };
}

// Récupérer un événement par son ID
export async function getEventById(id: string): Promise<Event | null> {
  const event = await prisma.eventsData.findUnique({
    where: {
      id: id,
    },
    include: {
      place: true,
      tags: true,
    },
  });

  if (!event) {
    return null;
  }

  console.log("formatEvent(event)", formatEvent(event));

  return formatEvent(event);
}
