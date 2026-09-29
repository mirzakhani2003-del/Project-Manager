import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/userSlice";
import teamsReducer from "./slices/teamSlice";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";
import notificationReducer from "./slices/notificationSlice";
import { storage } from "../utils/storage";
import { notficationListenerMiddleware } from "./listeners/notificationListener";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    teams: teamsReducer,
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(notficationListenerMiddleware.middleware),
});

store.subscribe(() => {
  const state = store.getState();

  if (state.users.users) {
    storage.setUsers(state.users.users);
  }

  if (state.teams.teams) {
    storage.setTeams(state.teams.teams);
  }

  if (state.auth.currentUser) {
    storage.setCurrentUser(state.auth.currentUser);
  }

  if (!state.auth.currentUser) {
    storage.removeCurrentUser();
  }

  if (state.projects.projects) {
    storage.setProjects(state.projects.projects);
  }

  if (state.tasks.tasks) {
    storage.setTasks(state.tasks.tasks);
  }

  if (state.notifications.notifications) {
    storage.setNotifications(state.notifications.notifications);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
