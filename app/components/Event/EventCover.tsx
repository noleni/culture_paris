"use client";

import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";

import styles from "./eventCover.module.scss";

const EventCover: React.FC<{ cover_url: string; cover_alt: string; cover_credits: string; title: string }> = ({
  cover_url,
  cover_alt,
  cover_credits,
  title,
}) => {
  return (
    <div className={styles.cover}>
      {cover_url && (
        <Image src={cover_url} alt={cover_alt} priority fill />
      )}
      <div className={styles.title}>
        <h2>{title}</h2>
        <div className={styles.actions}>
          9,6
        </div>
      </div>
    </div>
  );
}

export default EventCover;
