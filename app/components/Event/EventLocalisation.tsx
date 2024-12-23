import { useState } from "react";
import type { Event } from "../../types/eventsTypes";
import EventMap from "./EventMap";
import Rater from "../UI/Rater";
import LoginModal from "../Login/LoginModal";
import { CiEdit } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import Link from "next/link";
import styles from "./eventLocalisation.module.scss";

interface EventLocalisationProps {
  event: Event;
}

const EventLocalisation: React.FC<EventLocalisationProps> = ({ event }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  console.log(event);

  return (
    <>
      {loginModalOpen && (
        <LoginModal
          isModalOpen={loginModalOpen}
          setIsModalOpen={setLoginModalOpen}
        />
      )}
      <aside className={styles["event-localisation"]}>
        <div className={styles["event-localisation__infos"]}>
          <div
            className={`${styles["event-localisation__user-actions"]} ${styles["event-localisation__section"]}`}
          >
            <Rater rating={event.userRating} setLoginModalOpen={setLoginModalOpen} />
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
            <p>
              Du {new Date(event.date_start).toLocaleDateString()} au{" "}
              {new Date(event.date_end).toLocaleDateString()}
            </p>
            <p>{event.price_type}</p>
            <p>{event.audience}</p>
            <button type="button" className="cta">
              Lien vers l&apos;événement
            </button>
          </div>
          <div className={styles["event-localisation__section"]}>
            <p>{event.place.address_name}</p>
            {event.contact_facebook && (
              <Link href={event.contact_facebook}>
                <CiFacebook />
              </Link>
            )}
            <p>{event.place.address_street}</p>
            <p>{event.place.address_zipcode}</p>
          </div>
          <EventMap events={event ? [event] : []} />
        </div>
      </aside>
    </>
  );
};

export default EventLocalisation;
