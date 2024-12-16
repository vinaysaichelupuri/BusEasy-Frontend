
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate, useNavigation } from "react-router-dom"; 
import { Introduction } from "./Introduction";
import '@testing-library/jest-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Introduction Component", () => {
  it("renders the welcome message", () => {
    render(
      <Router>
        <Introduction />
      </Router>
    );

    const welcomeText = screen.getByText(/Welcome to BusEasy!/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it("renders the Login and Register buttons", () => {
    render(
      <Router>
        <Introduction />
      </Router>
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });
    const registerButton = screen.getByRole('button', { name: /Register/i });

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
  it("calls navigate on Login button click", async () => {
    const navigate = jest.fn(); 
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <Router>
        <Introduction />
      </Router>
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);

    // Wait for the navigate function to be called
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/login'));
  });

})


