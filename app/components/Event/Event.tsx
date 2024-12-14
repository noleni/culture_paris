import EventCover from "./EventCover";
import EventContent from "./EventContent";

interface EventProps {
  event: {
    id: string;
    title: string;
    lead_text: string;
    description: string;
    cover_url: string;
    cover_alt: string;
    cover_credit: string;
    date_start: string;
    date_end: string;
    audience: string;
    contact_url: string;
    contact_mail: string;
    contact_facebook: string;
    contact_twitter: string;
    price_type: string;
    price_detail: string;
    access_type: string;
    access_link: string;
    access_link_text: string;
    tags: { id: number; name: string }[];
    place: {
      address_name: string;
      address_street: string;
      address_zipcode: string;
      latitude: number;
      longitude: number;
    };
    status?: string;
  };
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
        tags={event.tags}
        place={event.place}
        date_start={event.date_start}
        date_end={event.date_end}
        audience={event.audience}
        contact_url={event.contact_url}
        contact_mail={event.contact_mail}
        contact_facebook={event.contact_facebook}
        contact_twitter={event.contact_twitter}
        price_type={event.price_type}
        price_detail={event.price_detail}
        access_type={event.access_type}
        access_link={event.access_link}
        access_link_text={event.access_link_text}
        lead_text={event.lead_text}
        extractedDescription={extractedDescription}
        status={event.status}
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
