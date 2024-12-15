import React, { useState } from "react";
import './Register.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" , email:"",phoneNumber:""});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const response =  await axios.post(`${baseUrl}users`, {
      name: formData.username,
      password: formData.password,
      email:formData.email,
      phoneNumber:formData.phoneNumber
    });
    if(response.status===200){
        alert('Registration completed succesfully')
        navigate('/login');
    }
  };

  return (
    <div className="login-page ">
      <div className="login-container">
        <h1>Welcome to BusEasy!</h1>
        <h2 >Sign up</h2>
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
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
           <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
           <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-login-button">Register</button>
          <div className="login-register-button-div">
          <button className="login-register-button" onClick={goToLogin}>
            Already have an account? Login.
          </button>
          </div>

        </form>
      </div>
    </div>
  );
};
