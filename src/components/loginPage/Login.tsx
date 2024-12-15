import React, { useState } from "react";
import './Login.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as dotenv from 'dotenv'
dotenv.config({
    override: true,
    path: '.env',
  });


export const Login = () => {
  const navigate = useNavigate();
const goToRegister = () => {
  navigate('/register');
};
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const response = await axios.post(`${baseUrl}user`, {
      name: formData.username,
      password: formData.password,
    });
    if(response.status===200){
      alert('Registration completed succesfully')
      navigate('/home');
  }
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
          <button className="login-register-button" onClick={goToRegister} data-test-id="register">
            Don't have an account? Create account
          </button>
          </div>

        </form>
      </div>
    </div>
  );
};
