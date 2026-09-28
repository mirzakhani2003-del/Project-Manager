import { format } from "date-fns";
import type { Task } from "../../../types/task";
import styles from "./recentTasks.module.scss";

interface RecentTasksProps {
  tasks: Task[];
  isManager: boolean;
}

const RecentTasks = ({ tasks, isManager }: RecentTasksProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        {isManager ? "Recent Tasks" : "Your Recent Tasks"}
      </h2>

      {tasks.length === 0 ? (
        <p className={styles.empty}>No recent tasks available.</p>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => (
            <div className={styles.item} key={task.id}>
              <div className={styles.info}>
                <h3 className={styles.taskTitle}>{task.title}</h3>

                <span className={styles.createdAt}>
                  Created {format(new Date(task.createdAt), "MMM d, yyyy")}
                </span>
              </div>

              <span className={`${styles.status} ${styles[task.status]}`}>
                {task.status === "in-progress"
                  ? "In Progress"
                  : task.status === "done"
                    ? "Done"
                    : "Todo"}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentTasks;
