// Import the reducer and necessary action types
import alertsReducer from "../reducers/alerts";
import { ADD_ALERT, EMPTY_ALERT } from "../actions/types";

describe("alertsReducer", () => {
  // Define the initial state
  const initialState = {
    alerts: [],
  };

  it("should return the initial state when no action is provided", () => {
    const result = alertsReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it("should handle ADD_ALERT by adding a new alert", () => {
    const action = {
      type: ADD_ALERT,
      payload: { message: "This is a test alert", type: "success" },
    };

    const expectedState = {
      alerts: [{ message: "This is a test alert", type: "success" }],
    };

    const result = alertsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it("should handle EMPTY_ALERT by clearing all alerts", () => {
    const currentState = {
      alerts: [{ message: "Existing alert", type: "error" }],
    };

    const action = {
      type: EMPTY_ALERT,
    };

    const expectedState = {
      alerts: [],
    };

    const result = alertsReducer(currentState, action);
    expect(result).toEqual(expectedState);
  });

  it("should return the current state when the action type is unknown", () => {
    const currentState = {
      alerts: [{ message: "Existing alert", type: "info" }],
    };

    const action = {
      type: "UNKNOWN_ACTION",
    };

    const result = alertsReducer(currentState, action);
    expect(result).toEqual(currentState);
  });
});
