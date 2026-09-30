import styles from "./header.module.scss";
import { FiBell, FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { authActions } from "../../../redux/slices/authSlice";
import IconButton from "../../Common/IconButton";
import Badge from "../../Common/Badge";
import Button from "../../Common/Button";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.notifications.notifications,
  );

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  if (!currentUser) {
    return;
  }

  const userNotifications = notifications.filter(
    (notification) =>
      notification.teamId === currentUser.teamId &&
      notification.userId === currentUser.id,
  );

  const unreadNotifications = userNotifications.filter(
    (notification) => notification.isRead === false,
  );

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <IconButton
          className={styles.menuButton}
          variant="ghost"
          aria-label="Toggle navigation menu"
          onClick={onMenuClick}
        >
          <FiMenu />
        </IconButton>

        <div className={styles.heading}>
          <h1>Task Manager</h1>
          <p>Welcome, {currentUser.name}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <IconButton
          variant="ghost"
          aria-label="Notifications"
          className={styles.notificationButton}
          onClick={() => navigate("/notifications")}
        >
          <FiBell />

          {unreadNotifications.length > 0 && (
            <Badge variant="danger" className={styles.notificationBadge}>
              {unreadNotifications.length > 99
                ? "99+"
                : unreadNotifications.length}
            </Badge>
          )}
        </IconButton>

        <Button variant="secondary" size="sm" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
