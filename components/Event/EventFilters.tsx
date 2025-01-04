"use client";
import { useState } from "react";
import { EventTag } from "../../app/types/eventsTypes";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { HiChevronDoubleRight } from "react-icons/hi2";
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
  const [showFilters, setShowFilters] = useState(true);

  const handleChange = (
    value: string,
    field: "place" | "zipcode" | "dateStart" | "dateEnd" | "tag"
  ) => {
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
    <div
      className={`${styles.events_filters} ${
        showFilters
          ? styles["events_filters--show"]
          : styles["events_filters--hide"]
      }`}
    >
      {showFilters ? (
        <>
          <HiChevronDoubleLeft
            className={styles["events__filters__toggle"]}
            onClick={() => setShowFilters(false)}
          />
          <div className={styles["events__filter"]}>
            <h6>Lieu</h6>
            <CustomAutocomplete
              options={allPlaces}
              value={place}
              onChange={(newValue) => handleChange(newValue, "place")}
              placeholder="Rechercher..."
            />
          </div>

          <div className={styles["events__filter"]}>
            <h6 className="line-up">Arrondissements</h6>
            <CustomAutocomplete
              options={allZipcodes}
              value={zipcode}
              onChange={(newValue) => handleChange(newValue, "zipcode")}
              placeholder="Rechercher..."
            />
          </div>
          <div className={styles["events__filter"]}>
            <h6 className="line-up">Date</h6>
            <input type="date" id="start" name="start" />
            <input type="date" id="end" name="end" />
          </div>
          <div className={styles["events__filter"]}>
            <h6 className="line-up">Catégories</h6>
            <ul className={styles["events__tags"]}>
              {allTags &&
                allTags.map((tag) => (
                  <li
                    key={tag.id}
                    className={tag.name === tagName ? styles["active"] : ""}
                  >
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
          <button
            type="button"
            className="cta"
            onClick={() => {
              setPlace("");
              setZipcode("");
              setDateStart("");
              setDateEnd("");
              setTagName("");
              filterEvents({
                tag: "",
                dateStart: "",
                dateEnd: "",
                place: "",
                zipcode: "",
              });
            }}
          >
            Réinitialiser les filtres
          </button>
        </>
      ) : (
        <HiChevronDoubleRight
          className={styles["events__filters__toggle"]}
          onClick={() => setShowFilters(true)}
        />
      )}
    </div>
  );
};

export default EventFilters;
