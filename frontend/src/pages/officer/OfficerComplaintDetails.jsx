import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function OfficerComplaintDetails() {
  const { id } = useParams();

  const [status, setStatus] = useState("In Progress");
  const [remarks, setRemarks] = useState("");
  const [resolutionProof, setResolutionProof] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");

  const complaint = {
    id,
    title: "Streetlight not working",
    category: "Electricity",
    district: "Hyderabad",
    mandal: "Miyapur",
    location: "Near community library, Miyapur",
    date: "20 Aug 2026",
    description:
      "The streetlight near the community library has not been working for several days. The area becomes very dark at night and residents are facing difficulty.",
    citizenName: "Citizen",
  };

  function handleProofChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setMessage("Please upload only JPG or PNG images.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("Image size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    setResolutionProof(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMessage("");
  }

  function removeProof() {
    setResolutionProof(null);
    setPreviewUrl("");
    setMessage("");
  }

  function handleStatusUpdate(event) {
    event.preventDefault();

    if (status === "Resolved" && !resolutionProof) {
      setMessage("Please upload resolution proof before resolving the complaint.");
      return;
    }

    setMessage("Complaint status updated successfully.");
  }

  return (
    <main className="dashboard-page">
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/officer/dashboard">
            Dashboard
          </Link>

          <Link
            to="/officer/complaints"
            className="active-menu"
          >
            Assigned Complaints
          </Link>
        </nav>

        <Link className="logout-link" to="/">
          ← Sign out
        </Link>
      </aside>

      <section className="dashboard-content">
        <Link
          to="/officer/complaints"
          className="back-link"
        >
          ← Back to assigned complaints
        </Link>

        <header className="details-header">
          <div>
            <p>Officer Portal / Complaint Details</p>

            <h1>{complaint.title}</h1>

            <span>
              Complaint ID: {complaint.id}
            </span>
          </div>

          <span
            className={`status-badge ${status
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {status}
          </span>
        </header>

        <section className="details-grid">
          <div className="details-card">
            <h2>Complaint Information</h2>

            <div className="detail-item">
              <span>Category</span>
              <strong>{complaint.category}</strong>
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

            <div className="detail-item">
              <span>Citizen</span>
              <strong>{complaint.citizenName}</strong>
            </div>
          </div>

          <div className="details-card">
            <h2>Complaint Description</h2>

            <p className="complaint-description">
              {complaint.description}
            </p>
          </div>
        </section>

        <section className="details-card officer-action-card">
          <h2>Complaint Action</h2>

          <form onSubmit={handleStatusUpdate}>
            <label className="officer-form-label">
              Complaint Status
            </label>

            <select
              className="officer-status-select"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setMessage("");
              }}
            >
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <label className="officer-form-label">
              Officer Remarks
            </label>

            <textarea
              className="officer-remarks"
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              placeholder="Add remarks about the action taken..."
              rows="5"
            />

            <label className="officer-form-label">
              Resolution Proof
              {status === "Resolved" && (
                <span className="required-mark"> *</span>
              )}
            </label>

            <p className="officer-proof-description">
              Upload a clear image showing that the complaint has
              been resolved. JPG or PNG, maximum size 10 MB.
            </p>

            <label className="officer-upload-btn">
              ＋ Upload resolution proof
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleProofChange}
                hidden
              />
            </label>

            {resolutionProof && previewUrl && (
              <div className="resolution-preview-container">
                <img
                  src={previewUrl}
                  alt="Resolution proof preview"
                  className="resolution-preview"
                />

                <div className="selected-file-info">
                  <strong>{resolutionProof.name}</strong>
                  <span>
                    {(resolutionProof.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>

                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeProof}
                >
                  Remove image
                </button>
              </div>
            )}

            {message && (
              <p className="officer-action-message">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="primary-btn officer-update-btn"
            >
              Update Complaint
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default OfficerComplaintDetails;