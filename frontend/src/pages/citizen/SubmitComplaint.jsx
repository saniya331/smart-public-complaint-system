import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import api from "../../api/api";

function SubmitComplaint() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError(t("invalidImageType"));
      setSelectedFile(null);
      setPreviewUrl("");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t("imageTooLarge"));
      setSelectedFile(null);
      setPreviewUrl("");
      event.target.value = "";
      return;
    }

    setError("");
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function removeImage() {
    setSelectedFile(null);
    setPreviewUrl("");
    setError("");

    const fileInput = document.getElementById("evidence-image");

    if (fileInput) {
      fileInput.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!selectedFile) {
      setError(t("evidenceRequired"));
      return;
    }

    const formData = new FormData(event.currentTarget);

    const complaintData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      district: formData.get("district"),
      mandal: formData.get("mandal"),
      locality: formData.get("landmark"),
    };

    if (!complaintData.title?.trim()) {
      setError("Please enter a complaint title.");
      return;
    }

    if (!complaintData.description?.trim()) {
      setError("Please enter a complaint description.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Step 1: Create complaint
      const complaintResponse = await api.post(
        "/complaints",
        complaintData
      );

      const savedComplaint = complaintResponse.data;

      // Step 2: Upload evidence image
      const evidenceFormData = new FormData();
      evidenceFormData.append("file", selectedFile);

      await api.post(
        `/complaints/${savedComplaint.id}/evidence`,
        evidenceFormData
      );

      // Step 3: Show success
      alert(
        `${t("complaintSubmittedSuccess")}\n\n` +
        `${t("complaintId")}: ${savedComplaint.complaintNumber}`
      );

      navigate("/citizen/complaints");
    } catch (err) {
      console.error("Complaint submission error:", err);

      const message =
        err.response?.data ||
        "Failed to submit complaint. Please try again.";

      setError(
        typeof message === "string"
          ? message
          : "Failed to submit complaint. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-container">
      <section className="form-page">
        <div className="page-header">
          <h1>{t("submitComplaint")}</h1>
          <p>{t("raiseComplaintHelp")}</p>
        </div>

        <form onSubmit={handleSubmit} className="complaint-form">

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <div className="form-group">
            <label>{t("category")}</label>

            <select name="category" required>
              <option value="">Select Category</option>
              <option value="Electricity">Electricity</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Roads & Transport">
                Roads & Transport
              </option>
              <option value="Water Supply">Water Supply</option>
              <option value="Public Safety">Public Safety</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t("complaintTitle")}</label>

            <input
              type="text"
              name="title"
              placeholder="Enter complaint title"
              required
            />
          </div>

          <div className="form-group">
            <label>{t("description")}</label>

            <textarea
              name="description"
              rows="6"
              placeholder="Describe your complaint"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>{t("district")}</label>

            <select name="district" required>
              <option value="">Select District</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Rangareddy">Rangareddy</option>
              <option value="Medchal-Malkajgiri">
                Medchal-Malkajgiri
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>{t("mandal")}</label>

            <select name="mandal" required>
              <option value="">Select Mandal / Locality</option>
              <option value="Miyapur">Miyapur</option>
              <option value="Gachibowli">Gachibowli</option>
              <option value="Kukatpally">Kukatpally</option>
            </select>
          </div>

          <div className="form-group">
            <label>Exact Location / Landmark</label>

            <input
              type="text"
              name="landmark"
              placeholder="Enter exact location or landmark"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Complaint Evidence
              <span> (JPG/PNG, maximum 10 MB)</span>
            </label>

            <input
              id="evidence-image"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              required
            />

            {previewUrl && (
              <div className="image-preview">
                <img
                  src={previewUrl}
                  alt="Complaint evidence preview"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="secondary-btn"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/citizen/dashboard")}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : t("submitComplaint")}
            </button>
          </div>

        </form>
      </section>
    </main>
  );
}

export default SubmitComplaint;