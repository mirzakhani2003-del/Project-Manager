import { useAppSelector } from "../../../redux/hooks";
import type { Status, Task } from "../../../types/task";
import EmptyState from "../../Common/EmptyState";
import TaskCard from "../TaskCard";
import styles from "./taskList.module.scss";

interface TaskListProprs {
  projectId?: string;
  tasks: Task[];
  handleStatusChange: (task: Task, status: Status) => void;
}

const TaskList = ({ projectId, tasks, handleStatusChange }: TaskListProprs) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const users = useAppSelector((state) => state.users.users);
  const projects = useAppSelector((state) => state.projects.projects);

  if (!currentUser) {
    return;
  }

  const teamUsers = users.filter((user) => user.teamId === currentUser.teamId);

  const teamProjects = projects.filter(
    (project) => project.teamId === currentUser.teamId,
  );

  let taskToShow: Task[];

  if (projectId) {
    taskToShow = tasks.filter((task) => task.projectId === projectId);
  } else {
    taskToShow = tasks;
  }

  return (
    <div className={styles.list}>
      {taskToShow.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description="There are no tasks to display here yet."
        />
      ) : (
        taskToShow.map((task) => {
          const assignedUser = teamUsers.find(
            (user) => user.id === task.assignedTo,
          );

          const project = teamProjects.find(
            (project) => project.id === task.projectId,
          );

          return (
            <TaskCard
              key={task.id}
              task={task}
              assignedUser={assignedUser?.name ?? "Unknown User"}
              project={project?.title ?? "Unknown Project"}
              handleStatusChange={handleStatusChange}
            />
          );
        })
      )}
    </div>
  );
};

export default TaskList;
