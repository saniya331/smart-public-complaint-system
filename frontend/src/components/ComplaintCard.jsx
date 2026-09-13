import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { useLanguage } from "../context/LanguageContext";

function ComplaintCard({ complaint }) {
  const { t } = useLanguage();

  const categoryText = {
    Electricity: t("electricity"),
    Sanitation: t("sanitation"),
    "Roads & Transport": t("roadsTransport"),
    "Water Supply": t("waterSupply"),
    "Public Safety": t("publicSafety"),
  };

  return (
    <article className="complaint-card">
      <div className="complaint-card-main">
        <div className="complaint-icon">📋</div>

        <div className="complaint-info">
          <div className="complaint-title-row">
            <h3>{complaint.title}</h3>

            <StatusBadge status={complaint.status} />
          </div>

          <p className="complaint-id">
            {t("complaintId")}: {complaint.id}
          </p>

          <div className="complaint-meta">
            <span>
              📂 {categoryText[complaint.category] || complaint.category}
            </span>

            <span>
              📍 {complaint.location}
            </span>

            <span>
              📅 {complaint.date}
            </span>
          </div>
        </div>
      </div>

      <Link
        to={`/citizen/complaints/${complaint.id}`}
        className="view-complaint-btn"
      >
        {t("viewDetails")} →
      </Link>
    </article>
  );
}

export default ComplaintCard;