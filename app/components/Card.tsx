"use client";
import Image from "next/image";
import Link from "next/link";
import { TbMoodKid } from "react-icons/tb";
import { IoMdStarOutline } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import styles from "../styles/Card.module.scss";

interface CardProps {
  title: string;
  cover_url: string;
  cover_alt: string;
  address_name: string;
  date_start: Date;
  date_end: Date;
  audience: string;
  href: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <Link className={styles.card} href={props.href}>
      <h4>{props.title}</h4>
      <div className={styles.card__icons}>
        <IoMdStarOutline />
        <IoMdHeartEmpty />
      </div>
      <div>
        {/petits/.test(props.audience) && <TbMoodKid />}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "0",
            paddingBottom: "50%",
          }}
        >
          <Image
            src={props.cover_url}
            alt={props.cover_alt || "Cover image"}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
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
