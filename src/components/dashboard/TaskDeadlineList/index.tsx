import { format } from "date-fns";
import type { Task } from "../../../types/task";
import styles from "./taskDeadlineList.module.scss";

interface TaskDeadlineListProps {
  title: string;
  tasks: Task[];
  emptyMessage: string;
  type: "upcoming" | "overdue";
}

const TaskDeadLineList = ({
  title,
  tasks,
  emptyMessage,
  type,
}: TaskDeadlineListProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      {tasks.length === 0 ? (
        <p className={styles.empty}>{emptyMessage}</p>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => (
            <div className={styles.item} key={task.id}>
              <div className={styles.info}>
                <h3 className={styles.taskTitle}>{task.title}</h3>

                <span className={styles.date}>
                  {type === "overdue" ? "Due " : "Due "}
                  {format(new Date(task.dueDate), "MMM d, yyyy")}
                </span>
              </div>

              <span
                className={`${styles.status} ${
                  type === "overdue" ? styles.overdue : styles.upcoming
                }`}
              >
                {type === "overdue" ? "Overdue" : "Upcoming"}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskDeadLineList;
