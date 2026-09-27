import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./projectDetail.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { format } from "date-fns";
import { projectAction } from "../../redux/slices/projectSlice";
import { useState } from "react";
import Modal from "../../components/Modal";
import ProjectForm from "../../components/Project/ProjectForm";
import TaskForm from "../../components/Task/TaskForm";
import TaskList from "../../components/Task/TaskList";
import type { Status, Task } from "../../types/task";
import { taskAction } from "../../redux/slices/taskSlice";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const projects = useAppSelector((state) => state.projects.projects);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [projectFormModal, setProjectFormModal] = useState(false);
  const [taskFormModal, setTaskFormModal] = useState(false);

  if (!currentUser) {
    return;
  }

  if (!projectId) {
    return;
  }

  const project = projects.find((project) => project.id === projectId);

  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  if (!project) {
    return;
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    dispatch(projectAction.deleteProject(project.id));
    navigate("/projects");
  };

  const handleStatusChange = (task: Task, status: Status) => {
    const updatedTask: Task = {
      ...task,
      status: status,
    };

    dispatch(taskAction.updateTask(updatedTask));
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
        {currentUser.role === "manager" && (
          <>
            <button
              className={styles.edit}
              onClick={() => setProjectFormModal(true)}
            >
              Edit
            </button>
            <button className={styles.delete} onClick={handleDelete}>
              Delete
            </button>
            <button
              className={styles.addTask}
              onClick={() => setTaskFormModal(true)}
            >
              Add Task
            </button>

            {projectFormModal && (
              <Modal onClose={() => setProjectFormModal(false)}>
                <ProjectForm projectId={projectId} initialData={project} />
              </Modal>
            )}

            {taskFormModal && (
              <Modal onClose={() => setTaskFormModal(false)}>
                <TaskForm projectId={projectId} />
              </Modal>
            )}
          </>
        )}
      </section>

      <section className={styles.tasks}>
        <h3 className={styles.sectionTitle}>Tasks</h3>

        <TaskList
          projectId={projectId}
          tasks={projectTasks}
          handleStatusChange={handleStatusChange}
        />
      </section>
    </div>
  );
};

export default ProjectDetails;
