import { getEventById } from "@/lib/events";
import Expo from "../../components/Expos/Expo";

interface ExpoPageProps {
  params: { id: string };
}

const ExpoPage = async ({ params }: ExpoPageProps) => {
  const { id } = await params;

  const event = await getEventById(+id);
  if (!event) return null;

  return (
    <Expo event={event} />
  );
};

export default ExpoPage;
