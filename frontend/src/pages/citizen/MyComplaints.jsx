import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ComplaintCard from "../../components/ComplaintCard";
import useComplaints from "../../hooks/useComplaints";

function MyComplaints() {
  const { complaints } = useComplaints();

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        complaint.title.toLowerCase().includes(search) ||
        complaint.id.toLowerCase().includes(search) ||
        complaint.category.toLowerCase().includes(search) ||
        complaint.location.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [complaints, statusFilter, searchTerm]);

  return (
    <main className="dashboard-page">
      {/* Sidebar */}

      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/citizen/dashboard">
            Dashboard
          </Link>

          <Link
            to="/citizen/complaints"
            className="active-menu"
          >
            My Complaints
          </Link>

          <a href="#track">Track Complaint</a>

          <a href="#notifications">Notifications</a>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      {/* Main Content */}

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>Citizen Portal / My Complaints</p>

            <h1>My Complaints</h1>

            <span>
              View and manage all your submitted complaints.
            </span>
          </div>

          <Link
            className="primary-btn new-complaint-btn"
            to="/citizen/submit"
          >
            + New Complaint
          </Link>
        </header>

        {/* Search and Filter */}

        <section className="complaint-tools">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </section>

        {/* Complaint Count */}

        <div className="complaint-count">
          Showing {filteredComplaints.length} of{" "}
          {complaints.length} complaints
        </div>

        {/* Complaints */}

        <section className="recent-section">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />
            ))
          ) : (
            <div className="empty-complaints">
              <div>📋</div>

              <h3>No complaints found</h3>

              <p>
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default MyComplaints;