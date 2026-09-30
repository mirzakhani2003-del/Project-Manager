import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./projectDetail.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { format } from "date-fns";
import { projectAction } from "../../redux/slices/projectSlice";
import { useState } from "react";
import ProjectForm from "../../components/Project/ProjectForm";
import TaskForm from "../../components/Task/TaskForm";
import TaskList from "../../components/Task/TaskList";
import type { Status, Task } from "../../types/task";
import { taskAction } from "../../redux/slices/taskSlice";
import { FiArrowLeft, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import Button from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";

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
        <FiArrowLeft />
        <span>Back to Projects</span>
      </Link>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{project.title}</h1>

          <p className={styles.date}>
            Created on {format(new Date(project.createdAt), "MMMM d, yyyy")}
          </p>
        </div>

        {currentUser.role === "manager" && (
          <div className={styles.actions}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setProjectFormModal(true)}
            >
              <FiEdit2 />
              <span>Edit</span>
            </Button>

            <Button variant="danger" size="sm" onClick={handleDelete}>
              <FiTrash2 />
              <span>Delete</span>
            </Button>

            <Button size="sm" onClick={() => setTaskFormModal(true)}>
              <FiPlus />
              <span>Add Task</span>
            </Button>
          </div>
        )}
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Description</h2>

        <p className={styles.description}>{project.description}</p>
      </section>

      <section className={styles.tasks}>
        <div className={styles.tasksHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Tasks</h2>

            <p className={styles.tasksDescription}>
              Tasks associated with this project.
            </p>
          </div>
        </div>

        <TaskList
          projectId={projectId}
          tasks={projectTasks}
          handleStatusChange={handleStatusChange}
        />
      </section>

      <Modal
        isOpen={projectFormModal}
        onClose={() => setProjectFormModal(false)}
        title="Edit Project"
      >
        <ProjectForm projectId={projectId} initialData={project} />
      </Modal>

      <Modal
        isOpen={taskFormModal}
        onClose={() => setTaskFormModal(false)}
        title="Add Task"
      >
        <TaskForm projectId={projectId} />
      </Modal>
    </div>
  );
};

export default ProjectDetails;
