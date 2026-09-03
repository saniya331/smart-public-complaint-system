import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <main className="hero">
        <section className="hero-content">
          <p className="tagline">SMART PUBLIC GRIEVANCE PORTAL</p>

          <h1>
            Your city. Your voice.
            <br />
            <span>Clear action.</span>
          </h1>

          <p className="description">
            Report local issues, track every update, and help build a more
            responsive community.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Raise a Complaint</button>
            <button className="secondary-btn">Track Complaint</button>
          </div>
        </section>

        <section className="hero-card">
          <p>LIVE CIVIC RESPONSE</p>
          <h3>Issues resolved this month</h3>
          <h2>1,248</h2>
          <span>↑ 18% improvement</span>
        </section>
      </main>
    </>
  );
}

export default Home;