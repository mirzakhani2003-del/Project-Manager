import RecentTasks from "../../components/dashboard/RecentTasks";
import SummaryCard from "../../components/dashboard/SummaryCard";
import TaskPriorityChart from "../../components/dashboard/TashPriorityChart";
import TaskDeadLineList from "../../components/dashboard/TaskDeadlineList";
import TaskStatusChart from "../../components/dashboard/TaskStatusChart";
import { useAppSelector } from "../../redux/hooks";
import type { Project } from "../../types/project";
import type { Task } from "../../types/task";
import type { User } from "../../types/user";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const users = useAppSelector((state) => state.users.users);
  const projects = useAppSelector((state) => state.projects.projects);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  if (!currentUser) {
    return;
  }

  const teamUsers = users.filter((user) => user.teamId === currentUser.teamId);

  const teamProjects = projects.filter(
    (project) => project.teamId === currentUser.teamId,
  );

  const projectIds = new Set(teamProjects.map((project) => project.id));
  const teamTasks = tasks.filter((task) => projectIds.has(task.projectId));

  const isManager = currentUser.role === "manager";

  const getManagerDashboardData = (
    projects: Project[],
    tasks: Task[],
    users: User[],
  ) => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const teamMembers = users.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "done",
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "in-progress",
    ).length;

    const todoTasks = tasks.filter((task) => task.status === "todo").length;

    const lowPriorityTasks = tasks.filter(
      (task) => task.priority === "low",
    ).length;

    const mediumPriorityTasks = tasks.filter(
      (task) => task.priority === "medium",
    ).length;

    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "high",
    ).length;

    const recentTasks = tasks
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);

    const upcomingTasks = tasks
      .filter(
        (task) =>
          new Date(task.dueDate).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0) && task.status !== "done",
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      )
      .slice(0, 5);

    const overdueTasks = tasks
      .filter(
        (task) =>
          new Date(task.dueDate).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0) && task.status !== "done",
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      )
      .slice(0, 5);

    return {
      totalProjects,
      totalTasks,
      teamMembers,
      completedTasks,
      inProgressTasks,
      todoTasks,
      lowPriorityTasks,
      mediumPriorityTasks,
      highPriorityTasks,
      recentTasks,
      upcomingTasks,
      overdueTasks,
    };
  };

  const getMemberDashboardData = (
    projects: Project[],
    tasks: Task[],
    users: User[],
    userId: string,
  ) => {
    const userTasks = tasks.filter((task) => task.assignedTo === userId);

    const totalProjects = projects.length;
    const totalTasks = userTasks.length;
    const teamMembers = users.length;

    const completedTasks = userTasks.filter(
      (task) => task.status === "done",
    ).length;

    const inProgressTasks = userTasks.filter(
      (task) => task.status === "in-progress",
    ).length;

    const todoTasks = userTasks.filter((task) => task.status === "todo").length;

    const lowPriorityTasks = userTasks.filter(
      (task) => task.priority === "low",
    ).length;

    const mediumPriorityTasks = userTasks.filter(
      (task) => task.priority === "medium",
    ).length;

    const highPriorityTasks = userTasks.filter(
      (task) => task.priority === "high",
    ).length;

    const recentTasks = userTasks
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);

    const upcomingTasks = userTasks
      .filter(
        (task) =>
          new Date(task.dueDate).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0) && task.status !== "done",
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      )
      .slice(0, 5);

    const overdueTasks = userTasks
      .filter(
        (task) =>
          new Date(task.dueDate).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0) && task.status !== "done",
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      )
      .slice(0, 5);

    return {
      totalProjects,
      totalTasks,
      teamMembers,
      completedTasks,
      inProgressTasks,
      todoTasks,
      lowPriorityTasks,
      mediumPriorityTasks,
      highPriorityTasks,
      recentTasks,
      upcomingTasks,
      overdueTasks,
    };
  };

  const dashboardData = isManager
    ? getManagerDashboardData(teamProjects, teamTasks, teamUsers)
    : getMemberDashboardData(
        teamProjects,
        teamTasks,
        teamUsers,
        currentUser.id,
      );

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>

      <SummaryCard
        totalTasks={dashboardData.totalTasks}
        completedTasks={dashboardData.completedTasks}
        isManager={isManager}
        teamMembers={dashboardData.teamMembers}
        totalProjects={dashboardData.totalProjects}
      />

      <div className={styles.charts}>
        <TaskStatusChart
          todo={dashboardData.todoTasks}
          inProgress={dashboardData.inProgressTasks}
          completed={dashboardData.completedTasks}
          isManager={isManager}
        />

        <TaskPriorityChart
          isManager={isManager}
          low={dashboardData.lowPriorityTasks}
          medium={dashboardData.mediumPriorityTasks}
          high={dashboardData.highPriorityTasks}
        />
      </div>

      <RecentTasks tasks={dashboardData.recentTasks} />

      <TaskDeadLineList
        title={isManager ? "Upcoming Tasks" : "Your Upcoming Tasks"}
        tasks={dashboardData.upcomingTasks}
        emptyMessage="No upcoming tasks."
        type="upcoming"
      />

      <TaskDeadLineList
        title={isManager ? "Overdue Tasks" : "Your Overdue Tasks"}
        tasks={dashboardData.overdueTasks}
        emptyMessage="No overdue tasks."
        type="overdue"
      />
    </div>
  );
};

export default Dashboard;
