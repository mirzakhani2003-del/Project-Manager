import styles from "./profile.module.scss";
import EditProfile from "../../components/Profile/EditProfile";
import EditPassword from "../../components/Profile/EditPassword";
import { useAppSelector } from "../../redux/hooks";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import Badge from "../../components/Common/Badge";
import Card from "../../components/Common/Card";
import Button from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";

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
        <div>
          <h1 className={styles.title}>My Profile</h1>

          <p className={styles.subtitle}>
            View and manage your personal account information.
          </p>
        </div>
      </header>

      <section className={styles.profileCard}>
        <div className={styles.profileHero}>
          <div className={styles.avatar}>
            <FaRegUserCircle />
          </div>

          <div className={styles.profileInfo}>
            <h2 className={styles.name}>{currentUser.name}</h2>

            <p className={styles.email}>{currentUser.email}</p>

            <Badge
              variant={currentUser.role === "manager" ? "primary" : "neutral"}
            >
              {currentUser.role}
            </Badge>
          </div>
        </div>
      </section>

      <div className={styles.grid}>
        <Card className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Account Information</h2>

              <p className={styles.cardDescription}>
                Your basic account information.
              </p>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.label}>Full Name</span>

              <span className={styles.value}>{currentUser.name}</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.label}>Email Address</span>

              <span className={styles.value}>{currentUser.email}</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.label}>Role</span>

              <span className={styles.value}>{currentUser.role}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              variant="secondary"
              onClick={() => setChangeInfoModal(true)}
            >
              Change Information
            </Button>
          </div>
        </Card>

        <Card className={styles.securityCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Security</h2>

              <p className={styles.cardDescription}>
                Manage your account password and security.
              </p>
            </div>
          </div>

          <div className={styles.securityContent}>
            <div>
              <h3 className={styles.securityTitle}>Password</h3>

              <p className={styles.securityDescription}>
                Keep your account secure by using a strong password.
              </p>
            </div>

            <Button
              variant="secondary"
              onClick={() => setChangePassModal(true)}
            >
              Change Password
            </Button>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={changeInfoModal}
        onClose={() => setChangeInfoModal(false)}
        title="Change Information"
      >
        <EditProfile />
      </Modal>

      <Modal
        isOpen={changePassModal}
        onClose={() => setChangePassModal(false)}
        title="Change Password"
      >
        <EditPassword />
      </Modal>
    </div>
  );
};

export default Profile;
