// app/theatre/page.tsx
import EventsList from "../components/EventsList";
import { getCurrentEvents, getToComeEvents } from "@/lib/events";

const TheatrePage = async () => {
  const currentTheatre = await getCurrentEvents("Théâtre");
  const toComeTheatre = await getToComeEvents("Théâtre");

  return (
    <EventsList
      currentEvents={currentTheatre}
      toComeEvents={toComeTheatre}
      tag="theatre"
    />
  );
};

export default TheatrePage;
