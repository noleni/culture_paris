import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

interface LatLon {
  lon: number;
  lat: number;
}

interface PlaceData {
  address_name: string;
  address_street: string;
  address_zipcode: string;
  address_city: string;
  lat_lon: LatLon;
  contact_url: string | null;
  access_link: string | null;
}

interface EventData {
  id: string; // ou number, selon votre API
  url: string;
  title: string;
  lead_text: string;
  description: string;
  date_start: string; // Gardez ceci en tant que chaîne si vous prévoyez de le convertir plus tard
  date_end: string; // Gardez ceci en tant que chaîne si vous prévoyez de le convertir plus tard
  date_description: string | null;
  cover_url: string | null;
  cover_alt: string | null;
  cover_credit: string | null;
  audience: string | null;
  tags: string[]; // Cela représente les tags, en supposant qu'ils soient fournis sous forme de tableau de chaînes
}

async function createTags() {
  const tags = ["Expo", "Danse", "Concert", "Théâtre"];

  for (const tagName of tags) {
    await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
  }
}

async function createPlace(placeData: PlaceData) {
  const {
    address_name,
    address_street,
    address_zipcode,
    address_city,
    lat_lon,
    contact_url,
    access_link,
  } = placeData;

  // Vérifier si le lieu existe déjà
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
      address_street,
      address_zipcode,
      address_city,
      latitude: lat_lon.lat,
      longitude: lat_lon.lon,
      contact_url: contact_url ?? "", // Provide a default value of an empty string if contact_url is null
      access_link: access_link ?? "", // Provide a default value of an empty string if access_link is null
    },
  });
}

async function createEvent(eventData: EventData, locationId: number) {
  const {
    title,
    lead_text,
    description,
    date_start,
    date_end,
    cover_url,
    cover_alt,
    cover_credit,
    audience,
    tags,
  } = eventData;

  // Vérifier si l'événement existe déjà
  const existingEvent = await prisma.eventsData.findUnique({
    where: {
      title, // ou d'autres critères uniques comme title + date_start
    },
  });

  // Si l'événement existe, le retourner ; sinon, le créer
  if (existingEvent) {
    return existingEvent;
  }

  const eventTags = await prisma.tag.findMany({
    where: { name: { in: tags } },
  });

  return await prisma.eventsData.create({
    data: {
      title,
      info: description,
      url: eventData.url,
      lead_text,
      description,
      date_start: new Date(date_start),
      date_end: new Date(date_end),
      date_description: eventData.date_description ?? "",
      cover_url: cover_url ?? "",
      cover_alt: cover_alt ?? "", // Provide a default value of an empty string if cover_alt is null
      cover_credit: cover_credit ?? "", // Provide a default value of an empty string if cover_credit is null
      audience: audience ?? "", // Provide a default value of an empty string if audience is null
      tags: {
        connect: eventTags.map((tag) => ({ id: tag.id })),
      },
      place: {
        connect: { id: locationId },
      },
    },
  });
}

async function fetchDataAndPopulateDB() {
  try {
    console.log("Début de l'insertion des données...");
    const tags = ["Expo", "Danse", "Concert", "Théâtre"];
    const results = [];

    // Effectuer des appels API pour chaque tag
    for (const tag of tags) {
      const response = await axios.get(
        `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?where=tags%20like%20%22${encodeURIComponent(
          tag
        )}%22&limit=100`
      );
      results.push(
        ...response.data.results.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item.address_name !== null
        )
      ); // Ajouter les résultats à la liste
    }

    await createTags();

    for (const item of results) {
      const placeData = await createPlace(item);
      await createEvent(item, placeData.id);
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion des données :", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Appel de la fonction pour peupler la base de données
fetchDataAndPopulateDB();
