import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useComplaints from "../../hooks/useComplaints";
import StatusBadge from "../../components/StatusBadge";
import { useLanguage } from "../../context/LanguageContext";

function Feedback() {
  const { id } = useParams();
  const { complaints } = useComplaints();
  const { t } = useLanguage();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const complaint = complaints.find(
    (item) => item.id === id
  );

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

  if (complaint.status !== "Resolved") {
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

          <section className="details-card feedback-unavailable">
            <h1>{t("feedbackUnavailable")}</h1>

            <p>{t("feedbackOnlyResolved")}</p>

            <StatusBadge status={complaint.status} />
          </section>
        </section>
      </main>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (rating === 0) {
      return;
    }

    setSubmitted(true);
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
              {t("citizenPortal")} / {t("feedback")}
            </p>

            <h1>{t("feedback")}</h1>

            <span>
              {t("complaintId")}: {complaint.id}
            </span>
          </div>

          <StatusBadge status={complaint.status} />
        </header>

        <section className="details-card feedback-card">
          {submitted ? (
            <div className="feedback-success">
              <div>✓</div>

              <h2>{t("feedbackSubmitted")}</h2>

              <p>{t("feedbackThankYou")}</p>

              <Link
                to="/citizen/complaints"
                className="primary-btn"
              >
                {t("backToComplaints")}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>{t("rateExperience")}</h2>

              <p>{t("feedbackDescription")}</p>

              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={
                      star <= rating ? "star selected" : "star"
                    }
                    onClick={() => setRating(star)}
                    aria-label={`${star} ${t("stars")}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <label>{t("yourFeedback")}</label>

              <textarea
                value={feedback}
                onChange={(event) =>
                  setFeedback(event.target.value)
                }
                placeholder={t("feedbackPlaceholder")}
                rows="5"
              />

              <button
                type="submit"
                className="primary-btn"
                disabled={rating === 0}
              >
                {t("submitFeedback")}
              </button>
            </form>
          )}
        </section>
      </section>
    </main>
  );
}

export default Feedback;