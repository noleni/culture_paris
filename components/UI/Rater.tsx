import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { getFirstPathSegment } from "@/app/utils/getFirstPathSegment";
import { addOrUpdateRating } from "@/lib/rating";

import styles from "./rater.module.scss";

interface RaterProps {
  setLoginModalOpen: (value: boolean) => void;
  rating: number;
}

const Rater: React.FC<RaterProps> = (props: RaterProps) => {
  const [hover, setHover] = useState(0);
  const firstPathSegment = getFirstPathSegment(usePathname());
  const { data: session } = useSession();
  const { id } = useParams() as { id: string };

  const handleRating = async (rating: number) => {
    if (!session) {
      props.setLoginModalOpen(true);
      return;
    }

    try {
      await addOrUpdateRating(id, session.user.id, rating, firstPathSegment); 
    } catch (error) {
      console.error("Erreur lors de l'ajout du rating", error);
    }
  };

  return (
    <form className={styles.rater}>
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
              size={20}
              color={
                ratingValue <= (hover || props.rating) ? "#ffc107" : "#e4e5e9"
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </form>
  );
};

export default Rater;
