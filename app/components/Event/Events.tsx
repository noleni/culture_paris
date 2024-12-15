"use client";
import { useState } from "react";
import { Event, EventTag } from "../../types/eventsTypes";
import EventFilters from "./EventFilters";
import EventsList from "./EventsList";
import EventMap from "./EventMap";
import { CiMap } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";

import styles from "./events.module.scss";

type EventsListProps = {
  currentEvents: Event[];
  allTags: EventTag[];
  allPlaces: string[];
  allZipcodes: string[];
  tag: string;
};

const Events: React.FC<EventsListProps> = ({
  currentEvents,
  allTags,
  allPlaces,
  allZipcodes,
  tag,
}) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(currentEvents);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const filterEvents = (filters: {
    tag: string;
    dateStart: string | number | Date;
    dateEnd: string | number | Date;
    place: string;
    zipcode: string;
  }) => {
    const filtered = currentEvents.filter((event) => {
      let isValid = true;

      if (
        filters.tag &&
        (!event.tags || event.tags.every((tag) => tag.name !== filters.tag))
      ) {
        isValid = false;
      }

      if (
        filters.dateStart &&
        new Date(event.date_start) < new Date(filters.dateStart)
      ) {
        isValid = false;
      }

      if (
        filters.dateEnd &&
        new Date(event.date_end) > new Date(filters.dateEnd)
      ) {
        isValid = false;
      }

      if (
        filters.place &&
        event.place?.address_name
          .toLowerCase()
          .indexOf(filters.place.toLowerCase()) === -1
      ) {
        isValid = false;
      }

      if (
        filters.zipcode &&
        event.place?.address_zipcode
          .toLowerCase()
          .indexOf(filters.zipcode.toLowerCase()) === -1
      ) {
        isValid = false;
      }

      return isValid;
    });

    setFilteredEvents(filtered);
  };

  return (
    <div className={styles.events}>
      <div className={styles.events__banner}>
        <button
          className={styles.events__toggle}
          onClick={() => setIsMapVisible(!isMapVisible)}
        >
          {isMapVisible ? <CiGrid41 /> : <CiMap />}
          {isMapVisible ? "Afficher la liste" : "Afficher la carte"}
        </button>
      </div>
      <div className={styles.events__content}>
        <EventFilters
          filterEvents={filterEvents}
          allTags={allTags}
          allPlaces={allPlaces}
          allZipcodes={allZipcodes}
        />
       {isMapVisible ? <EventMap tag={tag} events={filteredEvents} />
        :
        <EventsList tag={tag} filteredEvents={filteredEvents} />
        }
      </div>
    </div>
  );
};

export default Events;
