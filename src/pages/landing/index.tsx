import { Link } from "react-router-dom";
import styles from "./landing.module.scss";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiLogOut,
  FiUsers,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authActions } from "../../redux/slices/authSlice";

const Landing = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Task Manager
        </Link>

        <nav className={styles.nav}>
          {currentUser ? (
            <>
              <span className={styles.welcome}>
                Welcome {`${currentUser.name}`}
              </span>
              <Link to="/dashboard" className={styles.dashboardButton}>
                Dashboard
              </Link>

              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className={styles.registerButton}>
                Sign in
              </Link>
              <Link to="/login" className={styles.loginLink}>
                Login
              </Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Team Project Management</span>
            <h1>
              Manage your projects.
              <br />
              <span>Empower your team</span>
            </h1>
            <p>
              A simple and professional workspace for managing projects,
              assigning tasks, and keeping your team organized.
            </p>
            <div className={styles.heroActions}>
              {currentUser ? (
                <Link to="/dashboard" className={styles.primaryButton}>
                  Go to Dashboard
                  <FiArrowRight />
                </Link>
              ) : (
                <>
                  <Link to="/register" className={styles.primaryButton}>
                    Get Started
                    <FiArrowRight />
                  </Link>

                  <Link to="/login" className={styles.secondaryButton}>
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>Features</span>
            <h2>Everything your team needs</h2>
            <p>
              Organize your work, manage your team, and keep projects moving
              forward.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <article className={styles.featureCard}>
              <FiCheckCircle />
              <h3>Task Management</h3>
              <p>
                Create tasks, assign them to team members, set priorities, and
                track their progress.
              </p>
            </article>

            <article className={styles.featureCard}>
              <FiUsers />
              <h3>Team Management</h3>
              <p>
                Manage your team members and keep everyone connected to the
                right projects.
              </p>
            </article>

            <article className={styles.featureCard}>
              <FiBarChart2 />
              <h3>Project Overview</h3>
              <p>
                Get a clear overview of your projects and monitor progress from
                one place.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to organize your team?</h2>
          <p>Create your workspace and start managing your projects today.</p>
          {currentUser ? (
            <Link to="/dashboard" className={styles.primaryButton}>
              Go to Dashboard
              <FiArrowRight />
            </Link>
          ) : (
            <Link to="/register" className={styles.primaryButton}>
              Create Your Workspace
              <FiArrowRight />
            </Link>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
