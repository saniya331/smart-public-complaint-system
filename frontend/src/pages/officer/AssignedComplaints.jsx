import { Link } from "react-router-dom";

function AssignedComplaints() {
  const complaints = [
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
        <header className="dashboard-header">
          <div>
            <p>Officer Portal / Assigned Complaints</p>
            <h1>Assigned Complaints</h1>
            <span>
              View and manage complaints assigned to you.
            </span>
          </div>
        </header>

        <section className="complaints-list">
          {complaints.map((complaint) => (
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
        </section>
      </section>
    </main>
  );
}

export default AssignedComplaints;