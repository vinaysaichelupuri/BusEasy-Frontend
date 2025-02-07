import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
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
    render(<Login />);
    
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
  test('should update form fields when typing', () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(usernameInput, { target: { value: 'vinay' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
  });

  test('submits the form and makes an API call', async () => {
    const mockNavigate = jest.fn(); 
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    fireEvent.change(usernameInput, { target: { value: 'vinay' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5005/api/user',
        { name: 'vinay', password: '1234' }
      );
      expect(mockNavigate).toHaveBeenCalledWith("/home", {"state": {"name": "vinay"}});
    });
  });
});
