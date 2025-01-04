import { getEventById } from "@/lib/events/events";
import Event from "../../../components/Event/EventItem/Event";

interface ConcertPageProps {
  params: { id: string };
}

const ConcertPage = async ({ params }: ConcertPageProps) => {
  const { id } = await params;

  const event = await getEventById(id);
  if (!event) return null;

  return <Event event={event} />;
};

export default ConcertPage;
