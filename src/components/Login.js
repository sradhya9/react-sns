import React, { useState } from "react";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "./splitbills/frontend/sb1.html";
      } else {
        triggerError(`❌ Login failed: ${data.message}`);
      }
    } catch (err) {
      triggerError("⚠️ Server error: Unable to connect.");
      setLoading(false);
    }
  };

  const triggerError = (msg) => {
    setError(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };

  return (
    <div className="background">
      <div className={`wrapper ${isShaking ? "shake" : ""}`}>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          {error && <div className="error-box">{error}</div>}

          <div className="input-field">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Enter your email</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Enter your password</label>
          </div>

          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="register">
            <p>Don't have an account? <a href="/signup">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
