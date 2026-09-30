import { FiBell } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./notificationCenter.module.scss";
import { notificationAction } from "../../redux/slices/notificationSlice";

const NotificationCenter = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const notifications = useAppSelector(
    (state) => state.notifications.notifications,
  );

  if (!currentUser) {
    return;
  }

  const userNotifications = notifications
    .filter(
      (notification) =>
        notification.teamId === currentUser.teamId &&
        notification.userId === currentUser.id,
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const handleNotificationClick = (notificationId: string) => {
    dispatch(notificationAction.markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(notificationAction.markAllAsRead());
  };

  const handleDeleteNotification = (notificationId: string) => {
    dispatch(notificationAction.deleteNotification(notificationId));
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Notifications</h2>

        <span className={styles.count}>{userNotifications.length}</span>

        {userNotifications.some((notification) => !notification.isRead) && (
          <button
            type="button"
            className={styles.markAllButton}
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      {userNotifications.length === 0 ? (
        <div className={styles.empty}>
          <FiBell className={styles.emptyIcon} />
          <p>No notifications yet.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {userNotifications.map((item) => (
            <article
              key={item.id}
              className={`${styles.notification} ${
                !item.isRead ? styles.unread : ""
              }`}
            >
              <button
                type="button"
                className={styles.notificationButton}
                onClick={() => handleNotificationClick(item.id)}
              >
                <span className={styles.content}>
                  <span className={styles.type}>{item.type}</span>

                  <span className={styles.message}>{item.message}</span>

                  <span className={styles.date}>
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </span>
              </button>

              <button
                type="button"
                className={styles.delete}
                onClick={() => handleDeleteNotification(item.id)}
              >
                X
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default NotificationCenter;
