// app/concerts/page.tsx
import { getCurrentEvents, getToComeEvents } from "../../lib/events";
import EventsList from "../components/EventsList";

const ConcertsPage = async () => {
  const currentConcerts = await getCurrentEvents("Concert");
  const toComeConcerts = await getToComeEvents("Concert");

  return (
    <EventsList
      currentEvents={currentConcerts}
      toComeEvents={toComeConcerts}
      tag="concerts"
    />
  );
};

export default ConcertsPage;
