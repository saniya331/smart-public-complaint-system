import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useComplaints from "../../hooks/useComplaints";
import { useLanguage } from "../../context/LanguageContext";

function SubmitComplaint() {
  const navigate = useNavigate();
  const { addComplaint } = useComplaints();
  const { t } = useLanguage();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please upload only JPG or PNG images.");
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const newComplaint = addComplaint({
      category: formData.get("category"),
      title: formData.get("title"),
      district: formData.get("district"),
      mandal: formData.get("mandal"),
      description: formData.get("description"),
      landmark: formData.get("landmark"),
    });

    setTimeout(() => {
      setIsSubmitting(false);

      alert(
        `Complaint submitted successfully!\n\nYour Complaint ID is ${newComplaint.id}`
      );

      navigate("/citizen/complaints");
    }, 500);
  }

  return (
    <main className="submit-page">
      <header className="submit-header">
        <p>
          {t("citizenPortal")} / {t("myComplaints")} /{" "}
          {t("newComplaint")}
        </p>

        <h1>{t("raiseAComplaint")}</h1>

        <span>{t("submitDescription")}</span>
      </header>

      <form className="complaint-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <section className="form-section">
          <h2>{t("whatIsTheIssue")}</h2>

          <p>{t("selectCategoryDescription")}</p>

          <div className="form-grid">
            <div>
              <label>{t("complaintCategory")}</label>

              <select name="category" required>
                <option value="">
                  {t("selectCategory")}
                </option>

                <option value="Electricity">
                  {t("electricity")}
                </option>

                <option value="Sanitation">
                  {t("sanitation")}
                </option>

                <option value="Roads & Transport">
                  {t("roadsTransport")}
                </option>

                <option value="Water Supply">
                  {t("waterSupply")}
                </option>

                <option value="Public Safety">
                  {t("publicSafety")}
                </option>
              </select>
            </div>

            <div>
              <label>{t("issueTitle")}</label>

              <input
                name="title"
                type="text"
                placeholder="Example: Streetlight not working"
                required
              />
            </div>
          </div>

          <label>{t("describeIssue")}</label>

          <textarea
            name="description"
            placeholder={t("descriptionPlaceholder")}
            required
          />
        </section>

        <section className="form-section">
          <h2>{t("whereIsTheIssue")}</h2>

          <p>{t("locationDescription")}</p>

          <div className="form-grid">
            <div>
              <label>{t("district")}</label>

              <select name="district" required>
                <option value="">
                  {t("selectDistrict")}
                </option>

                <option value="Hyderabad">Hyderabad</option>
                <option value="Rangareddy">Rangareddy</option>
                <option value="Medchal-Malkajgiri">
                  Medchal-Malkajgiri
                </option>
              </select>
            </div>

            <div>
              <label>{t("mandalLocality")}</label>

              <select name="mandal" required>
                <option value="">
                  {t("selectLocality")}
                </option>

                <option value="Miyapur">Miyapur</option>
                <option value="Gachibowli">Gachibowli</option>
                <option value="Kukatpally">Kukatpally</option>
              </select>
            </div>
          </div>

          <label>{t("exactLocation")}</label>

          <input
            name="landmark"
            type="text"
            placeholder={t("landmarkPlaceholder")}
            required
          />
        </section>

        <section className="form-section">
          <h2>
            {t("uploadEvidence")}{" "}
            <small>({t("optional")})</small>
          </h2>

          <label className="upload-box">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />

            <strong>{t("uploadImage")}</strong>

            <span>{t("imageFormat")}</span>

            {selectedFile && (
              <small>
                Selected: {selectedFile.name}
              </small>
            )}
          </label>
        </section>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() =>
              navigate("/citizen/dashboard")
            }
          >
            {t("cancel")}
          </button>

          <button
            type="submit"
            className="primary-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t("submitting")
              : t("submitComplaint")}
          </button>
        </div>
      </form>
    </main>
  );
}

export default SubmitComplaint;