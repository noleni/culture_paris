import { Event } from "../../types/eventsTypes";
import Card from "../Card";

import styles from "./events.module.scss";

interface EventsListProps {
  tag: string;
  filteredEvents: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ tag, filteredEvents }) => {
  return (
    <div className={styles.events__list + " grid"}>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <Card
            key={event.id}
            title={event.title}
            cover_url={event.cover_url}
            cover_credit={event.cover_credit}
            cover_alt={event.cover_alt}
            address_name={event.place?.address_name || ""}
            date_start={event.date_start}
            date_end={event.date_end}
            href={`/${tag.toLowerCase()}/${event.id}`}
          />
        ))
      ) : (
        <p>Aucun événement trouvé.</p>
      )}
    </div>
  );
};

export default EventsList;
