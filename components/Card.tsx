"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMdStarOutline } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import styles from "./card.module.scss";
import type { Event } from "../app/types/eventsTypes";

interface CardProps {
  event: Event;
  href: string;
}

const Card: React.FC<CardProps> = ({ event, href }) => {
  return (
    <Link className={styles.card} href={href}>
      <div className={styles.card__image}>
        {event.cover_url && (
          <Image
            src={event.cover_url}
            alt={event.cover_alt}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority
          />
        )}
        <div className={styles.card__info}>
          <small className={styles.card__tag}>{event.place.address_name}</small>
          <small className={styles.card__date}>
            du {event.date_start} au {event.date_end}
          </small>
        </div>
      </div>
      <div className={styles.card__title}>
        <h5>{event.title}</h5>
      </div>
      <div className={styles.card__actions}>
        <span className={styles.card__rating}>
          {event.average_rating ? event.average_rating : "-"}
        </span>
        <div className={styles.card__icons}>
          <IoMdStarOutline />
          <IoMdHeartEmpty />
        </div>
      </div>
    </Link>
  );
};

export default Card;
