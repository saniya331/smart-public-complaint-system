function Navbar() {
  return (
    <header className="navbar">
      <h2>Civic<span>Voice</span></h2>

      <nav>
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
      </nav>
    </header>
  );
}

export default Navbar;