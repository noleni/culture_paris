import { useState } from "react";
import Link from "next/link";
import type { Event } from "@/app/types/eventsTypes";
import EventMap from "../EventMap";
import Rater from "@/components/UI/Rater";
import LoginModal from "@/components/Login/LoginModal";
import WishToogler from "@/components/Wish/WishToogler";
import { CiEdit } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import styles from "./event.module.scss";

interface EventAsideProps {
  event: Event;
}

const EventAside: React.FC<EventAsideProps> = ({ event }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      {loginModalOpen && (
        <LoginModal
          isModalOpen={loginModalOpen}
          setIsModalOpen={setLoginModalOpen}
        />
      )}
      <aside>
        <div
          className={`${styles.event_localisation__user_actions} ${styles.event_localisation__section}`}
        >
          <div className={styles.event_localisation__rating}>
            <h6>Ma note :</h6>
            {event?.userRating && <h6>{event.userRating}</h6>}
          </div>
          <Rater
            rating={event?.userRating || 0}
            setLoginModalOpen={setLoginModalOpen}
          />
          <button type="button">
            <CiEdit size={30} />
            Ecrire un avis
          </button>
          <WishToogler
            className={event?.isWished ? "active" : ""}
            id={event.id}
            setLoginModalOpen={setLoginModalOpen}
            withText={true}
          />
        </div>
        <div className={styles.event_localisation__infos}>
          {/* <div className={styles["event-localisation__section"]}>
            <h6>
              Du {new Date(event.date_start).toLocaleDateString()} au{" "}
              {new Date(event.date_end).toLocaleDateString()}
            </h6>
            <h6>{event.price_type}</h6>
            <h6>{event.audience}</h6>
            <button type="button" className="cta">
              Lien vers l&apos;événement
            </button>
          </div> */}
          <div className={styles.event_localisation__section}>
            <h6>{event.place.address_name}</h6>
            {event.contact_facebook && (
              <Link href={event.contact_facebook}>
                <CiFacebook size={30} />
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

export default EventAside;
