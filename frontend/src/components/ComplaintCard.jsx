import StatusBadge from "./StatusBadge";

function ComplaintCard({ complaint }) {
  return (
    <article className="complaint-card">
      <div className="complaint-icon">📋</div>

      <div className="complaint-info">
        <div className="complaint-title-row">
          <h3>{complaint.title}</h3>
          <StatusBadge status={complaint.status} />
        </div>

        <p>{complaint.id} · {complaint.category}</p>
        <span>📍 {complaint.location} · {complaint.date}</span>
      </div>

      <button className="view-button">View →</button>
    </article>
  );
}

export default ComplaintCard;