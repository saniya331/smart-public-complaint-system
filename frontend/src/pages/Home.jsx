import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main className="hero">
        <section className="hero-content">
          <p className="tagline">{t("tagline")}</p>

          <h1>
            {t("heroTitle1")}
            <br />
            <span>{t("heroTitle2")}</span>
          </h1>

          <p className="description">{t("heroDescription")}</p>

          <div className="hero-buttons">
            <Link to="/citizen/submit" className="primary-btn">
              {t("raiseComplaint")}
            </Link>

            <Link to="/citizen/complaints" className="secondary-btn">
              {t("trackComplaint")}
            </Link>
          </div>
        </section>

        <section className="hero-card">
          <p>{t("liveCivicResponse")}</p>
          <h3>{t("issuesResolved")}</h3>
          <h2>1,248</h2>
          <span>{t("improvement")}</span>
        </section>
      </main>
    </>
  );
}

export default Home;