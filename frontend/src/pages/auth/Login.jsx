import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import api from "../../api/api";

function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const user = response.data;

      // Store authentication information
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("fullName", user.fullName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);

      // Navigate according to the user's role
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (user.role === "OFFICER") {
        navigate("/officer/dashboard");
      } else {
        navigate("/citizen/dashboard");
      }
    } catch (err) {
      const message =
        err.response?.data || "Invalid email or password.";

      setError(
        typeof message === "string"
          ? message
          : "Invalid email or password."
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
          <p className="tagline">{t("welcomeBack")}</p>
          <h2>{t("everyConcernResponse")}</h2>
          <p>{t("trackComplaintsBetterCity")}</p>
        </div>
      </section>

      <section className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <Link className="back-link" to="/">
            ← {t("backToHome")}
          </Link>

          <h2>{t("welcomeBack")}</h2>
          <p>{t("signInContinue")}</p>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <label>{t("emailAddress")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
          />

          <label>{t("password")}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("passwordPlaceholder")}
          />

          <div className="form-row">
            <label className="remember">
              <input type="checkbox" />
              {t("rememberMe")}
            </label>

            <a href="#forgot">{t("forgotPassword")}</a>
          </div>

          <button
            type="submit"
            className="primary-btn full-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : t("signIn")}
          </button>

          <p className="switch-page">
            {t("newToCivicVoice")}{" "}
            <Link to="/register">{t("createAccount")}</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;