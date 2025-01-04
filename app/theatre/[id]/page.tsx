import { getEventById } from "@/lib/events/events";
import Event from "../../../components/Event/EventItem/Event";

interface TheatrePageProps {
  params: { id: string };
}

const TheatrePage = async ({ params }: TheatrePageProps) => {
  const { id } = await params;

  const event = await getEventById(id);
  if (!event) return null;

  return <Event event={event} />;
};

export default TheatrePage;
