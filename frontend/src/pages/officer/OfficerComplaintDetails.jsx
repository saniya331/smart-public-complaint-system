import { Link, useParams } from "react-router-dom";

function OfficerComplaintDetails() {
  const { id } = useParams();

  const complaint = {
    id,
    title: "Streetlight not working",
    category: "Electricity",
    district: "Hyderabad",
    mandal: "Miyapur",
    location: "Near community library, Miyapur",
    date: "20 Aug 2026",
    status: "In Progress",
    description:
      "The streetlight near the community library has not been working for several days. The area becomes very dark at night and residents are facing difficulty.",
    citizenName: "Citizen",
  };

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/officer/dashboard">
            Dashboard
          </Link>

          <Link
            to="/officer/complaints"
            className="active-menu"
          >
            Assigned Complaints
          </Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <Link
          to="/officer/complaints"
          className="back-link"
        >
          ← Back to assigned complaints
        </Link>

        <header className="details-header">
          <div>
            <p>Officer Portal / Complaint Details</p>

            <h1>{complaint.title}</h1>

            <span>
              Complaint ID: {complaint.id}
            </span>
          </div>

          <span
            className={`status-badge ${complaint.status
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {complaint.status}
          </span>
        </header>

        <section className="details-grid">
          <div className="details-card">
            <h2>Complaint Information</h2>

            <div className="detail-item">
              <span>Category</span>
              <strong>{complaint.category}</strong>
            </div>

            <div className="detail-item">
              <span>District</span>
              <strong>{complaint.district}</strong>
            </div>

            <div className="detail-item">
              <span>Mandal / Locality</span>
              <strong>{complaint.mandal}</strong>
            </div>

            <div className="detail-item">
              <span>Exact Location</span>
              <strong>{complaint.location}</strong>
            </div>

            <div className="detail-item">
              <span>Submitted Date</span>
              <strong>{complaint.date}</strong>
            </div>

            <div className="detail-item">
              <span>Citizen</span>
              <strong>{complaint.citizenName}</strong>
            </div>
          </div>

          <div className="details-card">
            <h2>Complaint Description</h2>

            <p className="complaint-description">
              {complaint.description}
            </p>
          </div>
        </section>

        <section className="details-card officer-action-card">
          <h2>Complaint Action</h2>

          <p>
            Status update and resolution proof upload will be
            connected to the backend later.
          </p>

          <div className="officer-actions">
            <button type="button" className="primary-btn">
              Update Status
            </button>

            <button type="button" className="secondary-btn">
              Upload Resolution Proof
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default OfficerComplaintDetails;