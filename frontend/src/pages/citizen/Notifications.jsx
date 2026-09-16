import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function Notifications() {
  const { t } = useLanguage();

  const notifications = [
    {
      id: 1,
      icon: "📋",
      title: t("notificationSubmittedTitle"),
      message: t("notificationSubmittedMessage"),
      time: "Today",
      type: "submitted",
    },
    {
      id: 2,
      icon: "👤",
      title: t("notificationAssignedTitle"),
      message: t("notificationAssignedMessage"),
      time: "Yesterday",
      type: "assigned",
    },
    {
      id: 3,
      icon: "⏳",
      title: t("notificationProgressTitle"),
      message: t("notificationProgressMessage"),
      time: "2 days ago",
      type: "progress",
    },
    {
      id: 4,
      icon: "✓",
      title: t("notificationResolvedTitle"),
      message: t("notificationResolvedMessage"),
      time: "5 days ago",
      type: "resolved",
    },
  ];

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/citizen/dashboard">
            {t("dashboard")}
          </Link>

          <Link to="/citizen/complaints">
            {t("myComplaints")}
          </Link>

          

          <Link
            to="/citizen/notifications"
            className="active-menu"
          >
            {t("notifications")}
          </Link>
        </nav>

        <Link className="logout-link" to="/">
          ← {t("logout")}
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>
              {t("citizenPortal")} / {t("notifications")}
            </p>

            <h1>{t("notifications")}</h1>

            <span>{t("notificationsDescription")}</span>
          </div>
        </header>

        <section className="notifications-list">
          {notifications.map((notification) => (
            <article
              className={`notification-card ${notification.type}`}
              key={notification.id}
            >
              <div className="notification-icon">
                {notification.icon}
              </div>

              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
              </div>

              <span className="notification-time">
                {notification.time}
              </span>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default Notifications;