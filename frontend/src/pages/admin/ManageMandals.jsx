import { Link } from "react-router-dom";

function ManageMandals() {
  const mandals = [
    {
      id: "MND-01",
      name: "Miyapur",
      district: "Hyderabad",
      officers: 3,
      status: "Active",
    },
    {
      id: "MND-02",
      name: "Kukatpally",
      district: "Hyderabad",
      officers: 4,
      status: "Active",
    },
    {
      id: "MND-03",
      name: "Gachibowli",
      district: "Rangareddy",
      officers: 3,
      status: "Active",
    },
    {
      id: "MND-04",
      name: "Serilingampally",
      district: "Rangareddy",
      officers: 2,
      status: "Active",
    },
    {
      id: "MND-05",
      name: "Quthbullapur",
      district: "Medchal-Malkajgiri",
      officers: 2,
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

          <Link
            to="/admin/mandals"
            className="active-menu"
          >
            Mandals
          </Link>

          <Link to="/admin/categories">Categories</Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Admin Portal / Mandals</p>

            <h1>Mandals</h1>

            <span>
              Manage mandals and their assigned officers.
            </span>
          </div>
        </header>

        <section className="admin-table-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mandal ID</th>
                  <th>Mandal Name</th>
                  <th>District</th>
                  <th>Officers</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {mandals.map((mandal) => (
                  <tr key={mandal.id}>
                    <td>{mandal.id}</td>
                    <td>{mandal.name}</td>
                    <td>{mandal.district}</td>
                    <td>{mandal.officers}</td>
                    <td>
                      <span className="admin-status active">
                        {mandal.status}
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

export default ManageMandals;