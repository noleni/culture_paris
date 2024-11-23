import { IoCloseOutline } from "react-icons/io5";
import styles from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null; // Rend la modale invisible si elle est fermée

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modalContent}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <IoCloseOutline />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
