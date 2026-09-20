import { Link } from "react-router-dom";

function ManageOfficers() {
  const officers = [
    {
      id: "OFF-101",
      name: "Ravi Kumar",
      department: "Electricity",
      mandal: "Miyapur",
      status: "Active",
    },
    {
      id: "OFF-102",
      name: "Priya Reddy",
      department: "Sanitation",
      mandal: "Gachibowli",
      status: "Active",
    },
    {
      id: "OFF-103",
      name: "Arjun Rao",
      department: "Roads & Transport",
      mandal: "Kukatpally",
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

          <Link to="/admin/officers" className="active-menu">
            Officers
          </Link>

          <Link to="/admin/departments">Departments</Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Admin Portal / Officers</p>

            <h1>Officers</h1>

            <span>
              View officers responsible for handling complaints.
            </span>
          </div>
        </header>

        <section className="admin-table-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Officer ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Mandal</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {officers.map((officer) => (
                  <tr key={officer.id}>
                    <td>{officer.id}</td>
                    <td>{officer.name}</td>
                    <td>{officer.department}</td>
                    <td>{officer.mandal}</td>
                    <td>
                      <span className="admin-status active">
                        {officer.status}
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

export default ManageOfficers;