import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <header className="navbar">
      <div className="navbar-logo">
        Civic<span>Voice</span>
      </div>

      <nav className="navbar-links">
        <Link to="/">{t("home")}</Link>
        <Link to="/login">{t("login")}</Link>
        <Link to="/register">{t("register")}</Link>
      </nav>

      <div className="navbar-actions">
        <select
          value={language}
          onChange={(event) => changeLanguage(event.target.value)}
          className="language-select"
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="te">తెలుగు</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
    </header>
  );
}

export default Navbar;