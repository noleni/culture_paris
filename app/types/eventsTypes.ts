// src/types/events.ts
export interface EventPlace {
  id: number;
  address_name: string;
  address_street: string;
  address_zipcode: string;
  address_city: string;
  latitude: number;
  longitude: number;
  updatedAt: Date;
}

export interface EventTag {
  id: number;
  name: string;
}

export interface Event {
  id: string;
  title: string;
  info: string;
  url: string;
  lead_text: string;
  description: string;
  date_start: Date;
  date_end: Date;
  date_description: string;
  cover_url: string;
  cover_alt: string;
  cover_credit: string;
  audience: string;
  contact_url: string;
  contact_mail: string;
  contact_facebook: string;
  contact_twitter: string;
  price_type: string;
  price_detail: string;
  access_type: string;
  access_link: string;
  access_link_text: string;
  placeId: number | null;
  updatedAt: Date;
  status?: string;
  place: EventPlace;
  tags: EventTag[];
  userRating?: number;
  averageRating?: number;
}
