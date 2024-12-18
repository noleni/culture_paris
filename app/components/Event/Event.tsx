import Image from "next/image";
import EventContent from "./EventContent";
import type { Event } from "../../types/eventsTypes";

import styles from "./eventCover.module.scss";

interface EventProps {
  event: Event;
}

const Event: React.FC<EventProps> = ({ event }) => {
  function extractFiguresAndText(description: string) {
    const figureRegex = /<figure[^>]*>[\s\S]*?<\/figure>/gi;
    const textRegex = /<p[^>]*>[\s\S]*?<\/p>/gi;

    const figures = description.match(figureRegex) || [];
    const extractedDescription = description.match(textRegex) || [];

    return { figures, extractedDescription };
  }

  const { extractedDescription } = extractFiguresAndText(event.description);

  return (
    <div className={styles.event}>
      <div className={styles.cover}>
        {event.cover_url && (
          <div className={styles.cover_image}>
            <div className={styles.cover_title}>
              <h1>{event.title}</h1>
            </div>
            <Image src={event.cover_url} alt={event.cover_alt} priority fill />

            <small>© {event.cover_credit}</small>
          </div>
        )}
      </div>
      <EventContent event={event} extractedDescription={extractedDescription} />
      {/* {figures.length > 0 && (
          <Slider {...sliderSettings}>
            {figures.map((figure, index) => (
              <div
                key={index}
                className="figure-slide"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(figure),
                }}
              />
            ))}
          </Slider>
        )} */}
    </div>
  );
};

export default Event;
