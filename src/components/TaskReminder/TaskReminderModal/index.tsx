import { FiAlertCircle, FiX } from "react-icons/fi";
import type { Task } from "../../../types/task";
import styles from "./taskReminderModal.module.scss";

interface TaskReminderModalProps {
  tasks: Task[];
  onViewTask: (task: Task) => void;
  onDismiss: () => void;
}

const TaskReminderModal = ({
  tasks,
  onViewTask,
  onDismiss,
}: TaskReminderModalProps) => {
  return (
    <div className={styles.overlay} role="presentation" onClick={onDismiss}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-reminder-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onDismiss}
          aria-label="Close reminder"
        >
          <FiX />
        </button>

        <div className={styles.iconWrapper}>
          <FiAlertCircle />
        </div>

        <h2 id="task-reminder-title" className={styles.title}>
          Task Reminders
        </h2>

        <p className={styles.message}>
          You have {tasks.length} task{tasks.length > 1 ? "s" : ""} due within
          the next 24 hours.
        </p>

        <div className={styles.taskList}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskInfo}>
              <h3>{task.title}</h3>

              <p>
                Due: <strong>{new Date(task.dueDate).toLocaleString()}</strong>
              </p>

              <button
                type="button"
                className={styles.viewTaskButton}
                onClick={() => onViewTask(task)}
              >
                View Task
              </button>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onDismiss}
          >
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskReminderModal;
