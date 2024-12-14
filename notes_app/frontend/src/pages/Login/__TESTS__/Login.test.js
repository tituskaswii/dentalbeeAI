import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../Login";
import { loginUser } from "../../actions/auth";

jest.mock("../../actions/auth", () => ({
  loginUser: jest.fn(),
}));

const mockStore = configureMockStore();

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({
      auth: { token: null, user: null },
    });
    jest.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("dispatches loginUser on form submission", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const form = screen.getByRole("form");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(form);

    expect(loginUser).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("redirects to home if user is authenticated", () => {
    store = mockStore({
      auth: { token: "test-token", user: { id: 1, email: "test@example.com" } },
    });

    const { container } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(container.innerHTML).toContain("Redirect");
  });
});
