import EventLocalisation from "./EventLocalisation";
import type { Event } from "../../types/eventsTypes";

import styles from "./eventContent.module.scss";

interface EventContentProps {
  event: Event;
  extractedDescription: string[];
}

const EventContent: React.FC<EventContentProps> = ({event, extractedDescription}) => {
  return (
    <div className={styles["event-content"]}>
      <EventLocalisation
        event={event}
      />
      <div className={styles["event-content__texts"]}>
        <p>{event.lead_text}</p>

        <h5>Description</h5>
        {extractedDescription.map((section, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{
              __html: section,
            }}
          />
        ))}
        <h5>Critiques</h5>
      </div>
    </div>
  );
};

export default EventContent;
