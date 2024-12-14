import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import Navbar from "../Navbar";
import { logoutUser } from "../../actions/auth";

jest.mock("../../actions/auth", () => ({
  logoutUser: jest.fn(),
}));

const mockStore = configureMockStore([]);

describe("Navbar Component", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({
      auth: {
        token: null,
        user: null,
      },
    });
  });

  it("renders the navbar with login and register links when the user is not authenticated", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Check for presence of "Login" and "Register" links
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();

    // Ensure "Logout" button is not visible
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  it("renders the navbar with the user's username and a logout button when the user is authenticated", () => {
    store = mockStore({
      auth: {
        token: "sample_token",
        user: { username: "testuser" },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Check for welcome message with the user's username
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();

    // Ensure "Logout" button is visible
    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();

    // Ensure "Login" and "Register" links are not visible
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Register/i)).not.toBeInTheDocument();
  });

  it("calls logoutUser when the logout button is clicked", () => {
    store = mockStore({
      auth: {
        token: "sample_token",
        user: { username: "testuser" },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Simulate click on "Logout" button
    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    fireEvent.click(logoutButton);

    // Verify that logoutUser action is called
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });
});
