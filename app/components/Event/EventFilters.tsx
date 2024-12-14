"use client";
import { EventTag } from "../../types/eventsTypes";

import styles from "./events.module.scss";

const EventFilters: React.FC<{
  filterEvents: (filters: {
    tag: EventTag;
    dateStart: string | number | Date;
    dateEnd: string | number | Date;
    place: string;
  }) => void;
  allTags: EventTag[];
}> = ({ filterEvents, allTags }) => {
  return (
    <div className={styles["events__filters"]}>
      <div className={styles["events__filter"]}>
        <h3>Lieu</h3>
        <input type="text" id="place" name="place" />
      </div>
      <div className={styles["events__filter"]}>
        <h3>Arrondissement</h3>
        <input type="text" id="place" name="place" />
      </div>
      <div className={styles["events__filter"]}>
        <h3>Date</h3>
        <input type="date" id="start" name="start" />
        <input type="date" id="end" name="end" />
      </div>
      <div className={styles["events__filter"]}>
        <h3>Tags</h3>
        <ul>
          {allTags &&
            allTags.map((tag) => (
              <li key={tag.id}>
                <button
                  type="button"
                  onClick={() =>
                    filterEvents({
                      tag: tag,
                      dateStart: "",
                      dateEnd: "",
                      place: "",
                    })
                  }
                >
                  {tag.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EventFilters;
