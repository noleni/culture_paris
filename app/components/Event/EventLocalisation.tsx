import { useState } from "react";
import type { Event } from "../../types/eventsTypes";
import EventMap from "./EventMap";
import Rater from "../UI/Rater";
import LoginModal from "../Login/LoginModal";
import { CiEdit } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import Link from "next/link";
import styles from "./event.module.scss";

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
            <h6>Ma note :</h6>
            <Rater
              rating={event.userRating}
              setLoginModalOpen={setLoginModalOpen}
            />
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
            <h6 className="line-up">
              Du {new Date(event.date_start).toLocaleDateString()} au{" "}
              {new Date(event.date_end).toLocaleDateString()}
            </h6>
            <h6>{event.price_type}</h6>
            <h6>{event.audience}</h6>
            <button type="button" className="cta">
              Lien vers l&apos;événement
            </button>
          </div>
          <div className={styles["event-localisation__section"]}>
            <h6 className="line-up">{event.place.address_name}</h6>
            {event.contact_facebook && (
              <Link href={event.contact_facebook}>
                <CiFacebook />
              </Link>
            )}
            <h6>{event.place.address_street}</h6>
            <h6>{event.place.address_zipcode}</h6>
          </div>
          <EventMap events={event ? [event] : []} />
        </div>
      </aside>
    </>
  );
};

export default EventLocalisation;
