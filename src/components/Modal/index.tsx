import type { ReactNode } from "react";
import styles from "./modal.module.scss";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
