"use client";
import EventMap from "../EventMap";
// import styles from "./carrousel.module.scss";

interface ExpoAsideProps {
  event: {
    id: string;
    title: string;
    lead_text: string;
    description: string;
    cover_url: string;
    cover_alt: string;
    cover_credit: string;
    tags: { id: number; name: string }[];
    place: { address_name: string, latitude: number, longitude: number };
    date_start: Date;
    date_end: Date;
  };
}

const ExpoLocalisation: React.FC<ExpoAsideProps> = ({ event }) => {
  return (
    <div className="expo-localisation flex">
      <div >
        <ul>
          {event.tags?.map((tag) => (
            <li key={tag.id} className="tag">
              {tag.name}
            </li>
          ))}
        </ul>
        <p>{event.place.address_name}</p>
        <p>
          {new Date(event.date_start).toLocaleDateString()} -{" "}
          {new Date(event.date_end).toLocaleDateString()}
        </p>
        {/* <p>{event.audience}</p> */}
        <button type="button" className="cta">
          Lien vers l&apos;événement
        </button>
      </div>
      <EventMap
        latitude={event.place.latitude}
        longitude={event.place.longitude}
      />
    </div>
  );
};

export default ExpoLocalisation;
