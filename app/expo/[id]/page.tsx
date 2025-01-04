import { getEventById } from "@/lib/events/events";
import Event from "../../../components/Event/EventItem/Event";

interface ExpoPageProps {
  params: { id: string };
}

const ExpoPage = async ({ params }: ExpoPageProps) => {
  const { id } = await params;

  const event = await getEventById(id);
  if (!event) return null;

  return <Event event={event} />;
};

export default ExpoPage;
