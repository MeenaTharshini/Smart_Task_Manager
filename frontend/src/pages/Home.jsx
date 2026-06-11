import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-card">

        <div className="hero-badge">
          🚀 Productivity Made Simple
        </div>

        <h1 className="home-title">
          Smart Task Manager
        </h1>

        <p className="hero-text">
          Organize tasks, track progress, boost productivity,
          and manage your daily workflow from one beautiful dashboard.
        </p>

        <div className="auth-buttons">
          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="register-btn">
              Create Account
            </button>
          </Link>
        </div>

        <div className="stats-container">
          <div className="stat-box">
            <h2>100%</h2>
            <p>Task Tracking</p>
          </div>

          <div className="stat-box">
            <h2>24/7</h2>
            <p>Availability</p>
          </div>

          <div className="stat-box">
            <h2>∞</h2>
            <p>Productivity</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;