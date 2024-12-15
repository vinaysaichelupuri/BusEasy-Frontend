import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Register } from './Register';
import axios from 'axios';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('axios',()=>({
    post:jest.fn(),
    get:jest.fn()
}));
jest.mock('react-router-dom',()=>({
  useNavigate:jest.fn(),
}));
describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

  test('renders login form with username and password fields', () => {
    render(<Register />);
    
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
  test('should update form fields when typing', () => {
    render(<Register />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const emailInput = screen.getByPlaceholderText('Email');
    const numberdInput = screen.getByPlaceholderText('Phone Number');
    fireEvent.change(usernameInput, { target: { value: 'vinay' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.change(emailInput, { target: { value: 'vinaysai@gmail.com' } });
    fireEvent.change(numberdInput, { target: { value: '1234' } });
  });

  test('submits the form and makes an API call', async () => {
    const mockNavigate = jest.fn(); 
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
    render(<Register />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const emailInput = screen.getByPlaceholderText('Email');
    const numberInput = screen.getByPlaceholderText('Phone Number');
    const registerButton = screen.getByText('Register');
    fireEvent.change(usernameInput, { target: { value: 'vinay' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.change(emailInput, { target: { value: 'vinaysai@gmail.com' } });
    fireEvent.change(numberInput, { target: { value: '1234' } });
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5005/api/users',
        { name: 'vinay', password: '1234' ,email:'vinaysai@gmail.com' , phoneNumber:'1234'}
      );
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
