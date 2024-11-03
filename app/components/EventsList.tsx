"use client";
import Card from "./Card";

interface Event {
  id: number;
  title: string;
  cover_url: string;
  cover_alt: string;
  audience: string;
  place: {
    address_name: string;
  };
  date_start: Date;
  date_end: Date;
}

interface EventsListProps {
  currentEvents: Event[]; // tableau d'événements
  tag: string;
}

const EventsList: React.FC<EventsListProps> = ({
  currentEvents,
  tag
}) => {
  return (
    <div>
      <div className="filters">
        <button className="cta">Aujourd&apos;hui</button>
        <button className="cta">Ce week-end</button>
        <button className="cta">A venir</button>
        <button className="cta">Adaptées aux plus petits</button>
      </div>
      <div className="grid">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <Card
              key={event.id}
              title={event.title}
              audience={event.audience}
              cover_url={event.cover_url}
              cover_alt={event.cover_alt}
              address_name={event.place?.address_name}
              date_start={event.date_start}
              date_end={event.date_end}
              href={`/${tag}/${event.id}`}
            />
          ))
        ) : (
          <p>Aucun événement trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default EventsList;
