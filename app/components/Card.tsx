"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMdStarOutline } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import styles from "./card.module.scss";

interface CardProps {
  title: string;
  cover_url: string;
  cover_credit: string;
  cover_alt: string;
  address_name: string;
  date_start: string;
  date_end: string;
  href: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <Link className={styles.card} href={props.href}>
      <div className={styles.card__icons}>
        <IoMdStarOutline />
        <IoMdHeartEmpty />
      </div>
      <div className={styles.card__title}>
        <h4>{props.title}</h4>
      </div>
      <div>
        <div className={styles.card__image}>
          {props.cover_url && (
            <Image
              src={props.cover_url}
              alt={props.cover_alt}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority
            />
          )}
        </div>
        <div className="tag">
          <p>{props.address_name}</p>
        </div>
        <small>
          {new Date(props.date_start).toLocaleDateString()} -{" "}
          {new Date(props.date_end).toLocaleDateString()}
        </small>
      </div>
    </Link>
  );
};

export default Card;
