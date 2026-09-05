import { Link } from "react-router-dom";

function Register() {
  return (
    <main className="auth-page">
      <section className="auth-info">
        <h1>Civic<span>Voice</span></h1>
        <div>
          <p className="tagline">JOIN YOUR COMMUNITY</p>
          <h2>Make your voice count.</h2>
          <p>Raise issues that matter and help improve public services.</p>
        </div>
      </section>

      <section className="auth-form-section">
        <form className="auth-form">
          <Link className="back-link" to="/">← Back to home</Link>

          <h2>Create account</h2>
          <p>Register to report and track civic issues.</p>

          <label>Full name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email address</label>
          <input type="email" placeholder="you@example.com" />

          <label>Mobile number</label>
          <input type="tel" placeholder="98765 43210" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <button type="button" className="primary-btn full-btn">
            Create account
          </button>

          <p className="switch-page">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;