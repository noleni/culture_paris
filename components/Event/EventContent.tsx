import EventLocalisation from "./EventLocalisation";
import type { Event } from "../../app/types/eventsTypes";
import SlickSlider from "../UI/Slider";

import styles from "./event.module.scss";

interface EventContentProps {
  event: Event;
}

const EventContent: React.FC<EventContentProps> = ({ event }) => {
  return (
    <div className={styles["event-content"]}>
      <EventLocalisation event={event} />
      <div className={styles["event-content__texts"]}>
        <p className={styles.lead_text}>{event.lead_text}</p>

        {event?.figures && event.figures?.length > 0 && (
          <SlickSlider figures={event.figures} />
        )}

        <h4>Description</h4>
        {event?.text &&
          event.text.map((section, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{
                __html: section,
              }}
            />
          ))}
        <h4>Critiques</h4>
      </div>
    </div>
  );
};

export default EventContent;
