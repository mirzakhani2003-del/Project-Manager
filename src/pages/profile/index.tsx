import styles from "./profile.module.scss";
import EditProfile from "../../components/EditProfile";
import EditPassword from "../../components/EditPassword";

const Profile = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Profile</h1>

        <p className={styles.subtitle}>Manage your personal information.</p>
      </header>

      <div className={styles.sectionContainer}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>

          <EditProfile />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Change Password</h2>

          <EditPassword />
        </section>
      </div>
    </div>
  );
};

export default Profile;
