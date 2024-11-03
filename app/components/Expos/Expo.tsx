"use client";
import ExpoDescription from "./ExpoDescription";
import ExpoAside from "./ExpoAside";

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
    place: { address_name: string, latitude: number, longitude: number };
    date_start: Date;
    date_end: Date;
    audience: string;

  };
}

const Expo: React.FC<ExpoProps> = ({ event }) => {

  return (
    <div className={styles.container}>
      <ExpoAside event={event} />
      <ExpoDescription content={event} />
    </div>
  );
};

export default Expo;
