// app/concerts/page.tsx
import { getCurrentEvents } from "../../lib/events/events";
import EventsList from "../components/Event/Events";

const ConcertsPage = async () => {
  const { events, allTags, allPlaces, allZipcodes } = await getCurrentEvents(
    "Concert"
  );

  return (
    <EventsList
      currentEvents={events}
      allTags={allTags}
      allPlaces={allPlaces}
      allZipcodes={allZipcodes}
      tag="concert"
    />
  );
};

export default ConcertsPage;
