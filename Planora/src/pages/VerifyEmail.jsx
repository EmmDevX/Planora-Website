import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";

function VerifyEmail() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state or localStorage
  const pendingUser = JSON.parse(localStorage.getItem("pendingVerification") || "{}");
  const email = location.state?.email || pendingUser.email || "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code) {
      setError("Please enter the verification code");
      return;
    }

    const pendingUser = JSON.parse(localStorage.getItem("pendingVerification") || "{}");
    
    if (!pendingUser.email) {
      setError("No pending verification. Please register first.");
      setTimeout(() => navigate("/register"), 2000);
      return;
    }

    // Check if code matches
    if (code === pendingUser.verificationCode) {
      // Get users array and add the verified user
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user already exists
      const existingIndex = users.findIndex(u => u.email === pendingUser.email);
      if (existingIndex === -1) {
        users.push({
          name: pendingUser.name,
          email: pendingUser.email,
          password: pendingUser.password,
          profilePic: "",
          verified: true
        });
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        users[existingIndex].verified = true;
        localStorage.setItem("users", JSON.stringify(users));
      }

      // Clear pending verification
      localStorage.removeItem("pendingVerification");

      // Auto login after verification
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify({
        name: pendingUser.name,
        email: pendingUser.email,
        profilePic: "",
        verified: true
      }));

      setMessage("Email verified successfully! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleResendCode = () => {
    const pendingUser = JSON.parse(localStorage.getItem("pendingVerification") || "{}");
    if (pendingUser.email) {
      // Simulate sending email by showing alert with code
      alert(`Your verification code is: ${pendingUser.verificationCode}\n\n(In a real app, this would be sent to ${pendingUser.email})`);
      setMessage("Verification code resent! Check your email.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <img src="images/favicon.png" alt="Planora" className="logo-icon-img" />
              <span className="logo-text">Planora</span>
            </Link>
            <h1>Verify Your Email</h1>
            <p>We've sent a verification code to <strong>{email}</strong></p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message" style={{ color: '#10b981', textAlign: 'center', marginBottom: '1rem' }}>{message}</div>}
            
            <div className="form-group">
              <label htmlFor="code">Verification Code</label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the 6-digit code"
                maxLength="6"
                autoComplete="one-time-code"
                style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.25rem' }}
              />
            </div>

            <button type="submit" className="auth-btn-primary">
              Verify Email
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Didn't receive the code?{" "}
              <button 
                onClick={handleResendCode} 
                className="auth-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
              >
                Resend
              </button>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <Link to="/register" className="auth-link">
                ← Back to Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;