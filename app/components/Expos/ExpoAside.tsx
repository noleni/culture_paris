"use client";
import EventMap from "../EventMap";

interface ExpoAsideProps {
  event: {
    id: number;
    title: string;
    tags: { id: number; name: string }[];
    place: { address_name: string, latitude: number, longitude: number };
    date_start: Date;
    date_end: Date;
    audience: string;
  };
}

const ExpoAside: React.FC<ExpoAsideProps> = ({ event }) => {
  return (
    <aside>
      <div>
        <h5>Catégories</h5>
        <ul>
          {event.tags?.map((tag) => (
            <li key={tag.id} className="tag">
              {tag.name}
            </li>
          ))}
        </ul>
        <h5>Informations pratiques</h5>
        <p>Adresse : {event.place.address_name}</p>
        <p>
          Date : {new Date(event.date_start).toLocaleDateString()} -{" "}
          {new Date(event.date_end).toLocaleDateString()}
        </p>
        <p>Public : {event.audience}</p>
        <button type="button" className="cta">
          Lien vers l&apos;événement
        </button>
      </div>
      <EventMap
        latitude={event.place.latitude}
        longitude={event.place.longitude}
      />
    </aside>
  );
};

export default ExpoAside;
