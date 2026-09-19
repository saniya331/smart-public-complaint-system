import { Link } from "react-router-dom";

function AssignedComplaints() {
  const complaints = [
    {
      id: "GRV-2026-1048",
      title: "Streetlight not working",
      category: "Electricity",
      location: "Miyapur, Hyderabad",
      status: "In Progress",
      priority: "High",
      date: "20 Aug 2026",
      assignedDate: "21 Aug 2026",
    },
    {
      id: "GRV-2026-1049",
      title: "Garbage collection delay",
      category: "Sanitation",
      location: "Gachibowli, Hyderabad",
      status: "Assigned",
      priority: "Medium",
      date: "21 Aug 2026",
      assignedDate: "22 Aug 2026",
    },
    {
      id: "GRV-2026-1050",
      title: "Pothole on main road",
      category: "Roads & Transport",
      location: "Kukatpally, Hyderabad",
      status: "Assigned",
      priority: "High",
      date: "22 Aug 2026",
      assignedDate: "23 Aug 2026",
    },
  ];

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/officer/dashboard">Dashboard</Link>

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
        <header className="dashboard-header">
          <div>
            <p>Officer Portal / Assigned Complaints</p>

            <h1>Assigned Complaints</h1>

            <span>
              Review and manage complaints assigned to you.
            </span>
          </div>
        </header>

        <section className="officer-complaint-list">
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <article
                className="officer-complaint-card"
                key={complaint.id}
              >
                <div className="officer-card-header">
                  <div>
                    <span className="complaint-id">
                      {complaint.id}
                    </span>

                    <h3>{complaint.title}</h3>

                    <p>
                      {complaint.category} ·{" "}
                      {complaint.location}
                    </p>
                  </div>

                  <div className="officer-card-badges">
                    <span
                      className={`priority-badge ${complaint.priority.toLowerCase()}`}
                    >
                      {complaint.priority} Priority
                    </span>

                    <span
                      className={`status-badge ${complaint.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                </div>

                <div className="officer-card-info">
                  <div>
                    <span>Submitted</span>
                    <strong>{complaint.date}</strong>
                  </div>

                  <div>
                    <span>Assigned</span>
                    <strong>{complaint.assignedDate}</strong>
                  </div>

                  <div>
                    <span>Category</span>
                    <strong>{complaint.category}</strong>
                  </div>
                </div>

                <div className="officer-card-footer">
                  <span>
                    Action required based on current complaint status.
                  </span>

                  <Link
                    to={`/officer/complaints/${complaint.id}`}
                    className="view-complaint-btn"
                  >
                    Manage complaint →
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="officer-empty-state">
              <h2>No assigned complaints</h2>

              <p>
                There are currently no complaints assigned to you.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default AssignedComplaints;