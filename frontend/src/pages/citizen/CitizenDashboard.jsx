import { Link } from "react-router-dom";
import ComplaintCard from "../../components/ComplaintCard";
import useComplaints from "../../hooks/useComplaints";
import { useLanguage } from "../../context/LanguageContext";

function CitizenDashboard() {
  const { complaints } = useComplaints();
  const { t } = useLanguage();

  const inProgressCount = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const assignedCount = complaints.filter(
    (complaint) => complaint.status === "Assigned"
  ).length;

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/citizen/dashboard" className="active-menu">
            {t("dashboard")}
          </Link>

          <Link to="/citizen/complaints">
            {t("myComplaints")}
          </Link>

          

          <Link to="/citizen/notifications">
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
              {t("citizenPortal")} / {t("dashboard")}
            </p>

            <h1>
              {t("goodMorning")}, Saniya
            </h1>

            <span>{t("dashboardDescription")}</span>
          </div>

          <Link
            className="primary-btn new-complaint-btn"
            to="/citizen/submit"
          >
            + {t("newComplaint")}
          </Link>
        </header>

        <section className="stat-grid">
          <div className="stat-card">
            <span>📋</span>
            <div>
              <p>{t("totalComplaints")}</p>
              <h2>{complaints.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>⏳</span>
            <div>
              <p>{t("inProgress")}</p>
              <h2>{inProgressCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>✓</span>
            <div>
              <p>{t("resolved")}</p>
              <h2>{resolvedCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>👤</span>
            <div>
              <p>{t("assigned")}</p>
              <h2>{assignedCount}</h2>
            </div>
          </div>
        </section>

        <section className="recent-section">
          <div className="section-heading">
            <div>
              <h2>{t("recentComplaints")}</h2>
              <p>{t("recentComplaintsDescription")}</p>
            </div>

            <Link
              to="/citizen/complaints"
              className="view-all-link"
            >
              {t("viewAll")} →
            </Link>
          </div>

          {complaints.length > 0 ? (
            complaints.slice(0, 3).map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />
            ))
          ) : (
            <div className="empty-complaints">
              <div>📋</div>

              <h3>{t("noComplaintsFound")}</h3>

              <p>{t("changeSearch")}</p>

              <Link
                to="/citizen/submit"
                className="primary-btn"
              >
                + {t("newComplaint")}
              </Link>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default CitizenDashboard;