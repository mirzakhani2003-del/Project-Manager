import styles from "./profile.module.scss";
import EditProfile from "../../components/Profile/EditProfile";
import EditPassword from "../../components/Profile/EditPassword";
import { useAppSelector } from "../../redux/hooks";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import Modal from "../../components/Modal";

const Profile = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [changeInfoModal, setChangeInfoModal] = useState(false);
  const [changePassModal, setChangePassModal] = useState(false);

  if (!currentUser) {
    return;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Profile</h1>

        <p className={styles.subtitle}>
          See and Manage your personal information.
        </p>
      </header>

      <div className={styles.container}>
        <div className={styles.hero}>
          <FaRegUserCircle />
        </div>

        <div className={styles.content}>
          <h2 className={styles.name}>{currentUser.name}</h2>

          <p className={styles.email}>{currentUser.email}</p>
          <p className={styles.role}>{currentUser.role}</p>
        </div>
      </div>

      <div className={styles.action}>
        <button onClick={() => setChangeInfoModal(true)}>
          Change Information
        </button>
        <button onClick={() => setChangePassModal(true)}>
          Change Password
        </button>
      </div>

      {changeInfoModal && (
        <Modal onClose={() => setChangeInfoModal(false)}>
          <EditProfile />
        </Modal>
      )}

      {changePassModal && (
        <Modal onClose={() => setChangePassModal(false)}>
          <EditPassword />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
