import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="auth-page">
      <section className="auth-info">
        <h1>Civic<span>Voice</span></h1>
        <div>
          <p className="tagline">WELCOME BACK</p>
          <h2>Every concern deserves a response.</h2>
          <p>Track your complaints and help build a better city.</p>
        </div>
      </section>

      <section className="auth-form-section">
        <form className="auth-form">
          <Link className="back-link" to="/">← Back to home</Link>

          <h2>Welcome back</h2>
          <p>Sign in to continue to your dashboard.</p>

          <label>Email address</label>
          <input type="email" placeholder="you@example.com" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="form-row">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#forgot">Forgot password?</a>
          </div>

          <button type="button" className="primary-btn full-btn">
            Sign in
          </button>

          <p className="switch-page">
            New to CivicVoice? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;