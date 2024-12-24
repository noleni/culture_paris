import { PrismaClient } from "@prisma/client";
import { getAverageRating } from "./rating";
import axios from "axios";

const prisma = new PrismaClient();

interface LatLon {
  lon: number;
  lat: number;
}

interface RawPlaceData {
  address_name: string;
  address_street?: string;
  address_zipcode?: string;
  address_city?: string;
  lat_lon?: LatLon;
}

interface RawEventData {
  id: string;
  title: string;
  info?: string;
  url: string;
  date_start: Date;
  date_end?: Date;
  date_description?: string;
  description?: string;
  lead_text?: string;
  cover_url?: string;
  cover_credit?: string;
  cover_alt?: string;
  audience?: string;
  contact_url?: string;
  access_link?: string;
  tags: string[];
  average_rating?: number;
}

async function createTags(
  events: Array<{
    title: string;
    tags: string[]; // Liste des tags associés à l'événement
  }>
) {
  const createdTags = [];

  for (const event of events) {
    const { tags } = event;

    for (const tagName of tags) {
      let tag = await prisma.tag.findUnique({
        where: {
          name: tagName,
        },
      });

      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagName,
          },
        });
      }

      createdTags.push(tag);
    }

    // Associe les tags à l'événement dans la base de données
    await prisma.eventsData.update({
      where: {
        title: event.title, // Trouve l'événement par son titre
      },
      data: {
        tags: {
          connect: createdTags.map((tag) => ({ id: tag.id })), // Connecte les tags à l'événement
        },
      },
    });
  }
}

async function createPlace(placeData: RawPlaceData) {
  const {
    address_name,
    address_street,
    address_zipcode,
    address_city,
    lat_lon,
  } = placeData;

  // Vérifier si le lieu existe déjà via `address_name`
  const existingPlace = await prisma.placesData.findUnique({
    where: {
      address_name,
    },
  });

  // Si le lieu existe, le retourner ; sinon, le créer
  if (existingPlace) {
    return existingPlace;
  }

  return await prisma.placesData.create({
    data: {
      address_name,
      address_street: address_street || "",
      address_zipcode: address_zipcode || "",
      address_city: address_city || "",
      latitude: lat_lon?.lat || 0,
      longitude: lat_lon?.lon || 0,
    },
  });
}

async function createEvent(eventData: RawEventData, placeId: number) {
  const {
    title,
    date_start,
    date_end,
    date_description,
    description,
    lead_text,
    cover_url,
    cover_credit,
    cover_alt,
    audience,
    contact_url,
    access_link,
    contact_mail,
    contact_facebook,
    contact_twitter,
    price_type,
    price_detail,
    access_type,
    access_link_text,
    tags,
  } = eventData;

  // Vérifie si l'événement existe déjà dans la base de données
  const existingEvent = await prisma.eventsData.findUnique({
    where: {
      title,
    },
  });

  // Si l'événement existe déjà, retourne-le
  if (existingEvent) {
    const averageRating = await getAverageRating(existingEvent.id);
    return await prisma.eventsData.update({
      where: {
        title,
      },
      data: {
        average_rating: averageRating || null,
      },
    });
  }

  // Recherche les tags existants
  const eventTags = await prisma.tag.findMany({
    where: {
      name: {
        in: tags, // Associe les tags via leur nom
      },
    },
  });

  // Création de l'événement
  return await prisma.eventsData.create({
    data: {
      title,
      info: description || "",
      url: eventData.url,
      date_start: date_start ? new Date(date_start) : new Date(),
      date_end: date_end ? new Date(date_end) : new Date(),
      date_description: date_description || "",
      description: description || "",
      lead_text: lead_text || "",
      cover_url: cover_url || "",
      cover_credit: cover_credit || "",
      cover_alt: cover_alt || "",
      audience: audience || "",
      contact_url: contact_url || "",
      access_link: access_link || "",
      contact_mail: contact_mail || "",
      contact_facebook: contact_facebook || "",
      contact_twitter: contact_twitter || "",
      price_type: price_type || "",
      price_detail: price_detail || "",
      access_type: access_type || "",
      access_link_text: access_link_text || "",
      average_rating: null,

      tags: {
        connect: eventTags.map((tag) => ({ id: tag.id })),
      },
      place: {
        connect: { id: placeId },
      },
    },
  });
}

async function fetchDataAndPopulateDB() {
  try {
    console.log("Début de l'insertion des données...");
    const tags = ["Expo", "Danse", "Concert", "Théâtre"];
    const results: (RawPlaceData & RawEventData)[] = [];

    for (const tag of tags) {
      const response = await axios.get<{
        results: (RawPlaceData & RawEventData)[];
      }>(
        `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?where=tags%20like%20%22${encodeURIComponent(
          tag
        )}%22&limit=100`
      );

      results.push(
        ...response.data.results.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item.address_name !== null
        )
      );
    }

    for (const rawData of results) {
      const place = await createPlace(rawData);
      await createEvent(rawData, place.id);
      await createTags([{ title: rawData.title, tags: rawData.tags }]);
    }

    console.log("Données insérées avec succès !");
  } catch (error) {
    console.error("Erreur générale :", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Appel de la fonction pour peupler la base de données
fetchDataAndPopulateDB();
