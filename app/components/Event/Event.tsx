import EventCover from "./EventCover";
import EventContent from "./EventContent";
import type { Event } from "../../types/eventsTypes";

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

  const { extractedDescription } = extractFiguresAndText(
    event.description
  );

  return (
    <div>
      <EventCover
        cover_url={event.cover_url}
        cover_alt={event.cover_alt}
        cover_credit={event.cover_credit}
        title={event.title}
      />
      <EventContent
        event={event}
        extractedDescription={extractedDescription}
      />
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
