import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App'; 
jest.mock('axios',()=>({
  post:jest.fn(),
  get:jest.fn()
}));
describe('App Component', () => {
  test('renders Introduction page by default', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to BusEasy!/i)).toBeInTheDocument();
  });

  test('navigates to Login page when /login is visited', () => {
    render(<App />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

});
