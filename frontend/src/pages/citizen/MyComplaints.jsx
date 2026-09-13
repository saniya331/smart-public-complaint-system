import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ComplaintCard from "../../components/ComplaintCard";
import useComplaints from "../../hooks/useComplaints";
import { useLanguage } from "../../context/LanguageContext";

function MyComplaints() {
  const { complaints } = useComplaints();
  const { t } = useLanguage();

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesStatus =
        statusFilter === "All" || complaint.status === statusFilter;

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
      <aside className="sidebar">
        <h2>
          Civic<span>Voice</span>
        </h2>

        <nav>
          <Link to="/citizen/dashboard">
            {t("dashboard")}
          </Link>

          <Link
            to="/citizen/complaints"
            className="active-menu"
          >
            {t("myComplaints")}
          </Link>

          <Link to="/citizen/complaints">
            {t("trackComplaint")}
          </Link>

          <Link to="/citizen/complaints">
            {t("notifications")}
          </Link>
        </nav>

        <Link className="logout-link" to="/">
          ← {t("logout")}
        </Link>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>
              {t("citizenPortal")} / {t("myComplaints")}
            </p>

            <h1>{t("myComplaints")}</h1>

            <span>{t("myComplaintsDescription")}</span>
          </div>

          <Link
            className="primary-btn new-complaint-btn"
            to="/citizen/submit"
          >
            + {t("newComplaint")}
          </Link>
        </header>

        <section className="complaint-tools">
          <input
            type="text"
            placeholder={t("searchComplaints")}
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
            <option value="All">{t("allStatuses")}</option>
            <option value="Submitted">{t("submitted")}</option>
            <option value="Assigned">{t("assigned")}</option>
            <option value="In Progress">{t("inProgress")}</option>
            <option value="Resolved">{t("resolved")}</option>
          </select>
        </section>

        <div className="complaint-count">
          {t("showing")} {filteredComplaints.length} {t("of")}{" "}
          {complaints.length} {t("complaints")}
        </div>

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

              <h3>{t("noComplaintsFound")}</h3>

              <p>{t("changeSearch")}</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default MyComplaints;