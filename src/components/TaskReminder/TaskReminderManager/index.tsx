import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { Task } from "../../../types/task";
import TaskReminderModal from "../TaskReminderModal";
import { differenceInHours } from "date-fns";
import { storage } from "../../../utils/storage";
import type { TaskReminder } from "../../../types/reminder";
import { v4 as uuid } from "uuid";
import type { Notification } from "../../../types/notification";
import { notificationAction } from "../../../redux/slices/notificationSlice";

const REMINDER_WINDOW_HOURS = 24;

const TaskReminderManager = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();

  const unDoneTasks = tasks.filter((task) => task.status !== "done");

  const [reminderTasks, setReminderTasks] = useState<Task[]>([]);

  const isTaskDueSoon = (task: Task): boolean => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const hoursUntilDue = differenceInHours(dueDate, now);
    return hoursUntilDue > 0 && hoursUntilDue <= REMINDER_WINDOW_HOURS;
  };

  const hasReminderBeenShown = (taskId: string, userId: string): boolean => {
    const reminders = storage.getReminders();

    return reminders.some(
      (reminder) => reminder.taskId === taskId && reminder.userId === userId,
    );
  };

  const shouldShowTaskReminder = (task: Task, userId: string): boolean => {
    if (task.assignedTo !== userId) {
      return false;
    }

    if (!isTaskDueSoon(task)) {
      return false;
    }

    if (hasReminderBeenShown(task.id, userId)) {
      return false;
    }

    return true;
  };

  const createTaskReminder = (taskId: string, userId: string): TaskReminder => {
    const reminder: TaskReminder = {
      id: uuid(),
      taskId,
      userId,
      shownAt: new Date().toISOString(),
    };

    const reminders = storage.getReminders();
    storage.setReminders([...reminders, reminder]);

    return reminder;
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const tasksToRemind = unDoneTasks.filter((task) =>
      shouldShowTaskReminder(task, currentUser.id),
    );

    if (tasksToRemind.length === 0) {
      return;
    }

    tasksToRemind.forEach((task) => {
      createTaskReminder(task.id, currentUser.id);
    });

    setReminderTasks(tasksToRemind);
  }, [currentUser, tasks]);

  if (reminderTasks.length === 0) return null;

  if (!currentUser) {
    return;
  }

  const handleDismiss = () => {
    setReminderTasks([]);

    reminderTasks.forEach((item) => {
      const notification: Notification = {
        id: uuid(),
        userId: currentUser.id,
        teamId: currentUser.teamId,
        type: "reminder",
        message: `Task ${item.title} due soon !`,
        relatedAt: item.id,
        createdAt: new Date().toISOString(),
        isRead: false,
      };
      dispatch(notificationAction.addNotification(notification));
    });
  };

  const handleViewTask = (task: Task) => {
    navigate(`/projects/${task.projectId}`);
    setReminderTasks([]);

    reminderTasks.forEach((item) => {
      const notification: Notification = {
        id: uuid(),
        userId: currentUser.id,
        teamId: currentUser.teamId,
        type: "reminder",
        message: `Task ${item.title} due soon !`,
        relatedAt: item.id,
        createdAt: new Date().toISOString(),
        isRead: false,
      };
      dispatch(notificationAction.addNotification(notification));
    });
  };

  return (
    <TaskReminderModal
      tasks={reminderTasks}
      onDismiss={handleDismiss}
      onViewTask={handleViewTask}
    />
  );
};

export default TaskReminderManager;
