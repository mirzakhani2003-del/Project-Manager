export type NotificationType =
  | "task-assigned"
  | "task-status-changed"
  | "project-created"
  | "reminder";

export interface Notification {
  id: string;
  userId: string;
  teamId: string;
  type: NotificationType;
  message: string;
  relatedAt: string;
  createdAt: string;
  isRead: boolean;
}
