import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios',()=>({
    post:jest.fn(),
    get:jest.fn()
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
    render(<Login />);

    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'vinay' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    fireEvent.click(loginButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5005/api/user', 
      { name: 'vinay', password: '1234' }
    ));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

});
