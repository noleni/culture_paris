// app/concerts/page.tsx
import { getCurrentEvents } from "../../lib/events";
import EventsList from "../components/Event/EventsList";

const ConcertsPage = async () => {
  const {events, allTags} = await getCurrentEvents("Concert");

  return <EventsList currentEvents={events} allTags={allTags} tag="concert" />;
};

export default ConcertsPage;
