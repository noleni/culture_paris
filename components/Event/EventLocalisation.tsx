import { useState } from "react";
import type { Event } from "../../app/types/eventsTypes";
import EventMap from "./EventMap";
import Rater from "../UI/Rater";
import LoginModal from "../Login/LoginModal";
import { CiEdit } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { addOrDeleteWish } from "@/lib/wish";
import Link from "next/link";
import styles from "./event.module.scss";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { getFirstPathSegment } from "@/app/utils/getFirstPathSegment";

interface EventLocalisationProps {
  event: Event;
}

const EventLocalisation: React.FC<EventLocalisationProps> = ({ event }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { data: session } = useSession();
  const firstPathSegment = getFirstPathSegment(usePathname());

  const handleWish = async () => {
    if (!session) {
      setLoginModalOpen(true);
      return;
    }
    try {
      await addOrDeleteWish(event.id, session.user.id, firstPathSegment);
    } catch (error) {
      console.error("Erreur lors de l'ajout du wish", error);
    }
  }

  return (
    <>
      {loginModalOpen && (
        <LoginModal
          isModalOpen={loginModalOpen}
          setIsModalOpen={setLoginModalOpen}
        />
      )}
      <aside className={styles.event_localisation}>
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
          <button onClick={handleWish}>
            <CiHeart size={30} className={event?.isWished ? styles.active : ""}/>
            Ajouter à mes envies
          </button>
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

export default EventLocalisation;
