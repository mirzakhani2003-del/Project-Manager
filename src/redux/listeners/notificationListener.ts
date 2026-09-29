import { createListenerMiddleware } from "@reduxjs/toolkit";
import { taskAction } from "../slices/taskSlice";
import type { RootState, AppDispatch } from "../store";
import type { Notification } from "../../types/notification";
import { v4 as uuid } from "uuid";
import { notificationAction } from "../slices/notificationSlice";
import { projectAction } from "../slices/projectSlice";

export const notficationListenerMiddleware = createListenerMiddleware();

const startListening = notficationListenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

startListening({
  actionCreator: taskAction.addTask,
  effect: async (action, listenerApi) => {
    const task = action.payload;
    const state = listenerApi.getState();

    const assignedMember = state.users.users.find(
      (user) => user.id === task.assignedTo,
    );

    if (!assignedMember) {
      return;
    }

    const notification: Notification = {
      id: uuid(),
      userId: assignedMember.id,
      teamId: assignedMember.teamId,
      type: "task-assigned",
      message: `New task assigned to you: ${task.title}`,
      createdAt: new Date().toISOString(),
      relatedAt: task.id,
      isRead: false,
    };

    listenerApi.dispatch(notificationAction.addNotification(notification));
  },
});

startListening({
  actionCreator: taskAction.updateTask,
  effect: async (action, listenerApi) => {
    const updatedTask = action.payload;
    const previousState = listenerApi.getOriginalState();

    const previousTask = previousState.tasks.tasks.find(
      (task) => task.id === updatedTask.id,
    );

    if (!previousTask) {
      return;
    }

    if (previousTask.status === updatedTask.status) {
      return;
    }

    const state = listenerApi.getState();

    const assignedMember = state.users.users.find(
      (user) => user.id === updatedTask.assignedTo,
    );

    if (!assignedMember) {
      return;
    }

    const notification: Notification = {
      id: uuid(),
      userId: assignedMember.id,
      teamId: assignedMember.teamId,
      type: "task-assigned",
      message: `Task status changed: ${updatedTask.title}`,
      createdAt: new Date().toISOString(),
      relatedAt: updatedTask.id,
      isRead: false,
    };

    listenerApi.dispatch(notificationAction.addNotification(notification));
  },
});

startListening({
  actionCreator: projectAction.addProject,
  effect: async (action, listenerApi) => {
    const project = action.payload;
    const state = listenerApi.getState();

    const teamMembers = state.users.users.filter(
      (user) => user.teamId === project.teamId && user.role === "member",
    );

    teamMembers.forEach((user) => {
      const notification: Notification = {
        id: uuid(),
        userId: user.id,
        teamId: user.teamId,
        type: "project-created",
        message: `New project created: ${project.title}`,
        createdAt: new Date().toISOString(),
        relatedAt: project.id,
        isRead: false,
      };

      listenerApi.dispatch(notificationAction.addNotification(notification));
    });
  },
});
