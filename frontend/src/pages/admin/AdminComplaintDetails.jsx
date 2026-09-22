import { Link, useParams } from "react-router-dom";

function AdminComplaintDetails() {
  const { id } = useParams();

  const complaint = {
    id,
    title: "Streetlight not working",
    citizen: "Saniya Begum",
    category: "Electricity",
    district: "Hyderabad",
    mandal: "Miyapur",
    location: "Near community library, Miyapur",
    date: "20 Aug 2026",
    priority: "High",
    status: "In Progress",
    officer: "Ravi Kumar",
    department: "Electricity",
    assignedDate: "21 Aug 2026",
    description:
      "The streetlight near the community library has not been working for several days. The area becomes very dark at night and residents are facing difficulty.",
    remarks:
      "Inspection completed. Replacement of the damaged streetlight component is in progress.",
    resolutionProof: null,
  };

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
        <Link to="/admin/complaints" className="back-link">
          ← Back to complaints
        </Link>

        <header className="details-header">
          <div>
            <p>Admin Portal / Complaint Details</p>

            <h1>{complaint.title}</h1>

            <span>Complaint ID: {complaint.id}</span>
          </div>

          <div className="admin-details-badges">
            <span
              className={`priority-badge ${complaint.priority.toLowerCase()}`}
            >
              {complaint.priority} Priority
            </span>

            <span
              className={`status-badge ${complaint.status
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {complaint.status}
            </span>
          </div>
        </header>

        <section className="details-grid">
          <div className="details-card">
            <h2>Complaint Information</h2>

            <div className="detail-item">
              <span>Complaint ID</span>
              <strong>{complaint.id}</strong>
            </div>

            <div className="detail-item">
              <span>Category</span>
              <strong>{complaint.category}</strong>
            </div>

            <div className="detail-item">
              <span>Priority</span>
              <strong>{complaint.priority}</strong>
            </div>

            <div className="detail-item">
              <span>District</span>
              <strong>{complaint.district}</strong>
            </div>

            <div className="detail-item">
              <span>Mandal / Locality</span>
              <strong>{complaint.mandal}</strong>
            </div>

            <div className="detail-item">
              <span>Exact Location</span>
              <strong>{complaint.location}</strong>
            </div>

            <div className="detail-item">
              <span>Submitted Date</span>
              <strong>{complaint.date}</strong>
            </div>
          </div>

          <div className="details-card">
            <h2>Citizen Information</h2>

            <div className="detail-item">
              <span>Citizen Name</span>
              <strong>{complaint.citizen}</strong>
            </div>

            <div className="detail-item">
              <span>Complaint Category</span>
              <strong>{complaint.category}</strong>
            </div>

            <div className="detail-item">
              <span>Department</span>
              <strong>{complaint.department}</strong>
            </div>

            <div className="detail-item">
              <span>Current Status</span>
              <strong>{complaint.status}</strong>
            </div>
          </div>
        </section>

        <section className="details-card admin-description-card">
          <h2>Complaint Description</h2>

          <p className="complaint-description">
            {complaint.description}
          </p>
        </section>

        <section className="details-card admin-assignment-card">
          <h2>Officer Assignment</h2>

          <div className="admin-assignment-grid">
            <div>
              <span>Assigned Officer</span>
              <strong>{complaint.officer}</strong>
            </div>

            <div>
              <span>Department</span>
              <strong>{complaint.department}</strong>
            </div>

            <div>
              <span>Assigned Date</span>
              <strong>{complaint.assignedDate}</strong>
            </div>

            <div>
              <span>Current Status</span>
              <strong>{complaint.status}</strong>
            </div>
          </div>
        </section>

        <section className="details-card admin-remarks-card">
          <h2>Officer Remarks</h2>

          <p className="complaint-description">
            {complaint.remarks}
          </p>
        </section>

        <section className="details-card admin-proof-card">
          <h2>Resolution Proof</h2>

          {complaint.resolutionProof ? (
            <img
              src={complaint.resolutionProof}
              alt="Resolution proof"
              className="admin-resolution-proof"
            />
          ) : (
            <div className="admin-proof-empty">
              <strong>No resolution proof uploaded</strong>

              <p>
                Resolution proof will appear here after the officer uploads
                evidence of the completed work.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default AdminComplaintDetails;