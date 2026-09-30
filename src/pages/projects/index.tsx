import { useState } from "react";

import ProjectForm from "../../components/Project/ProjectForm";
import ProjectList from "../../components/Project/ProjectList";
import { useAppSelector } from "../../redux/hooks";
import styles from "./project.module.scss";
import Button from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";

const Projects = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [openModal, setOpenModal] = useState(false);

  if (!currentUser) {
    return;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Projects</h1>

          <p className={styles.subtitle}>
            Manage and view the projects of your team.
          </p>
        </div>

        {currentUser.role === "manager" && (
          <Button onClick={() => setOpenModal(true)}>Add Project</Button>
        )}
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Projects on your team</h2>

            <p className={styles.sectionDescription}>
              View and manage your team's projects.
            </p>
          </div>
        </div>

        <ProjectList />
      </section>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Add Project"
      >
        <ProjectForm />
      </Modal>
    </div>
  );
};

export default Projects;
