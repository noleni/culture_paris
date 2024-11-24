import { useState } from "react";
import { LoginDropdownAvatarProps } from "./LoginDropdownAvatar";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Modal from "../UI/Modal";
import LoginDropdownAvatar from "./LoginDropdownAvatar";

import styles from "./login.module.scss";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  console.log(session);

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className={styles["login-container"]}>
      {session &&
      session?.user &&
      session.user?.image &&
      session.user?.image &&
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

          <Modal isOpen={isModalOpen} onClose={toggleModal}>
            <h2>Connexion</h2>
            <button
              onClick={handleGoogleLogin}
              className={styles["google-button"]}
            >
              <Image
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
                width={20}
                height={20}
              />
              Se connecter avec Google
            </button>
            <hr />
            <form>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" required />
              <button type="submit">Se connecter</button>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Login;
