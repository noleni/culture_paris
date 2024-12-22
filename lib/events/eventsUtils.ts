import { Event, EventTag } from "../../app/types/eventsTypes";

// Formater les dates d'un événement
export const formatEventDates = (event: Event): Event => {
  const dateStart = new Date(event.date_start);
  const dateEnd = new Date(event.date_end);

  return {
    ...event,
    date_start: dateStart.toLocaleDateString("en-GB"),
    date_end: dateEnd.toLocaleDateString("en-GB"),
  };
};

// Calculer le statut d'un événement
export const getEventStatus = (event: Event): string | undefined => {
  if (event.date_start && event.date_end) {
    const startDate = event.date_start;
    const endDate = event.date_end;
    const now = new Date();

    if (now > endDate) {
      return "Passé";
    } else if (now >= startDate && now <= endDate) {
      return "En cours";
    } else {
      return "À venir";
    }
  }
  return undefined;
};

// Formater un événement complet
export const formatEvent = (event: Event): Event => {
  const formattedEvent = formatEventDates(event);
  const status = getEventStatus(formattedEvent);

  return { ...formattedEvent, status };
};

// Utilitaire pour extraire tous les tags
export const getAllTags = (events: Event[]): EventTag[] => {
  const allTags = events.flatMap((event) => event.tags || []);
  const uniqueTagsMap = new Map<number, EventTag>();

  allTags.forEach((tag) => {
    uniqueTagsMap.set(tag.id, tag);
  });

  return Array.from(uniqueTagsMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

export const getAllPlaces = (
  events: Event[]
): { allPlaces: string[]; allZipcodes: string[] } => {
  const allPlaces = events.flatMap((event) => event.place?.address_name || "");
  const uniquePlaces = new Set(allPlaces);
  const allZipcodes = events.flatMap(
    (event) => event.place?.address_zipcode || ""
  );
  const uniqueZipcodes = new Set(allZipcodes);

  return {
    allPlaces: Array.from(uniquePlaces).sort(),
    allZipcodes: Array.from(uniqueZipcodes).sort(),
  };
};
