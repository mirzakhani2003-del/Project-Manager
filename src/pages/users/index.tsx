import { useState } from "react";
import AddMemberFrom from "../../components/User/AddMemberForm";
import UserList from "../../components/User/UserList";
import { useAppSelector } from "../../redux/hooks";
import styles from "./users.module.scss";
import Modal from "../../components/Modal";

const Users = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [openModal, setOpenModal] = useState(false);

  if (!currentUser) {
    return;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Team Members</h1>
        <p className={styles.subtitle}>
          Manage and view the members of your team.
        </p>
      </header>

      <div className={styles.content}>
        {currentUser.role === "manager" && (
          <section className={styles.formSection}>
            <button className={styles.addMember} onClick={() => setOpenModal(true)}>Add Member</button>
            {openModal && (
              <Modal onClose={() => setOpenModal(false)}>
                <AddMemberFrom />
              </Modal>
            )}
          </section>
        )}

        <section className={styles.listSection}>
          <h2 className={styles.sectionTitle}>Team Members</h2>
          <UserList />
        </section>
      </div>
    </div>
  );
};

export default Users;
