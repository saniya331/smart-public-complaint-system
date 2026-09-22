import { Link } from "react-router-dom";

function ManageUsers() {
  const users = [
    {
      id: "USR-1001",
      name: "Saniya Begum",
      email: "saniya@example.com",
      district: "Hyderabad",
      status: "Active",
    },
    {
      id: "USR-1002",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      district: "Rangareddy",
      status: "Active",
    },
    {
      id: "USR-1003",
      name: "Ananya Sharma",
      email: "ananya@example.com",
      district: "Medchal",
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
          <Link to="/admin/dashboard">
            Dashboard
          </Link>

          <Link to="/admin/users" className="active-menu">
            Users
          </Link>

          <Link to="/admin/officers">
            Officers
          </Link>

          <Link to="/admin/departments">
            Departments
          </Link>

          <Link to="/admin/districts">
            Districts
          </Link>

          <Link to="/admin/mandals">
            Mandals
          </Link>

          <Link to="/admin/categories">
            Categories
          </Link>

          <Link to="/admin/complaints">
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
            <p>Admin Portal / Users</p>

            <h1>Users</h1>

            <span>
              View registered citizens on the grievance portal.
            </span>
          </div>
        </header>

        <section className="admin-table-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>District</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.district}</td>

                    <td>
                      <span className="admin-status active">
                        {user.status}
                      </span>
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

export default ManageUsers;