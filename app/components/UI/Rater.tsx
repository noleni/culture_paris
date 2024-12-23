import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { addOrUpdateRating } from "@/lib/rating";

import styles from "./rater.module.scss";

interface RaterProps {
  setLoginModalOpen: (value: boolean) => void;
  rating: number;
}

const Rater: React.FC<RaterProps> = (props: RaterProps) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(props.rating || 0);
  const { data: session } = useSession();
  const { id } = useParams() as { id: string };

  const handleRating = async (rating: number) => {
    if (!session) {
      props.setLoginModalOpen(true);
      return;
    }

    try {
      await addOrUpdateRating(id, session.user.id, rating); // Appelle directement la fonction côté serveur
      setRating(rating);
      console.log("Rating ajouté !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du rating", error);
    }
  };

  return (
    <form className={styles.rater}>
      <p>Ma note :</p>
      {[...Array(10)].map((_, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <FaStar
              className="star"
              size={18}
              color={
                ratingValue <= (hover || rating || 0)
                  ? "#ffc107"
                  : "#e4e5e9"
              } // Condition pour la couleur
              onMouseEnter={() => setHover(ratingValue)} // Définit la valeur de survol
              onMouseLeave={() => setHover(0)} // Réinitialise la valeur de survol
            />
          </label>
        );
      })}
    </form>
  );
};

export default Rater;
