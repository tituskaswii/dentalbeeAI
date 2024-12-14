import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../Register";
import { registerUser } from "../../actions/auth";
import { addAlert } from "../../actions/alerts";

jest.mock("../../actions/auth", () => ({
  registerUser: jest.fn(),
}));

jest.mock("../../actions/alerts", () => ({
  addAlert: jest.fn(),
}));

const mockStore = configureMockStore();

describe("Register Component", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({
      auth: { token: null, user: null },
    });
    jest.clearAllMocks();
  });

  it("renders the register form correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
    expect(confirmPasswordInput.value).toBe("password123");
  });

  it("dispatches registerUser on valid form submission", () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const form = screen.getByRole("form");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
    fireEvent.submit(form);

    expect(registerUser).toHaveBeenCalledWith({
      email: "test@example.com",
      username: "testuser",
      password: "password123",
      password2: "password123",
    });
  });

  it("dispatches addAlert on password mismatch", () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const form = screen.getByRole("form");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "wrongpassword" } });
    fireEvent.submit(form);

    expect(addAlert).toHaveBeenCalledWith({
      type: "error",
      alert: "Password Needs to be same...",
    });
  });

  it("redirects to home if user is authenticated", () => {
    store = mockStore({
      auth: { token: "test-token", user: { id: 1, email: "test@example.com" } },
    });

    const { container } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    expect(container.innerHTML).toContain("Redirect");
  });
});