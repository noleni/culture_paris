"use client";
import Card from "./Card";

interface Event {
  id: number;
  title: string;
  cover_url: string;
  cover_alt: string;
  place: {
    address_name: string;
  };
  date_start: Date;
  date_end: Date;
}

interface EventsListProps {
  currentEvents: Event[]; // tableau d'événements
  toComeEvents: Event[]; // tableau d'événements à venir
}

const EventsList: React.FC<EventsListProps> = ({
  currentEvents,
  toComeEvents,
}) => {
  return (
    <div>
      <h2>Actuellement</h2>
      <div className="carroussel">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <Card
              key={event.id}
              title={event.title}
              cover_url={event.cover_url}
              cover_alt={event.cover_alt}
              address_name={event.place?.address_name}
              date_start={event.date_start.toLocaleDateString()}
              date_end={event.date_end.toLocaleDateString()}
              onClick={() => console.log("Click on event", event.id)}
            />
          ))
        ) : (
          <p>Aucun événement trouvé.</p>
        )}
      </div>
      <h2>À venir</h2>
      <div className="carroussel">
        {toComeEvents.length > 0 ? (
          toComeEvents.map((event) => (
            <Card
              key={event.id}
              title={event.title}
              cover_url={event.cover_url}
              cover_alt={event.cover_alt}
              address_name={event.place?.address_name}
              date_start={event.date_start.toLocaleDateString()}
              date_end={event.date_end.toLocaleDateString()}
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
