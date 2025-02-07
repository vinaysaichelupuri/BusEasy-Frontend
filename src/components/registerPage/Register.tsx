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
  const onSubmit = async (data) => {
    console.log(`${process.env.REACT_APP_BASE_URL}/users`);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, {
        name: data.username,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber
      });

      if (response.status === 200) {
        alert('Registration completed successfully');
        navigate('/login');
      }
      if(response.status===400){
        alert('User already exists! Please login.')
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
