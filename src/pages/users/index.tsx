import AddMemberFrom from "../../components/AddMemberForm";
import UserList from "../../components/UserList";
import { useAppSelector } from "../../redux/hooks";
import styles from "./users.module.scss";

const Users = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Team Members</h1>
        <p className={styles.subtitle}>
          Manage and view the members of your team.
        </p>
      </header>

      <div className={styles.content}>
        {currentUser?.role === "manager" && (
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Add Member</h2>
            <AddMemberFrom />
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
