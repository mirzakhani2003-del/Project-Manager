import { useAppSelector } from "../../../redux/hooks";
import UserCard from "../UserCard";
import styles from "./userList.module.scss";

const UserList = () => {
  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  if (!currentUser) {
    return;
  }

  const teamUser = users.filter((user) => user.teamId === currentUser.teamId);

  return (
    <>
      {teamUser.length === 0 ? (
        <p className={styles.empty}>No team member found.</p>
      ) : (
        <ul className={styles.list}>
          {teamUser.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
};

export default UserList;
