import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./projectDetail.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { format } from "date-fns";
import { projectAction } from "../../redux/slices/projectSlice";
import { useState } from "react";
import Modal from "../../components/Modal";
import ProjectForm from "../../components/ProjectForm";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = projects.find((project) => project.id === projectId);

  if (!project) {
    return;
  }

  const handleDelete = () => {
    if (!currentUser) {
      return;
    }

    if (currentUser.role !== "manager") {
      throw new Error("Only managers can delete projects.");
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    dispatch(projectAction.deleteProject(project.id));
    navigate("/projects");
  };

  return (
    <div className={styles.page}>
      <Link to="/projects" className={styles.backLink}>
        ← Back to Projects
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.date}>
          Created on {format(new Date(project.createdAt), "MMMM d, yyyy")}
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <p className={styles.description}>{project.description}</p>
      </section>

      <section className={styles.action}>
        {currentUser?.role === "manager" && (
          <>
            <button
              className={styles.edit}
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
            <button className={styles.delete} onClick={handleDelete}>
              Delete
            </button>

            {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)}>
                <ProjectForm projectId={projectId} initialData={project} />
              </Modal>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ProjectDetails;
