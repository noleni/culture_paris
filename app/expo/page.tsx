// app/expos/page.tsx
import EventsList from "../components/Event/EventsList";
import { getCurrentEvents } from "../../lib/events";

const ExposPage = async () => {
  try {
    const {events, allTags} = await getCurrentEvents("Expo");
    return <EventsList currentEvents={events} allTags={allTags} tag="Expo" />;
  } catch {
    return <p>Erreur lors de la récupération des expositions.</p>;
  }
};

export default ExposPage;
