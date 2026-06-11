import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed ❌"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">
          Welcome Back
        </h2>

        <form
          onSubmit={handleLogin}
          className="login-form"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="login-input"
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;