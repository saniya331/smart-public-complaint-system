import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header className="navbar">
      <h2>Civic<span>Voice</span></h2>

      <nav>
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <Link className="login-btn" to="/login">Login</Link>
<Link className="register-btn" to="/register">Register</Link>
      </nav>
    </header>
  );
}

export default Navbar;