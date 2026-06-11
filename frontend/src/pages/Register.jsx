import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful ✅");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed ❌"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <h2 className="register-title">
          Create Account
        </h2>

        <form
          onSubmit={handleRegister}
          className="register-form"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            className="register-input"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="register-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="register-input"
          />

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;