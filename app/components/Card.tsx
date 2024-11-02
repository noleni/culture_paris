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
  date_start: string;
  date_end: string;
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
        {/petits/.test(props.audience) &&<TbMoodKid />}
        <Image
          src={props.cover_url}
          alt={props.cover_alt || "Cover image"}
          layout="responsive"
          width={280}
          height={140}
        />
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
