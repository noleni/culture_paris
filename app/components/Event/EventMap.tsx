"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Event } from "../../types/eventsTypes";
import Card from "../Card";

import styles from "./eventMap.module.scss";

interface EventMapProps {
  events: Event[];
  tag?: string;
}

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const EventMap: React.FC<EventMapProps> = ({ events, tag }) => {
  if (!events.length) return null; // Pas d'événements, pas de carte

  const isOneLocation = events.length === 1;
  const defaultCenter = {
    latitude: isOneLocation ? events[0].place.latitude : 48.8566969,
    longitude: isOneLocation ? events[0].place.longitude : 2.3514616,
  };

  return (
    <MapContainer
      center={[defaultCenter.latitude, defaultCenter.longitude]}
      zoom={12}
      scrollWheelZoom={false}
      className={styles.event_map}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
        attribution=""
      />
      {events.map((event, index) => (
        <Marker
          key={index}
          position={[event.place.latitude, event.place.longitude]}
          icon={customIcon}
        >
          {tag && (
            <Popup
              closeButton={false} // Désactive le bouton de fermeture
              closeOnClick={true}
              autoPan={true} // Active le déplacement automatique
              autoPanPadding={[10, 50]} // Ajoute une marge pour éviter que le popup touche le bord
              autoPanPaddingTopLeft={[0, 50]}
            >
              <Card event={event} href={`/${tag.toLowerCase()}/${event.id}`} />
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EventMap;
