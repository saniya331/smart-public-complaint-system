import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import api from "../../api/api";

function Register() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccess("Account created successfully. Redirecting to login...");

      setFormData({
        fullName: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      const message =
        err.response?.data ||
        "Registration failed. Please try again.";

      setError(
        typeof message === "string"
          ? message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-info">
        <h1>
          Civic<span>Voice</span>
        </h1>

        <div>
          <p className="tagline">{t("joinCommunity")}</p>
          <h2>{t("makeVoiceCount")}</h2>
          <p>{t("raiseIssuesImproveServices")}</p>
        </div>
      </section>

      <section className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <Link className="back-link" to="/">
            ← {t("backToHome")}
          </Link>

          <h2>{t("createAccount")}</h2>
          <p>{t("registerReportTrack")}</p>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          {success && (
            <p className="form-success">
              {success}
            </p>
          )}

          <label>{t("fullName")}</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={t("fullNamePlaceholder")}
          />

          <label>{t("emailAddress")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
          />

          <label>{t("mobileNumber")}</label>
          <input
            type="tel"
            placeholder="98765 43210"
          />

          <label>{t("password")}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("createPasswordPlaceholder")}
          />

          <button
            type="submit"
            className="primary-btn full-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : t("createAccount")}
          </button>

          <p className="switch-page">
            {t("alreadyHaveAccount")}{" "}
            <Link to="/login">{t("signIn")}</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;