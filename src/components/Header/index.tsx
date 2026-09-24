import styles from "./header.module.scss";
import { FiBell, FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authActions } from "../../redux/slices/authSlice";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label="Toggle navigation menu"
      >
        <FiMenu />
      </button>
      <div>
        <h1>Task Manager</h1>
        {currentUser && <p>Welcome, {currentUser.name}</p>}
      </div>

      <div className={styles.actions}>
        <button className={styles.notificationButton} type="button">
          <FiBell />
        </button>
        <button
          className={styles.logoutButton}
          type="button"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
