"use client";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Event } from "../../types/eventsTypes";
import Image from "next/image";
import Link from "next/link";

import styles from "./events.module.scss";


interface EventMapProps {
  events: Event[];
  tag?: string;
}

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const EventMap: React.FC<EventMapProps> = ({ events, tag }) => {
  if (!events.length) return null; // Pas d'événements, pas de carte

  const defaultCenter = {
    latitude: events[0].place.latitude,
    longitude: events[0].place.longitude,
  };

  console.log("events", events);

  return (
    <MapContainer
      center={[defaultCenter.latitude, defaultCenter.longitude]}
      zoom={12}
      scrollWheelZoom={false}
      className={styles["events__map"]}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {events.map((event, index) => (
        <Marker
          key={index}
          position={[event.place.latitude, event.place.longitude]}
          icon={customIcon}
        >
          {tag && (
            <Tooltip
              direction="auto" // Permet de choisir automatiquement la meilleure direction
              className={styles.tooltip}
              interactive={true} // Rendre interactif pour éviter qu'il disparaisse sous la souris
              permanent={false}
              offset={[0, -30]}
              eventHandlers={{
                click: (e) => e.originalEvent.stopPropagation(), // Empêche la propagation des clics
                mouseover: (e) => e.originalEvent.stopPropagation(), // Empêche la fermeture sur hover
              }}
            >
              <Link
                className={styles["tooltip-content"]}
                href={`/${tag.toLowerCase()}/${event.id}`}
              >
                {/* Image de couverture */}
                <div className="tooltip-cover">
                  <Image
                    src={event.cover_url}
                    alt={event.title}
                    width={200}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                </div>
                {/* Titre */}
                <h3 className={styles["tooltip-title"]}>{event.title}</h3>
                {/* Dates */}
                <p className="tooltip-dates">
                  du {event.date_start} au {event.date_end}
                </p>
                {/* Adresse */}
                <p className={styles["tooltip-address"]}>
                  {event.place.address_name}
                </p>
              </Link>
            </Tooltip>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EventMap;
