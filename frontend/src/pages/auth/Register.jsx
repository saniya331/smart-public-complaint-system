import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function Register() {
  const { t } = useLanguage();

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
        <form className="auth-form">
          <Link className="back-link" to="/">
            ← {t("backToHome")}
          </Link>

          <h2>{t("createAccount")}</h2>
          <p>{t("registerReportTrack")}</p>

          <label>{t("fullName")}</label>
          <input
            type="text"
            placeholder={t("fullNamePlaceholder")}
          />

          <label>{t("emailAddress")}</label>
          <input
            type="email"
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
            placeholder={t("createPasswordPlaceholder")}
          />

          <button
            type="button"
            className="primary-btn full-btn"
          >
            {t("createAccount")}
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