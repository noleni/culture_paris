import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserById } from "@/lib/users";

import PublicUser from "@/app/components/User/PublicUser";
import PrivateUser from "@/app/components/User/PrivateUser";

interface Params {
  params: { slug: string }; // Modifié pour ne pas être un Promise
}

const ProfilePage = async ({ params }: Params) => {
  const { slug } = params;
  const user = await getUserById(slug);
  const session = await getServerSession(authOptions);

  if (session && session.user.id === user?.id) {
    return <PrivateUser />;
  } else {
    return <PublicUser />;
  }
};

export default ProfilePage;
