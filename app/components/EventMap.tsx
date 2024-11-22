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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const EventMap: React.FC<EventMapProps> = ({ latitude, longitude }) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const citymapperUrl = `https://citymapper.com/directions?endcoord=${latitude},${longitude}`;

  return !latitude || !longitude ? null : (
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "300px" }}
      >
        <TileLayer
          url={`https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[latitude, longitude]} icon={customIcon} />
      </MapContainer>
  );
};

export default EventMap;
