// app/expos/page.tsx
import EventsList from "../components/EventsList";
import { getCurrentEvents, getToComeEvents } from "../../lib/events";


const ExposPage = async () => {
  const currentExpos = await getCurrentEvents("Expo");
  const toComeExpos = await getToComeEvents("Expo");

  return (
    <EventsList
      currentEvents={currentExpos}
      toComeEvents={toComeExpos}
    />
  );
};

export default ExposPage;
