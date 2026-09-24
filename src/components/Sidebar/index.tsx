import { Link, NavLink } from "react-router-dom";
import styles from "./sidebar.module.scss";
import {
  FiBarChart2,
  FiCheckSquare,
  FiFolder,
  FiUsers,
  FiUser,
} from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <aside className={`${styles.sideBar} ${isOpen ? styles.open : ""}`}>
      <Link to="/" className={styles.logo}>
        <h2>Task Manager</h2>
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
          onClick={onClose}
        >
          <FiBarChart2 />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
          onClick={onClose}
        >
          <FiFolder />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
          onClick={onClose}
        >
          <FiCheckSquare />
          <span>Tasks</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
          onClick={onClose}
        >
          <FiUsers />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
          onClick={onClose}
        >
          <FiUser />
          <span>Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
