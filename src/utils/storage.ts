import type { Team } from "../types/team";
import type { User } from "../types/user";

const STORAGE_KEYS = {
  users: "task-manager-users",
  teams: "task-manager-teams",
  currentUser: "task-manager-current-user",
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
};
