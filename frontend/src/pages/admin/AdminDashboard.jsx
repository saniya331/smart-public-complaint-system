import { Link } from "react-router-dom";

function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: 248 },
    { label: "Total Officers", value: 32 },
    { label: "Departments", value: 8 },
    { label: "Total Complaints", value: 1248 },
  ];

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/admin/dashboard" className="active-menu">
            Dashboard
          </Link>

          <Link to="/admin/users">Users</Link>

          <Link to="/admin/officers">Officers</Link>

          <Link to="/admin/departments">Departments</Link>

          <Link to="/admin/districts">Districts</Link>

          <Link to="/admin/mandals">Mandals</Link>

          <Link to="/admin/categories">Categories</Link>

          <Link to="/admin/complaints">Complaints</Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Admin Portal</p>

            <h1>Admin Dashboard</h1>

            <span>
              Manage users, officers, departments, locations,
              complaints, and complaint categories.
            </span>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Administration</h2>

              <p>
                Manage the main resources of the grievance portal.
              </p>
            </div>
          </div>

          <div className="admin-management-grid">
            <Link
              to="/admin/users"
              className="admin-management-card"
            >
              <h3>Users</h3>

              <p>
                View and manage registered citizens.
              </p>

              <span>Manage users →</span>
            </Link>

            <Link
              to="/admin/officers"
              className="admin-management-card"
            >
              <h3>Officers</h3>

              <p>
                View and manage complaint officers.
              </p>

              <span>Manage officers →</span>
            </Link>

            <Link
              to="/admin/departments"
              className="admin-management-card"
            >
              <h3>Departments</h3>

              <p>
                Manage departments responsible for complaints.
              </p>

              <span>Manage departments →</span>
            </Link>

            <Link
              to="/admin/districts"
              className="admin-management-card"
            >
              <h3>Districts</h3>

              <p>
                Manage districts covered by the grievance system.
              </p>

              <span>Manage districts →</span>
            </Link>

            <Link
              to="/admin/mandals"
              className="admin-management-card"
            >
              <h3>Mandals</h3>

              <p>
                Manage mandals and their officer assignments.
              </p>

              <span>Manage mandals →</span>
            </Link>

            <Link
              to="/admin/categories"
              className="admin-management-card"
            >
              <h3>Complaint Categories</h3>

              <p>
                Manage categories used to classify complaints.
              </p>

              <span>Manage categories →</span>
            </Link>

            <Link
              to="/admin/complaints"
              className="admin-management-card"
            >
              <h3>Complaints</h3>

              <p>
                Monitor and manage complaints submitted by citizens.
              </p>

              <span>Manage complaints →</span>
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export default AdminDashboard;