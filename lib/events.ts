import { prisma } from "./prisma";
import { Event, EventTag } from "../app/types/eventsTypes";

// Utilitaire pour extraire tous les tags
const getAllTags = (events: Event[]): EventTag[] => {
  const allTags = events.flatMap((event) => event.tags || []);
  const uniqueTagsMap = new Map<number, EventTag>();

  allTags.forEach((tag) => {
    uniqueTagsMap.set(tag.id, tag);
  });

  return Array.from(uniqueTagsMap.values());
};

// Récupérer les événements actuels
export async function getCurrentEvents(
  tag: string
): Promise<{ events: Event[]; allTags: EventTag[] }> {
  // Récupérer tous les événements avec le tag spécifié
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
  });

  const allTags = getAllTags(events as Event[]); // Cast explicite vers Event[]

  return { events: events as Event[], allTags };
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

  // Calculer le statut de l'événement
  let status: string | undefined;
  if (event.date_start && event.date_end) {
    const startDate = new Date(event.date_start);
    const endDate = new Date(event.date_end);
    const now = new Date();
    if (now > endDate) {
      status = "Passé";
    } else if (now >= startDate && now <= endDate) {
      status = "En cours";
    } else {
      status = "À venir";
    }
  }

  return { ...event, status } as Event;
}
