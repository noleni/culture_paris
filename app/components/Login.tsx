import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Modal from "./UI/Modal";

import styles from "./login.module.scss";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className={styles["login-container"]}>
      <button onClick={toggleModal}>Se connecter</button>

      {/* Utilisation de la modale */}
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
    </div>
  );
};

export default Login;
