import { useState } from "react";
import AddMemberFrom from "../../components/User/AddMemberForm";
import UserList from "../../components/User/UserList";
import { useAppSelector } from "../../redux/hooks";
import styles from "./users.module.scss";
import Button from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";

const Users = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [openModal, setOpenModal] = useState(false);

  if (!currentUser) {
    return;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Team Members</h1>

          <p className={styles.subtitle}>
            Manage and view the members of your team.
          </p>
        </div>

        {currentUser.role === "manager" && (
          <Button onClick={() => setOpenModal(true)}>Add Member</Button>
        )}
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Team Members</h2>

            <p className={styles.sectionDescription}>
              View and manage the members of your team.
            </p>
          </div>
        </div>

        <UserList />
      </section>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Add Team Member"
      >
        <AddMemberFrom />
      </Modal>
    </div>
  );
};

export default Users;
