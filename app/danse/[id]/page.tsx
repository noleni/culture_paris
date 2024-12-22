import { getEventById } from "@/lib/events/events";
import Event from "../../components/Event/Event";

interface DansePageProps {
  params: { id: string };
}

const DansePage = async ({ params }: DansePageProps) => {
  const { id } = await params;

  const event = await getEventById(id);
  if (!event) return null;

  return <Event event={event} />;
};

export default DansePage;
