// app/theatre/page.tsx
import EventsList from "../components/EventsList";
import { getCurrentEvents } from "@/lib/events";

const TheatrePage = async () => {
  const currentTheatre = await getCurrentEvents("Théâtre");

  return (
    <EventsList
      currentEvents={currentTheatre}
      tag="theatre"
    />
  );
};

export default TheatrePage;
