
import Modal from "../UI/Modal";
import Image from "next/image";
import { signIn } from "next-auth/react";

import styles from "./loginModal.module.scss";

interface LoginModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isModalOpen, setIsModalOpen }) => {


  const handleGoogleLogin = () => {
    signIn("google");
  };
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h2>Connexion</h2>
      <button onClick={handleGoogleLogin} className={styles["google-button"]}>
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
  );
};

export default LoginModal;
