"use client";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Event } from "../../types/eventsTypes";
import Card from "../Card";

import styles from "./events.module.scss";


interface EventMapProps {
  events: Event[];
  tag?: string;
}


const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  // shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const EventMap: React.FC<EventMapProps> = ({ events, tag }) => {
  if (!events.length) return null; // Pas d'événements, pas de carte

  const defaultCenter = {
    latitude: 48.8581050182032,
    longitude: 2.36229800729188,
  };

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
