"use client";
import { useState } from "react";
import Card from "../Card";
import { Event, EventTag } from "../../types/eventsTypes";
import EventFilters from "./EventFilters";

import styles from "./events.module.scss"

type EventsListProps = {
  currentEvents: Event[];
  allTags: EventTag[];
  tag: string;
};

const EventsList: React.FC<EventsListProps> = ({ currentEvents, allTags, tag }) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(currentEvents);

  const filterEvents = (filters: { tag: EventTag, dateStart: string | number | Date, dateEnd: string | number | Date, place: string}) => {
    const filtered = currentEvents.filter((event) => {
      let isValid = true;

      if (filters.tag && (!event.tags || event.tags.indexOf(filters.tag) === -1)) {
        isValid = false;
      }

      if (filters.dateStart && new Date(event.date_start) < new Date(filters.dateStart)) {
        isValid = false;
      }

      if (filters.dateEnd && new Date(event.date_end) > new Date(filters.dateEnd)) {
        isValid = false;
      }

      if (filters.place && event.place?.address_name.toLowerCase().indexOf(filters.place.toLowerCase()) === -1) {
        isValid = false;
      }

      return isValid;
    });

    setFilteredEvents(filtered);
  }

  return (
    <div className={styles.events}>
      <div className={styles.events__banner}></div>
      <div className={styles.events__content}>
        <EventFilters filterEvents={filterEvents} allTags={allTags} />
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
      </div>
    </div>
  );
};

export default EventsList;
