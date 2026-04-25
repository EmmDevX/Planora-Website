import { Link } from "react-router-dom";
import "../styles/Navbar.css";


function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Side - Logo */}
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <img src="images/favicon.png" alt="Planora" className="logo-icon" />
          <span className="log-text">Planora</span>
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="nav-links">
        <a href="#hero" className="nav-link">Home</a>
        <a href="#how-it-works" className="nav-link">How It Works</a>
        <a href="#pricing" className="nav-link">Pricing</a>
        <a href="#testimonial" className="nav-link">Testimonial</a>
        <a href="#about" className="nav-link">About Us</a>
      </div>

      {/* Right Side - Auth Buttons */}
      <div className="nav-buttons">
        <Link to="/login" className="btn-login">Login</Link>
        <Link to="/register" className="btn-register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;