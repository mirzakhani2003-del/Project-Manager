import ProjectForm from "../../components/Project/ProjectForm";
import ProjectList from "../../components/Project/ProjectList";
import { useAppSelector } from "../../redux/hooks";
import styles from "./project.module.scss";

const Projects = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  if (!currentUser) {
    return;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>

        <p className={styles.subtitle}>
          Manage and view the projects of your team.
        </p>
      </header>

      <div className={styles.content}>
        {currentUser.role === "manager" && (
          <section className={styles.section}>
            <h2>Create Project</h2>
            <ProjectForm />
          </section>
        )}

        <section className={styles.section}>
          <h2>Projects on your team</h2>
          <ProjectList />
        </section>
      </div>
    </div>
  );
};

export default Projects;
