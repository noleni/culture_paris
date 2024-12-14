// app/expos/page.tsx
import EventsList from "../components/Event/EventsList";
import { getCurrentEvents } from "../../lib/events";

const ExposPage = async () => {
  try {
    const currentExpos = await getCurrentEvents("Expo");
    return <EventsList currentEvents={currentExpos} tag="Expo" />;
  } catch {
    return <p>Erreur lors de la récupération des expositions.</p>;
  }
};

export default ExposPage;
