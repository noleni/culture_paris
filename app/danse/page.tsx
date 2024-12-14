import { getCurrentEvents } from "../../lib/events";
import EventsList from "../components/Event/EventsList";

const DansePage = async () => {
  const {events, allTags} = await getCurrentEvents("Danse");

  return (
    <div>
      <div>Banner</div>
      <EventsList currentEvents={events} allTags={allTags} tag="danse" />
    </div>
  );
};

export default DansePage;
