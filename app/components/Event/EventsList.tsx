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
            event={event}
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
