import ExpoDescription from "./ExpoDescription";

import styles from "./carrousel.module.scss";

interface ExpoProps {
  event: {
    id: string;
    title: string;
    lead_text: string;
    description: string;
    cover_url: string;
    cover_alt: string;
    cover_credits: string;
    tags: { id: number; name: string }[];
    place: { address_name: string; latitude: number; longitude: number };
    date_start: string;
    date_end: string;
  };
}

const Expo: React.FC<ExpoProps> = ({ event }) => {

    function extractFiguresAndText(description: string) {
      const figureRegex = /<figure[^>]*>[\s\S]*?<\/figure>/gi;
      const textRegex = /<p[^>]*>[\s\S]*?<\/p>/gi;

      const figures = description.match(figureRegex) || [];
      const extractedDescription = description.match(textRegex) || [];

      return { figures, extractedDescription };
    }

    const { figures, extractedDescription } = extractFiguresAndText(event.description);



  return (
     <div className={styles.container}>
      <ExpoDescription content={event} figures={figures} extractedDescription={extractedDescription} />
    </div>
  );
};

export default Expo;
