import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "../../types/notification";
import { storage } from "../../utils/storage";

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: storage.getNotifications(),
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (item) => item.id === action.payload,
      );

      if (notification) {
        notification.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(
        (notification) => (notification.isRead = true),
      );
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
  },
});

export const notificationAction = notificationSlice.actions;
export default notificationSlice.reducer;
