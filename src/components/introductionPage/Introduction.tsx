import React from "react";
import './Introduction.css'; 
import { useNavigate } from "react-router-dom";

export const Introduction = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };
  const goToRegister = () => {
    navigate('/register');
  };
  return (
    <div className="home-container">
      <div className='sub-container'>
      <h1 className='intro-text'>Welcome to BusEasy!</h1>
      <div className='buttons-div'>
      <button type="submit" className="intro-button" onClick={goToLogin}>Vinay</button>
      <button type='submit' className="intro-button" onClick={goToRegister}>Sanath</button>
      </div>
      </div>

    </div>
  );
};