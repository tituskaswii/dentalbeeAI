// Import the reducer and necessary action types
import authReducer from "../reducers/auth";
import { LOGIN_SUCCESS, LOGOUT_USER, REGISTER_SUCCESS } from "../actions/types";

describe("authReducer", () => {
  // Define the initial state
  const initialState = {
    token: null,
    user: null,
  };

  it("should return the initial state when no action is provided", () => {
    const result = authReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it("should handle LOGIN_SUCCESS by setting token and user", () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: {
        token: "test-token",
        user: { id: 1, name: "Test User", email: "testuser@example.com" },
      },
    };

    const expectedState = {
      token: "test-token",
      user: { id: 1, name: "Test User", email: "testuser@example.com" },
    };

    const result = authReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it("should handle REGISTER_SUCCESS by setting token and user", () => {
    const action = {
      type: REGISTER_SUCCESS,
      payload: {
        token: "new-user-token",
        user: { id: 2, name: "New User", email: "newuser@example.com" },
      },
    };

    const expectedState = {
      token: "new-user-token",
      user: { id: 2, name: "New User", email: "newuser@example.com" },
    };

    const result = authReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it("should handle LOGOUT_USER by resetting token and user to null", () => {
    const currentState = {
      token: "existing-token",
      user: { id: 3, name: "Existing User", email: "existinguser@example.com" },
    };

    const action = {
      type: LOGOUT_USER,
    };

    const expectedState = {
      token: null,
      user: null,
    };

    const result = authReducer(currentState, action);
    expect(result).toEqual(expectedState);
  });

  it("should return the current state for unknown action types", () => {
    const currentState = {
      token: "random-token",
      user: { id: 4, name: "Random User", email: "randomuser@example.com" },
    };

    const action = {
      type: "UNKNOWN_ACTION",
    };

    const result = authReducer(currentState, action);
    expect(result).toEqual(currentState);
  });
});
