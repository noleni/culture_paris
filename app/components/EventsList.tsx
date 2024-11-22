"use client";
import Card from "./Card";
import { EventWithRelations } from "../../lib/events";

type EventsListProps = {
  currentEvents: EventWithRelations[];
  tag: string;
};

const EventsList: React.FC<EventsListProps> = ({ currentEvents, tag }) => {
  return (
    <div>
      <div className="filters">
        <button className="cta">Aujourd&apos;hui</button>
        <button className="cta">Ce week-end</button>
        <button className="cta">A venir</button>
      </div>
      <div className="grid">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <Card
              key={event.id}
              title={event.title}
              cover_url={event.cover_url}
              cover_credit={event.cover_credit}
              cover_alt={event.cover_alt}
              address_name={event.place?.address_name || ""}
              date_start={event.date_start}
              date_end={event.date_end}
              href={`/${tag.toLowerCase()}/${event.id}`}
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
