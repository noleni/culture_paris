import { getCurrentEvents } from "../../lib/events";
import EventsList from "../components/Event/EventsList";

const DansePage = async () => {
  const currentDanse = await getCurrentEvents("Danse");

  return <EventsList currentEvents={currentDanse} tag="danse" />;
};

export default DansePage;
