import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

import styles from "./rater.module.scss";

interface RaterProps {
  rating: number;
  setRating: (rating: number) => void;
}

const Rater: React.FC<RaterProps> = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0); // État pour gérer le survol des étoiles

  return (
    <div className={styles.rater}>
      <p>Ma note :</p>
      {[...Array(10)].map((_, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)} // Met à jour la note sélectionnée
            />
            <FaStar
              className="star"
              size={18}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} // Condition pour la couleur
              onMouseEnter={() => setHover(ratingValue)} // Définit la valeur de survol
              onMouseLeave={() => setHover(0)} // Réinitialise la valeur de survol
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rater;
