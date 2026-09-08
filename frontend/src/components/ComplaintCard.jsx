import StatusBadge from "./StatusBadge";

function ComplaintCard({ complaint }) {
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
            Complaint ID: {complaint.id}
          </p>

          <div className="complaint-meta">
            <span>📂 {complaint.category}</span>
            <span>📍 {complaint.location}</span>
            <span>📅 {complaint.date}</span>
          </div>
        </div>
      </div>

      <button className="view-complaint-btn">
        View details →
      </button>
    </article>
  );
}

export default ComplaintCard;