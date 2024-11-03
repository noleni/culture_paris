"use client";
import ExpoDescription from "./ExpoDescription";
import styles from "../../styles/carrousel.module.scss";

interface ExpoProps {
  event: {
    id: number;
    title: string;
    info: string;
    url: string;
    lead_text: string;
    description: string;
    cover_url: string;
    cover_alt: string;
    cover_credit: string;
    tags: { id: number; name: string }[];
    place: { address_name: string };
    date_start: Date;
    date_end: Date;
    audience: string;

  };
}

const Expo: React.FC<ExpoProps> = ({ event }) => {

  return (
    <div className={styles.container}>
      <ExpoDescription content={event} />

      <aside>
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
      </aside>
    </div>
  );
};

export default Expo;
