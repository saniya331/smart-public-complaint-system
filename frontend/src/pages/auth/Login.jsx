import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
        <form className="auth-form">
          <Link className="back-link" to="/">
            ← {t("backToHome")}
          </Link>

          <h2>{t("welcomeBack")}</h2>
          <p>{t("signInContinue")}</p>

          <label>{t("emailAddress")}</label>
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
          />

          <label>{t("password")}</label>
          <input
            type="password"
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
            type="button"
            className="primary-btn full-btn"
            onClick={() => navigate("/citizen/dashboard")}
          >
            {t("signIn")}
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