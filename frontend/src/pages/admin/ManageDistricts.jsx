import { Link } from "react-router-dom";

function ManageDistricts() {
  const districts = [
    {
      id: "DST-01",
      name: "Hyderabad",
      mandals: 16,
      officers: 12,
      status: "Active",
    },
    {
      id: "DST-02",
      name: "Rangareddy",
      mandals: 27,
      officers: 9,
      status: "Active",
    },
    {
      id: "DST-03",
      name: "Medchal-Malkajgiri",
      mandals: 16,
      officers: 7,
      status: "Active",
    },
    {
      id: "DST-04",
      name: "Sangareddy",
      mandals: 26,
      officers: 4,
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

          <Link to="/admin/users">
            Users
          </Link>

          <Link to="/admin/officers">
            Officers
          </Link>

          <Link to="/admin/departments">
            Departments
          </Link>

          <Link to="/admin/districts" className="active-menu">
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
            <p>Admin Portal / Districts</p>

            <h1>Districts</h1>

            <span>
              Manage districts covered by the grievance portal.
            </span>
          </div>
        </header>

        <section className="admin-table-card">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>District ID</th>
                  <th>District Name</th>
                  <th>Mandals</th>
                  <th>Officers</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {districts.map((district) => (
                  <tr key={district.id}>
                    <td>{district.id}</td>

                    <td>{district.name}</td>

                    <td>{district.mandals}</td>

                    <td>{district.officers}</td>

                    <td>
                      <span className="admin-status active">
                        {district.status}
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

export default ManageDistricts;