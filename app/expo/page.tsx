// app/expos/page.tsx
import EventsList from "../components/Event/Events";
import { getCurrentEvents } from "../../lib/events/events";

const ExposPage = async () => {
  try {
    const { events, allTags, allPlaces, allZipcodes } = await getCurrentEvents(
      "Expo"
    );
    return (
      <EventsList
        currentEvents={events}
        allTags={allTags}
        allPlaces={allPlaces}
        allZipcodes={allZipcodes}
        tag="Expo"
      />
    );
  } catch {
    return <p>Erreur lors de la récupération des expositions.</p>;
  }
};

export default ExposPage;
