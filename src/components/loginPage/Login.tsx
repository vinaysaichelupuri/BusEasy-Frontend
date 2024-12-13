import React, { useState } from "react";
import './Login.css'; 
import axios from "axios";

export const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5005/api/user', {
      name: formData.username,
      password: formData.password
    });
    console.log(response.status)
  };

  return (
    <div className="login-page ">
      <div className="login-container">
        <h1>Welcome to BusEasy!</h1>
        <h2 >Sign in</h2>
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
          <button type="submit" className="login-login-button">Login</button>
          <div className="login-register-button-div">
          <button className="login-register-button">
            Don't have an account? Create account
          </button>
          </div>

        </form>
      </div>
    </div>
  );
};
