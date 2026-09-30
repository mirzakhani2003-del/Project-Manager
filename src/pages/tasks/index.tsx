import { useState } from "react";
import FilterTask from "../../components/Task/FilterTask";
import TaskList from "../../components/Task/TaskList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { taskAction } from "../../redux/slices/taskSlice";
import type { Priority, Status, Task } from "../../types/task";
import styles from "./task.module.scss";

interface FilterTaskState {
  search: string;
  status: Status | "all";
  priority: Priority | "all";
  assignedTo: string | "all";
  dueDateFrom: string;
  dueDateTo: string;
}

const defaultTaskFilter: FilterTaskState = {
  search: "",
  status: "all",
  priority: "all",
  assignedTo: "all",
  dueDateFrom: "",
  dueDateTo: "",
};

const Tasks = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const projects = useAppSelector((state) => state.projects.projects);
  const users = useAppSelector((state) => state.users.users);

  const [filterTask, setFilterTask] =
    useState<FilterTaskState>(defaultTaskFilter);

  if (!currentUser) {
    return;
  }

  const teamUsers = users.filter((user) => user.teamId === currentUser.teamId);

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

  const handleStatusChange = (task: Task, status: Status) => {
    const updatedTask: Task = {
      ...task,
      status: status,
    };

    dispatch(taskAction.updateTask(updatedTask));
  };

  console.log(filterTask);

  const filteredTask = teamTasks.filter((task) => {
    const matchesSearch =
      filterTask.search.trim() === "" ||
      task.title.toLowerCase().includes(filterTask.search.trim().toLowerCase());

    const matchesStatus =
      filterTask.status === "all" || task.status === filterTask.status;

    const matchesPriority =
      filterTask.priority === "all" || task.priority === filterTask.priority;

    const matchesAssignee =
      filterTask.assignedTo === "all" ||
      task.assignedTo === filterTask.assignedTo;

    const taskDueDate = new Date(task.dueDate);

    const matchesDueDateFrom =
      filterTask.dueDateFrom === "" ||
      taskDueDate >= new Date(filterTask.dueDateFrom);

    const matchesDueDateTo =
      filterTask.dueDateTo === "" ||
      taskDueDate <= new Date(filterTask.dueDateTo);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesAssignee &&
      matchesDueDateFrom &&
      matchesDueDateTo
    );
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tasks</h1>

        <p className={styles.subtitle}>See all tasks on your team</p>
      </header>

      <FilterTask
        filters={filterTask}
        users={teamUsers}
        onClear={() => setFilterTask(defaultTaskFilter)}
        onChange={setFilterTask}
      />

      <TaskList tasks={filteredTask} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default Tasks;
