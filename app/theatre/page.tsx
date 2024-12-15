// app/theatre/page.tsx
import EventsList from "../components/Event/Events";
import { getCurrentEvents } from "@/lib/events";

const TheatrePage = async () => {
  const { events, allTags, allPlaces, allZipcodes } = await getCurrentEvents(
    "Théâtre"
  );

  return (
    <EventsList
      currentEvents={events}
      allTags={allTags}
      allPlaces={allPlaces}
      allZipcodes={allZipcodes}
      tag="theatre"
    />
  );
};

export default TheatrePage;
