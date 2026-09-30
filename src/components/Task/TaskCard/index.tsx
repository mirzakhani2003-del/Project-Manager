import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { Status, Task } from "../../../types/task";
import styles from "./taskCard.module.scss";
import { taskAction } from "../../../redux/slices/taskSlice";
import { useState } from "react";
import TaskForm from "../TaskForm";
import Badge from "../../Common/Badge";
import Select from "../../Common/Select";
import Button from "../../Common/Button";
import Modal from "../../Common/Modal";

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
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{task.title}</h3>

          <p className={styles.project}>{project}</p>
        </div>

        <Badge
          variant={
            task.priority === "high"
              ? "danger"
              : task.priority === "medium"
                ? "warning"
                : "success"
          }
        >
          {task.priority}
        </Badge>
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
            <Select
              aria-label="Task status"
              value={task.status}
              options={[
                { value: "todo", label: "Todo" },
                {
                  value: "in-progress",
                  label: "In Progress",
                },
                { value: "done", label: "Done" },
              ]}
              onChange={(event) =>
                handleStatusChange(task, event.target.value as Status)
              }
            />
          ) : (
            <Badge
              variant={
                task.status === "done"
                  ? "success"
                  : task.status === "in-progress"
                    ? "primary"
                    : "neutral"
              }
            >
              {task.status === "in-progress"
                ? "In Progress"
                : task.status === "todo"
                  ? "Todo"
                  : "Done"}
            </Badge>
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
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setTaskFormModal(true)}
          >
            Edit
          </Button>

          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}

      <Modal
        isOpen={taskFormModal}
        onClose={() => setTaskFormModal(false)}
        title="Edit Task"
      >
        <TaskForm projectId={project} initialData={task} taskId={task.id} />
      </Modal>
    </article>
  );
};

export default TaskCard;
