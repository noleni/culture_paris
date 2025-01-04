// app/concerts/page.tsx
import { getCurrentEvents } from "../../lib/events/events";
import EventsList from "../../components/Event/Events";

const JeunePublicPage = async () => {
  const { events, allTags, allPlaces, allZipcodes } = await getCurrentEvents(
    "Enfants"
  );

  return (
    <EventsList
      currentEvents={events}
      allTags={allTags}
      allPlaces={allPlaces}
      allZipcodes={allZipcodes}
      tag="jeune-public"
    />
  );
};

export default JeunePublicPage;
