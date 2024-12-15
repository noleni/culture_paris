import { getCurrentEvents } from "../../lib/events";
import EventsList from "../components/Event/EventsList";

const DansePage = async () => {
  const {events, allTags, allPlaces, allZipcodes} = await getCurrentEvents("Danse");

  return (
    <div>
      <div>Banner</div>
      <EventsList
        currentEvents={events}
        allTags={allTags}
        allPlaces={allPlaces}
        allZipcodes={allZipcodes}
        tag="danse"
      />
    </div>
  );
};

export default DansePage;
