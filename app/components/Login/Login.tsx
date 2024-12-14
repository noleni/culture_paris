import { useState } from "react";
import { LoginDropdownAvatarProps } from "./LoginDropdownAvatar";
import { signOut, useSession } from "next-auth/react";
import LoginModal from "./LoginModal";
import LoginDropdownAvatar from "./LoginDropdownAvatar";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      slug?: string;
    };
  }
}

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      {session &&
      session?.user &&
      session.user?.image &&
      session.user?.id &&
      session.user?.email ? (
        <LoginDropdownAvatar
          user={session.user as LoginDropdownAvatarProps["user"]}
          logout={() => signOut()}
        />
      ) : (
        <>
          <button onClick={toggleModal} className="cta">
            Connexion
          </button>
          <LoginModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </div>
  );
};

export default Login;
