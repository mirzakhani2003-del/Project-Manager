import TaskList from "../../components/TaskList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { taskAction } from "../../redux/slices/taskSlice";
import type { Status, Task } from "../../types/task";
import styles from "./task.module.scss";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const projects = useAppSelector((state) => state.projects.projects);

  if (!currentUser) {
    return;
  }

  const teamProjects = projects.filter(
    (project) => project.teamId === currentUser.teamId,
  );

  const teamTasks: Task[] = [];

  for (let i = 0; i < teamProjects.length; i++) {
    for (let j = 0; j < tasks.length; j++) {
      if (teamProjects[i].id === tasks[j].projectId) {
        teamTasks.push(tasks[j]);
      }
    }
  }

  if (!currentUser) {
    return;
  }

  const handleStatusChange = (task: Task, status: Status) => {
    const updatedTask: Task = {
      ...task,
      status: status,
    };

    dispatch(taskAction.updateTask(updatedTask));
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tasks</h1>
        <p className={styles.subtitle}>See all tasks on your team</p>
      </header>

      <TaskList tasks={teamTasks} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default Tasks;
