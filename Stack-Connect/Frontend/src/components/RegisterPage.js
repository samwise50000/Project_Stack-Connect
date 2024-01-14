import React, { useState } from "react";
import { Link } from "react-router-dom";
import useField from "../hooks/useField";
import useRegister from "../hooks/useRegister";
import "./styles/RegisterPage.css";

const RegisterPage = ({ setIsAuthenticated }) => {
  const firstNameField = useField("");
  const lastNameField = useField("");
  const emailField = useField("email");
  const passwordField = useField("password");
  const confirmPasswordField = useField("password");

  const [error, setError] = useState("");
  const { signup } = useRegister();

  const handleSignUpClick = (e) => {
    e.preventDefault();

    if (passwordField.value !== confirmPasswordField.value) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      signup(
        firstNameField.value,
        lastNameField.value,
        emailField.value,
        passwordField.value
      );
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-page">
      <div className="register-header">
        <form className="register-form">
          <h2 className="register-title">Register</h2>
          <label className="register-label">
            First Name:
            <input
              {...firstNameField}
              placeholder="First Name"
              className="register-input"
              required
            />
          </label>
          <br />
          <label className="register-label">
            Last Name:
            <input
              {...lastNameField}
              placeholder="Last Name"
              className="register-input"
              required
            />
          </label>
          <br />
          <label className="register-label">
            Email:
            <input
              {...emailField}
              placeholder="your.email@email.com"
              className="register-input"
              required
            />
          </label>
          <br />
          <label className="register-label">
            Password:
            <input
              {...passwordField}
              placeholder="**********"
              className="register-input"
              required
            />
          </label>
          <br />
          <label className="register-label">
            Confirm Password:
            <input
              {...confirmPasswordField}
              placeholder="**********"
              className="register-input"
              required
            />
          </label>
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={handleSignUpClick} className="register-button">
            Register
          </button>
          <p className="already-user-text">
            Already a user?
            <Link to="/sign-in" className="sign-in-link-button">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
