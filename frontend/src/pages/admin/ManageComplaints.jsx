import { Link } from "react-router-dom";

function ManageComplaints() {
  const complaints = [
    {
      id: "GRV-2026-1048",
      citizen: "Saniya Begum",
      title: "Streetlight not working",
      category: "Electricity",
      district: "Hyderabad",
      mandal: "Miyapur",
      officer: "Ravi Kumar",
      priority: "High",
      status: "In Progress",
      date: "20 Aug 2026",
    },
    {
      id: "GRV-2026-1042",
      citizen: "Rahul Kumar",
      title: "Garbage collection delay",
      category: "Sanitation",
      district: "Rangareddy",
      mandal: "Gachibowli",
      officer: "Priya Reddy",
      priority: "Medium",
      status: "Resolved",
      date: "18 Aug 2026",
    },
    {
      id: "GRV-2026-1036",
      citizen: "Ananya Sharma",
      title: "Pothole on main road",
      category: "Roads & Transport",
      district: "Hyderabad",
      mandal: "Kukatpally",
      officer: "Arjun Rao",
      priority: "High",
      status: "Assigned",
      date: "15 Aug 2026",
    },
    {
      id: "GRV-2026-1031",
      citizen: "Mohammed Ali",
      title: "Low water supply",
      category: "Water Supply",
      district: "Medchal-Malkajgiri",
      mandal: "Quthbullapur",
      officer: "Not Assigned",
      priority: "Medium",
      status: "Submitted",
      date: "13 Aug 2026",
    },
  ];

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/officers">Officers</Link>
          <Link to="/admin/departments">Departments</Link>
          <Link to="/admin/districts">Districts</Link>
          <Link to="/admin/mandals">Mandals</Link>
          <Link to="/admin/categories">Categories</Link>
          <Link to="/admin/complaints" className="active-menu">
            Complaints
          </Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Admin Portal / Complaints</p>
            <h1>Complaints</h1>
            <span>
              Monitor and manage complaints submitted through the grievance
              portal.
            </span>
          </div>
        </header>

        <section className="admin-table-card">
          <div className="admin-table-wrapper">
            <table className="admin-table admin-complaints-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Citizen</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Officer</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.id}</td>

                    <td>{complaint.citizen}</td>

                    <td>
                      <strong className="admin-complaint-title">
                        {complaint.title}
                      </strong>
                    </td>

                    <td>{complaint.category}</td>

                    <td>
                      {complaint.mandal}, {complaint.district}
                    </td>

                    <td>{complaint.officer}</td>

                    <td>
                      <span
                        className={`priority-badge ${complaint.priority.toLowerCase()}`}
                      >
                        {complaint.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${complaint.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {complaint.status}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/admin/complaints/${complaint.id}`}
                        className="view-complaint-btn"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

export default ManageComplaints;