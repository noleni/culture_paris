"use client";
import Image from "next/image";
import styles from "../styles/Card.module.scss";

interface CardProps {
  title: string;
  cover_url: string;
  cover_alt: string;
  address_name: string;
  date_start: string;
  date_end: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={styles.card} onClick={props.onClick}>
      <h4>{props.title}</h4>
      <div>
        <Image
          src={props.cover_url}
          alt={props.cover_alt || "Cover image"}
          width={260}
          height={140}
        />
        <div className={styles.card__name}>
          <p>{props.address_name}</p>
        </div>
        <small>
          {new Date(props.date_start).toLocaleDateString()} -{" "}
          {new Date(props.date_end).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default Card;
