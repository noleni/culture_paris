// app/expos/page.tsx
import EventsList from "../components/EventsList";
import { getCurrentEvents } from "../../lib/events";


const ExposPage = async () => {
  const currentExpos = await getCurrentEvents("Expo");

  return (
    <EventsList
      currentEvents={currentExpos}
      tag="expos"
    />
  );
};

export default ExposPage;
