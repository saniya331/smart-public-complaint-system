import { useLanguage } from "../context/LanguageContext";

function StatusBadge({ status }) {
  const { t } = useLanguage();

  const statusClass = status.toLowerCase().replace(/\s+/g, "-");

  const statusText = {
    Submitted: t("submitted"),
    Assigned: t("assigned"),
    "In Progress": t("inProgress"),
    Resolved: t("resolved"),
  };

  return (
    <span className={`status-badge ${statusClass}`}>
      {statusText[status] || status}
    </span>
  );
}

export default StatusBadge;