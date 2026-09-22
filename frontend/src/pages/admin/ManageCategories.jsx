import { Link } from "react-router-dom";

function ManageCategories() {
  const categories = [
    {
      id: "CAT-01",
      name: "Electricity",
      department: "Electricity",
      complaints: 184,
      status: "Active",
    },
    {
      id: "CAT-02",
      name: "Sanitation",
      department: "Sanitation",
      complaints: 246,
      status: "Active",
    },
    {
      id: "CAT-03",
      name: "Roads & Transport",
      department: "Roads & Transport",
      complaints: 318,
      status: "Active",
    },
    {
      id: "CAT-04",
      name: "Water Supply",
      department: "Water Supply",
      complaints: 172,
      status: "Active",
    },
    {
      id: "CAT-05",
      name: "Streetlights",
      department: "Electricity",
      complaints: 128,
      status: "Active",
    },
    {
      id: "CAT-06",
      name: "Drainage",
      department: "Sanitation",
      complaints: 96,
      status: "Active",
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

          <Link to="/admin/categories" className="active-menu">
            Categories
          </Link>

          <Link to="/admin/complaints">Complaints</Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Admin Portal / Categories</p>

            <h1>Complaint Categories</h1>

            <span>
              Manage categories used for classifying public complaints.
            </span>
          </div>
        </header>

        <section className="admin-management-grid">
          {categories.map((category) => (
            <article
              className="admin-management-card"
              key={category.id}
            >
              <span className="complaint-id">
                {category.id}
              </span>

              <h3>{category.name}</h3>

              <p>
                Department: {category.department}
              </p>

              <div className="department-info">
                <div>
                  <span>Complaints</span>
                  <strong>{category.complaints}</strong>
                </div>

                <div>
                  <span>Status</span>

                  <span className="admin-status active">
                    {category.status}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default ManageCategories;