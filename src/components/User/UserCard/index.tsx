import type { User } from "../../../types/user";
import styles from "./userCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { userActions } from "../../../redux/slices/userSlice";
import Badge from "../../Common/Badge";
import IconButton from "../../Common/IconButton";
import { FiTrash2 } from "react-icons/fi";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  if (!currentUser) {
    return;
  }

  const handleDelete = () => {
    try {
      if (currentUser.role !== "manager") {
        throw new Error("Only managers can remove team members.");
      }

      if (currentUser.id === user.id) {
        throw new Error("You cannot remove yourself from the team.");
      }

      const confirmed = window.confirm(
        `Are you sure you want to remove ${user.name} from the team?`,
      );

      if (!confirmed) {
        return;
      }

      dispatch(userActions.deleteUser(user.id));
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      }
    }
  };

  return (
    <li className={styles.card}>
      <div className={styles.info}>
        <p className={styles.name}>{user.name}</p>

        <p className={styles.email}>{user.email}</p>
      </div>

      <div className={styles.action}>
        <Badge variant={user.role === "manager" ? "primary" : "neutral"}>
          {user.role}
        </Badge>

        {currentUser.role === "manager" && user.role === "member" && (
          <IconButton
            variant="danger"
            size="sm"
            type="button"
            onClick={handleDelete}
            aria-label={`Delete ${user.name}`}
            title={`Delete ${user.name}`}
          >
            <FiTrash2 />
          </IconButton>
        )}
      </div>
    </li>
  );
};

export default UserCard;
