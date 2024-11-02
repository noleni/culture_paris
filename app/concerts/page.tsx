// app/concerts/page.tsx
import { getCurrentEvents } from "../../lib/events";
import EventsList from "../components/EventsList";

const ConcertsPage = async () => {
  const currentConcerts = await getCurrentEvents("Concert");

  return (
    <EventsList
      currentEvents={currentConcerts}
      tag="concerts"
    />
  );
};

export default ConcertsPage;
