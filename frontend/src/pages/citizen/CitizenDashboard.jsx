import { Link } from "react-router-dom";
import ComplaintCard from "../../components/ComplaintCard";

function CitizenDashboard() {
  const complaints = [
    {
      id: "GRV-2026-1048",
      title: "Streetlight not working",
      category: "Electricity",
      location: "Miyapur, Hyderabad",
      date: "20 Aug 2026",
      status: "In Progress",
    },
    {
      id: "GRV-2026-1042",
      title: "Garbage collection delay",
      category: "Sanitation",
      location: "Gachibowli, Hyderabad",
      date: "18 Aug 2026",
      status: "Resolved",
    },
    {
      id: "GRV-2026-1036",
      title: "Pothole on main road",
      category: "Roads",
      location: "Kukatpally, Hyderabad",
      date: "15 Aug 2026",
      status: "Assigned",
    },
  ];

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <a className="active-menu" href="#dashboard">Dashboard</a>
          <a href="#complaints">My Complaints</a>
          <a href="#track">Track Complaint</a>
          <a href="#notifications">Notifications</a>
        </nav>

        <Link className="logout-link" to="/">← Sign out</Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Citizen Portal / Dashboard</p>
            <h1>Good morning, Saniya</h1>
            <span>Here is an overview of your civic complaints.</span>
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
              <h2>3</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>⏳</span>
            <div>
              <p>In Progress</p>
              <h2>1</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>✓</span>
            <div>
              <p>Resolved</p>
              <h2>1</h2>
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
              <p>Track the latest progress on your submitted issues.</p>
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