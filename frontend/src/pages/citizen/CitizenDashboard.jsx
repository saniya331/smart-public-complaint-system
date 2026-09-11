import { Link } from "react-router-dom";
import ComplaintCard from "../../components/ComplaintCard";
import useComplaints from "../../hooks/useComplaints";

function CitizenDashboard() {
  const { complaints } = useComplaints();

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
          <Link
            to="/citizen/dashboard"
            className="active-menu"
          >
            Dashboard
          </Link>

          <Link to="/citizen/complaints">
            My Complaints
          </Link>

          <Link to="/citizen/complaints">
            Track Complaint
          </Link>

          
          <Link to="/citizen/complaints">
  Notifications
</Link>

          
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Citizen Portal / Dashboard</p>

            <h1>Good morning, Saniya</h1>

            <span>
              Here is an overview of your civic complaints.
            </span>
          </div>

          <Link
            className="primary-btn new-complaint-btn"
            to="/citizen/submit"
          >
            + New Complaint
          </Link>
        </header>

        <section className="stat-grid">
          <div className="stat-card">
            <span>📋</span>

            <div>
              <p>Total Complaints</p>
              <h2>{complaints.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>⏳</span>

            <div>
              <p>In Progress</p>
              <h2>{inProgressCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>✓</span>

            <div>
              <p>Resolved</p>
              <h2>{resolvedCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>👤</span>

            <div>
              <p>Assigned</p>
              <h2>{assignedCount}</h2>
            </div>
          </div>
        </section>

        <section className="recent-section">
          <div className="section-heading">
            <div>
              <h2>Recent complaints</h2>

              <p>
                Track the latest progress on your submitted issues.
              </p>
            </div>

            <Link
              to="/citizen/complaints"
              className="view-all-link"
            >
              View all →
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

              <h3>No complaints yet</h3>

              <p>
                Submit your first complaint to get started.
              </p>

              <Link
                to="/citizen/submit"
                className="primary-btn"
              >
                + Submit Complaint
              </Link>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default CitizenDashboard;