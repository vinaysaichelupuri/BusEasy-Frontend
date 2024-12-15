import React from "react";
import './Register.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  // Submit function
  const onSubmit = async (data) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await axios.post(`${baseUrl}users`, {
        name: data.username,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber
      });

      if (response.status === 200) {
        alert('Registration completed successfully');
        navigate('/login');
      }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to BusEasy!</h1>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })} 
          />

          <input
            type="email"
            placeholder="Email"
            {...register('email', { 
              required: true})} 
          />

          <input
            type="text"
            placeholder="Phone Number"
            {...register('phoneNumber', { required: true })}
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
