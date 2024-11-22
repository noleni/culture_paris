"use client";
import EventMap from "../EventMap";
import Rater from "../UI/Rater";
import { CiEdit } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import styles from "./eventLocalisation.module.scss";

interface EventLocalisationProps {
  place: {
    address_name: string;
    address_street: string;
    address_zipcode: string;
    latitude: number;
    longitude: number;
  };
  date_start: string;
  date_end: string;
  audience: string;
  contact_url: string;
  contact_mail: string;
  contact_facebook: string;
  contact_twitter: string;
  price_type: string;
  price_detail: string;
  access_type: string;
  access_link: string;
  access_link_text: string;
  status?: string;
}

const EventLocalisation: React.FC<EventLocalisationProps> = (props) => {
  return (
    <aside className={styles["event-localisation"]}>
      <div className={styles["event-localisation__infos"]}>
        <div className={`${styles["event-localisation__user-actions"]} ${styles["event-localisation__section"]}`}>
          <Rater rating={0} setRating={() => {}} />
          <button type="button">
            <CiEdit />
            Ecrire un avis
          </button>
          <button type="button">
            <CiHeart />
            Ajouter à mes envies
          </button>
        </div>
        <div className={styles["event-localisation__section"]}>
          <p>{props.status}</p>
          <p>
            Du {new Date(props.date_start).toLocaleDateString()} {" "}
            au {new Date(props.date_end).toLocaleDateString()}
          </p>
          <p>{props.price_type}</p>
          <p>{props.audience}</p>
          <button type="button" className="cta">
            Lien vers l&apos;événement
          </button>
        </div>
        <div className={styles["event-localisation__section"]}>
          <p>{props.place.address_name}</p>
          <p>{props.place.address_street}</p>
          <p>{props.place.address_zipcode}</p>
        </div>
        <EventMap
          latitude={props.place.latitude}
          longitude={props.place.longitude}
        />
      </div>
    </aside>
  );
};

export default EventLocalisation;
