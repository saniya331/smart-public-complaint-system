import { Link } from "react-router-dom";

function OfficerDashboard() {
  const assignedComplaints = [
    {
      id: "GRV-2026-1048",
      title: "Streetlight not working",
      category: "Electricity",
      location: "Miyapur, Hyderabad",
      status: "In Progress",
      date: "20 Aug 2026",
    },
    {
      id: "GRV-2026-1049",
      title: "Garbage collection delay",
      category: "Sanitation",
      location: "Gachibowli, Hyderabad",
      status: "Assigned",
      date: "21 Aug 2026",
    },
    {
      id: "GRV-2026-1050",
      title: "Pothole on main road",
      category: "Roads & Transport",
      location: "Kukatpally, Hyderabad",
      status: "Assigned",
      date: "22 Aug 2026",
    },
  ];

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/officer/dashboard" className="active-menu">
            Dashboard
          </Link>

          <Link to="/officer/complaints">
            Assigned Complaints
          </Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Officer Portal</p>
            <h1>Good morning, Officer</h1>
            <span>
              Here is an overview of complaints assigned to you.
            </span>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Assigned</span>
            <strong>{assignedComplaints.length}</strong>
          </div>

          <div className="stat-card">
            <span>Assigned</span>
            <strong>
              {
                assignedComplaints.filter(
                  (complaint) => complaint.status === "Assigned"
                ).length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>In Progress</span>
            <strong>
              {
                assignedComplaints.filter(
                  (complaint) => complaint.status === "In Progress"
                ).length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>Resolved</span>
            <strong>
              {
                assignedComplaints.filter(
                  (complaint) => complaint.status === "Resolved"
                ).length
              }
            </strong>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Assigned complaints</h2>
              <p>
                Review complaints that require your attention.
              </p>
            </div>

            <Link to="/officer/complaints" className="secondary-btn">
              View all
            </Link>
          </div>

          <div className="complaints-list">
            {assignedComplaints.map((complaint) => (
              <article className="complaint-card" key={complaint.id}>
                <div className="complaint-card-top">
                  <div>
                    <span className="complaint-id">
                      {complaint.id}
                    </span>

                    <h3>{complaint.title}</h3>

                    <p>
                      {complaint.category} · {complaint.location}
                    </p>
                  </div>

                  <span
                    className={`status-badge ${complaint.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {complaint.status}
                  </span>
                </div>

                <div className="complaint-card-bottom">
                  <span>Submitted: {complaint.date}</span>

                  <Link
                    to={`/officer/complaints/${complaint.id}`}
                    className="view-complaint-btn"
                  >
                    View details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default OfficerDashboard;