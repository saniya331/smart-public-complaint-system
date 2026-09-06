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

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <a className="active-menu" href="#dashboard">
            Dashboard
          </a>

          <a href="#complaints">
            My Complaints
          </a>

          <a href="#track">
            Track Complaint
          </a>

          <a href="#notifications">
            Notifications
          </a>
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
            <span>🔔</span>

            <div>
              <p>New Updates</p>
              <h2>2</h2>
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

            <button>View all</button>
          </div>

          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
            />
          ))}
        </section>
      </section>
    </main>
  );
}

export default CitizenDashboard;