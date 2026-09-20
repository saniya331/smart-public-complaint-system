import { Link } from "react-router-dom";

function ManageDepartments() {
  const departments = [
    {
      id: "DEP-01",
      name: "Electricity",
      officers: 6,
      complaints: 184,
    },
    {
      id: "DEP-02",
      name: "Sanitation",
      officers: 8,
      complaints: 246,
    },
    {
      id: "DEP-03",
      name: "Roads & Transport",
      officers: 10,
      complaints: 318,
    },
    {
      id: "DEP-04",
      name: "Water Supply",
      officers: 5,
      complaints: 172,
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

          <Link
            to="/admin/departments"
            className="active-menu"
          >
            Departments
          </Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Admin Portal / Departments</p>

            <h1>Departments</h1>

            <span>
              Manage departments responsible for public complaints.
            </span>
          </div>
        </header>

        <section className="admin-management-grid">
          {departments.map((department) => (
            <article
              className="admin-management-card"
              key={department.id}
            >
              <span className="complaint-id">
                {department.id}
              </span>

              <h3>{department.name}</h3>

              <div className="department-info">
                <div>
                  <span>Officers</span>
                  <strong>{department.officers}</strong>
                </div>

                <div>
                  <span>Complaints</span>
                  <strong>{department.complaints}</strong>
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default ManageDepartments;