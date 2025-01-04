import { CiHeart } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { getFirstPathSegment } from "@/app/utils/getFirstPathSegment";
import { addOrDeleteWish } from "@/lib/wish";

interface WishTooglerProps {
  id: string;
  className?: string;
  setLoginModalOpen: (value: boolean) => void;
  withText?: boolean;
}

const WishToogler: React.FC<WishTooglerProps> = ({
  id,
  className,
  setLoginModalOpen,
  withText,
}) => {
  const { data: session } = useSession();
  const firstPathSegment = getFirstPathSegment(usePathname());
  const handleWish = async () => {
    if (!session) {
      setLoginModalOpen(true);
      return;
    }
    try {
      await addOrDeleteWish(id, session.user.id, firstPathSegment);
    } catch (error) {
      console.error("Erreur lors de l'ajout du wish", error);
    }
  };
  return (
    <button onClick={handleWish}>
      <CiHeart size={30} className={className} />
      {withText && <span>Ajouter à mes envies</span>}
    </button>
  );
};
export default WishToogler;
