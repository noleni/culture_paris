"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface EventMapProps {
  latitude: number;
  longitude: number;
}

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41], // Taille par défaut des icônes Leaflet
  iconAnchor: [12, 41], // Point d'ancrage de l'icône
  popupAnchor: [1, -34], // Position de l'ancrage pour le popup
  shadowSize: [41, 41], // Taille de l'ombre
});


const EventMap: React.FC<EventMapProps> = ({ latitude, longitude }) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const citymapperUrl = `https://citymapper.com/directions?endcoord=${latitude},${longitude}`;

  return !latitude || !longitude ? null : (
    <div>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} icon={customIcon} />
      </MapContainer>
    </div>
  );
};

export default EventMap;
