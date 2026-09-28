import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { Status, Task } from "../../../types/task";
import styles from "./taskCard.module.scss";
import { taskAction } from "../../../redux/slices/taskSlice";
import { useState } from "react";
import Modal from "../../Modal";
import TaskForm from "../TaskForm";

interface TaskCardProps {
  task: Task;
  assignedUser: string;
  project: string;
  handleStatusChange: (task: Task, status: Status) => void;
}

const TaskCard = ({
  task,
  assignedUser,
  project,
  handleStatusChange,
}: TaskCardProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [taskFormModal, setTaskFormModal] = useState(false);

  if (!currentUser) {
    return;
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    dispatch(taskAction.deleteTask(task.id));
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <span>{task.priority}</span>
      </div>

      <p className={styles.description}>{task.description}</p>

      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.label}>Assigned To</span>
          <span className={styles.value}>{assignedUser ?? "Unknown user"}</span>
        </div>

        <div className={styles.detail}>
          <span className={styles.label}>Due Date</span>
          <span className={styles.value}>
            {format(new Date(task.dueDate), "MMM d, yyyy")}
          </span>
        </div>

        <div className={styles.detail}>
          <span className={styles.label}>Status</span>

          {task.assignedTo === currentUser.id ? (
            <select
              id="status"
              value={task.status}
              onChange={(event) =>
                handleStatusChange(task, event.target.value as Status)
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In-progress</option>
              <option value="done">Done</option>
            </select>
          ) : (
            <p className={styles.value}>Status: {task.status}</p>
          )}
        </div>

        <div className={styles.detail}>
          <span className={styles.label}>Created</span>

          <span className={styles.value}>
            {format(new Date(task.createdAt), "MMM d, yyyy")}
          </span>
        </div>
      </div>

      {currentUser.role === "manager" && (
        <div className={styles.action}>
          <button
            className={styles.edit}
            onClick={() => setTaskFormModal(true)}
          >
            Edit
          </button>
          <button className={styles.delete} onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      {taskFormModal && (
        <Modal onClose={() => setTaskFormModal(false)}>
          <TaskForm projectId={project} initialData={task} taskId={task.id} />
        </Modal>
      )}
    </article>
  );
};

export default TaskCard;
