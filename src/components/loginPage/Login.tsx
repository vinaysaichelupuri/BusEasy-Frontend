import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user`, {
      name: formData.username,
      password: formData.password,
    });
    if (response.status === 200) {
      alert("Succesfully login in");
      navigate("/home", { state: { name: formData.username } });
    }
    if (response.status === 404) {
      alert("No user exist, please register");
    }
    if (response.status === 401) {
      alert("Incorrect password");
    }
  };

  return (
    <div className="login-page ">
      <div className="login-container">
        <h1>Welcome to BusEasy!</h1>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-login-button">
            Login
          </button>
          <div className="login-register-button-div">
            <button
              className="login-register-button"
              onClick={goToRegister}
              data-test-id="register"
            >
              Don't have an account? Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
