import { Link, useParams } from "react-router-dom";
import useComplaints from "../../hooks/useComplaints";
import StatusBadge from "../../components/StatusBadge";
import { useLanguage } from "../../context/LanguageContext";

function TrackComplaint() {
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

          <Link
            to="/citizen/complaints"
            className="primary-btn"
          >
            ← {t("backToComplaints")}
          </Link>
        </section>
      </main>
    );
  }

  const steps = [
    {
      title: t("complaintSubmitted"),
      message: t("submittedMessage"),
      completed: true,
    },
    {
      title: t("complaintAssigned"),
      message: t("assignedMessage"),
      completed:
        complaint.status !== "Submitted",
    },
    {
      title: t("workInProgress"),
      message: t("progressMessage"),
      completed:
        complaint.status === "In Progress" ||
        complaint.status === "Resolved",
    },
    {
      title: t("complaintResolved"),
      message: t("resolvedMessage"),
      completed: complaint.status === "Resolved",
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
              {t("citizenPortal")} / {t("trackComplaint")}
            </p>

            <h1>{t("trackComplaint")}</h1>

            <span>
              {t("complaintId")}: {complaint.id}
            </span>
          </div>

          <StatusBadge status={complaint.status} />
        </header>

        <section className="details-card tracking-card">
          <h2>{t("complaintTracking")}</h2>

          <div className="tracking-timeline">
            {steps.map((step, index) => (
              <div
                className={
                  step.completed
                    ? "tracking-step completed"
                    : "tracking-step"
                }
                key={step.title}
              >
                <div className="tracking-step-marker">
                  {step.completed ? "✓" : index + 1}
                </div>

                <div className="tracking-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.message}</p>
                </div>
              </div>
            ))}
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

export default TrackComplaint;