import { getEventById } from "@/lib/events/events";
import Event from "../../../components/Event/EventItem/Event";

interface JeunePublicPageProps {
  params: { id: string };
}

const JeunePublicPage = async ({ params }: JeunePublicPageProps) => {
  const { id } = await params;

  const event = await getEventById(id);
  if (!event) return null;

  return <Event event={event} />;
};

export default JeunePublicPage;
