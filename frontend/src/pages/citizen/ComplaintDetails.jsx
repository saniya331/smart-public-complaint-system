import { Link, useParams } from "react-router-dom";
import useComplaints from "../../hooks/useComplaints";
import StatusBadge from "../../components/StatusBadge";

function ComplaintDetails() {
  const { id } = useParams();
  const { getComplaintById } = useComplaints();

  const complaint = getComplaintById(id);

  if (!complaint) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-content">
          <h1>Complaint not found</h1>

          <p>
            The complaint you are looking for does not exist.
          </p>

          <Link
            to="/citizen/complaints"
            className="primary-btn"
          >
            ← Back to My Complaints
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
            Dashboard
          </Link>

          <Link
            to="/citizen/complaints"
            className="active-menu"
          >
            My Complaints
          </Link>

          <a href="#track">Track Complaint</a>

          <a href="#notifications">Notifications</a>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <Link
          to="/citizen/complaints"
          className="back-link"
        >
          ← Back to My Complaints
        </Link>

        <header className="details-header">
          <div>
            <p>Citizen Portal / Complaint Details</p>

            <h1>{complaint.title}</h1>

            <span>
              Complaint ID: {complaint.id}
            </span>
          </div>

          <StatusBadge status={complaint.status} />
        </header>

        <section className="details-grid">
          <div className="details-card">
            <h2>Complaint Information</h2>

            <div className="detail-item">
              <span>Category</span>
              <strong>{complaint.category}</strong>
            </div>

            <div className="detail-item">
              <span>Location</span>
              <strong>{complaint.location}</strong>
            </div>

            <div className="detail-item">
              <span>Submitted Date</span>
              <strong>{complaint.date}</strong>
            </div>

            <div className="detail-item">
              <span>Current Status</span>
              <StatusBadge status={complaint.status} />
            </div>
          </div>

          <div className="details-card">
            <h2>Complaint Tracking</h2>

            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-dot">✓</div>

                <div>
                  <h3>Complaint Submitted</h3>
                  <p>
                    Your complaint has been successfully
                    submitted.
                  </p>
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
                  <h3>Complaint Assigned</h3>
                  <p>
                    The complaint will be assigned to the
                    responsible officer.
                  </p>
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
                  <h3>Work in Progress</h3>
                  <p>
                    The responsible department is working
                    on the complaint.
                  </p>
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
                  {complaint.status === "Resolved"
                    ? "✓"
                    : "4"}
                </div>

                <div>
                  <h3>Complaint Resolved</h3>
                  <p>
                    The complaint has been resolved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default ComplaintDetails;