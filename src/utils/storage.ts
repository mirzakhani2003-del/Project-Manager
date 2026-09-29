import type { Notification } from "../types/notification";
import type { Project } from "../types/project";
import type { TaskReminder } from "../types/reminder";
import type { Task } from "../types/task";
import type { Team } from "../types/team";
import type { User } from "../types/user";

const STORAGE_KEYS = {
  users: "task-manager-users",
  teams: "task-manager-teams",
  currentUser: "task-manager-current-user",
  projects: "task-manager-projects",
  tasks: "task-manager-tasks",
  notifications: "task-manager-notifications",
  reminders: "task-manager-reminders",
} as const;

export const storage = {
  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.users);
    return users ? JSON.parse(users) : [];
  },
  setUsers: (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  },
  getTeams: (): Team[] => {
    const teams = localStorage.getItem(STORAGE_KEYS.teams);
    return teams ? JSON.parse(teams) : [];
  },
  setTeams: (teams: Team[]) => {
    localStorage.setItem(STORAGE_KEYS.teams, JSON.stringify(teams));
  },
  getCurrentUser: (): User | null => {
    const currentUser = localStorage.getItem(STORAGE_KEYS.currentUser);
    return currentUser ? JSON.parse(currentUser) : null;
  },
  setCurrentUser: (currentUser: User) => {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
  },
  removeCurrentUser: () => {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  },
  getProjects: (): Project[] => {
    const projects = localStorage.getItem(STORAGE_KEYS.projects);
    return projects ? JSON.parse(projects) : [];
  },
  setProjects: (projects: Project[]) => {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
  },
  getTasks: (): Task[] => {
    const tasks = localStorage.getItem(STORAGE_KEYS.tasks);
    return tasks ? JSON.parse(tasks) : [];
  },
  setTasks: (tasks: Task[]) => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  },
  getNotifications: (): Notification[] => {
    const notifications = localStorage.getItem(STORAGE_KEYS.notifications);
    return notifications ? JSON.parse(notifications) : [];
  },
  setNotifications: (notifications: Notification[]) => {
    localStorage.setItem(
      STORAGE_KEYS.notifications,
      JSON.stringify(notifications),
    );
  },
  getReminders: (): TaskReminder[] => {
    const reminders = localStorage.getItem(STORAGE_KEYS.reminders);
    return reminders ? JSON.parse(reminders) : [];
  },
  setReminders: (reminders: TaskReminder[]) => {
    localStorage.setItem(STORAGE_KEYS.reminders, JSON.stringify(reminders));
  },
};
