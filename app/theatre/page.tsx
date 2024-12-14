// app/theatre/page.tsx
import EventsList from "../components/Event/EventsList";
import { getCurrentEvents } from "@/lib/events";

const TheatrePage = async () => {
  const { events, allTags } = await getCurrentEvents("Théâtre");

  return <EventsList currentEvents={events} allTags={allTags} tag="theatre" />;
};

export default TheatrePage;
