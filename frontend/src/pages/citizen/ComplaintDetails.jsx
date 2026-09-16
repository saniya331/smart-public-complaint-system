import { Link, useParams } from "react-router-dom";
import useComplaints from "../../hooks/useComplaints";
import StatusBadge from "../../components/StatusBadge";
import { useLanguage } from "../../context/LanguageContext";

function ComplaintDetails() {
  const { id } = useParams();
  const { getComplaintById } = useComplaints();
  const { t } = useLanguage();

  const complaint = getComplaintById(id);

  if (!complaint) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-content">
          <h1>{t("complaintNotFound")}</h1>

          <p>{t("complaintDoesNotExist")}</p>

          <Link to="/citizen/complaints" className="primary-btn">
            ← {t("backToComplaints")}
          </Link>
        </section>
      </main>
    );
  }

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

          <Link
            to="/citizen/complaints"
            className="active-menu"
          >
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
        <Link
          to="/citizen/complaints"
          className="back-link"
        >
          ← {t("backToComplaints")}
        </Link>

        <header className="details-header">
          <div>
            <p>
              {t("citizenPortal")} / {t("complaintDetails")}
            </p>

            <h1>{complaint.title}</h1>

            <span>
              {t("complaintId")}: {complaint.id}
            </span>
          </div>

          <StatusBadge status={complaint.status} />
        </header>

        <section className="details-grid">
          <div className="details-card">
            <h2>{t("complaintInformation")}</h2>

            <div className="detail-item">
              <span>{t("category")}</span>
              <strong>{complaint.category}</strong>
            </div>

            <div className="detail-item">
              <span>{t("location")}</span>
              <strong>{complaint.location}</strong>
            </div>

            <div className="detail-item">
              <span>{t("submittedDate")}</span>
              <strong>{complaint.date}</strong>
            </div>

            <div className="detail-item">
              <span>{t("currentStatus")}</span>
              <StatusBadge status={complaint.status} />
            </div>
          </div>

          <div className="details-card">
            <h2>{t("complaintTracking")}</h2>

            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-dot">✓</div>

                <div>
                  <h3>{t("complaintSubmitted")}</h3>

                  <p>{t("submittedMessage")}</p>
                </div>
              </div>

              <div
                className={
                  complaint.status === "Submitted"
                    ? "timeline-item"
                    : "timeline-item completed"
                }
              >
                <div className="timeline-dot">
                  {complaint.status === "Submitted" ? "2" : "✓"}
                </div>

                <div>
                  <h3>{t("complaintAssigned")}</h3>

                  <p>{t("assignedMessage")}</p>
                </div>
              </div>

              <div
                className={
                  complaint.status === "In Progress" ||
                  complaint.status === "Resolved"
                    ? "timeline-item completed"
                    : "timeline-item"
                }
              >
                <div className="timeline-dot">
                  {complaint.status === "In Progress" ||
                  complaint.status === "Resolved"
                    ? "✓"
                    : "3"}
                </div>

                <div>
                  <h3>{t("workInProgress")}</h3>

                  <p>{t("progressMessage")}</p>
                </div>
              </div>

              <div
                className={
                  complaint.status === "Resolved"
                    ? "timeline-item completed"
                    : "timeline-item"
                }
              >
                <div className="timeline-dot">
                  {complaint.status === "Resolved" ? "✓" : "4"}
                </div>

                <div>
                  <h3>{t("complaintResolved")}</h3>

                  <p>{t("resolvedMessage")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {complaint.status === "Resolved" && (
          <div className="details-feedback-action">
            <Link
              to={`/citizen/feedback/${complaint.id}`}
              className="primary-btn"
            >
              {t("feedback")} →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default ComplaintDetails;