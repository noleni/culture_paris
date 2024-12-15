"use client";
import { useState } from "react";
import { EventTag } from "../../types/eventsTypes";
import CustomAutocomplete from "../UI/Autocomplete";
import styles from "./events.module.scss";

const EventFilters: React.FC<{
  filterEvents: (filters: {
    tag: string;
    dateStart: string | number | Date;
    dateEnd: string | number | Date;
    place: string;
    zipcode: string;
  }) => void;
  allTags: EventTag[];
  allPlaces: string[];
  allZipcodes: string[];
}> = ({ filterEvents, allTags, allPlaces, allZipcodes }) => {
  const [place, setPlace] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [tagName, setTagName] = useState("");

const handleChange = (value: string, field: "place" | "zipcode" | "dateStart" | "dateEnd" | "tag") => {
  const updatedFilters = { place, zipcode, dateStart, dateEnd, tag: "" };
  updatedFilters[field] = value;

  switch (field) {
    case "place":
      setPlace(value);
      break;
    case "zipcode":
      setZipcode(value);
      break;
    case "dateStart":
      setDateStart(value);
      break;
    case "dateEnd":
      setDateEnd(value);
      break;
    case "tag":
      setTagName(value);
      break;
  }

  filterEvents({
    ...updatedFilters,
  });
};



  return (
    <div className={styles["events__filters"]}>
      <div className={styles["events__filter"]}>
        <h5>Lieu</h5>
        <CustomAutocomplete
          options={allPlaces}
          value={place}
          onChange={(newValue) => handleChange(newValue, "place")}
          placeholder="Tous les lieux"
        />
      </div>

      <div className={styles["events__filter"]}>
        <h5>Arrondissements</h5>
        <CustomAutocomplete
          options={allZipcodes}
          value={zipcode}
          onChange={(newValue) => handleChange(newValue, "zipcode")}
          placeholder="Tous les arrondissements"
        />
      </div>
      <div className={styles["events__filter"]}>
        <h5>Date</h5>
        <input type="date" id="start" name="start" />
        <input type="date" id="end" name="end" />
      </div>
      <div className={styles["events__filter"]}>
        <h5>Catégories</h5>
        <ul className={styles["events__tags"]}>
          {allTags &&
            allTags.map((tag) => (
              <li key={tag.id} className={tag.name === tagName ? styles["active"] : ""}>
                <button
                  type="button"
                  onClick={() => handleChange(tag.name, "tag")}
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
