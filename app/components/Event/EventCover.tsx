"use client";

import Image from "next/image";

import styles from "./eventCover.module.scss";

const EventCover: React.FC<{ cover_url: string; cover_alt: string; cover_credit: string; title: string }> = ({
  cover_url,
  cover_alt,
  cover_credit,
  title,
}) => {
  return (
    <div className={styles.cover}>
      {cover_url && (
        <>
          <Image src={cover_url} alt={cover_alt} priority fill />
          <small>© {cover_credit}</small>
        </>
      )}
      <div className={styles.title}>
        <h2>{title}</h2>
        <div className={styles["avg-rating"]}>
          <p>4.5</p>
        </div>
      </div>
    </div>
  );
}

export default EventCover;
