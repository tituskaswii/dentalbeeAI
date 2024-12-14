// Import the rootReducer and initial states of the individual reducers
import { rootReducer } from "../reducers/index";
import notesReducer from "../reducers/notes";
import authReducer from "../reducers/auth";
import alertsReducer from "../reducers/alerts";

describe("rootReducer", () => {
  it("should return the initial state when no action is provided", () => {
    const initialState = {
      notes: notesReducer(undefined, {}),
      auth: authReducer(undefined, {}),
      alerts: alertsReducer(undefined, {}),
    };

    const state = rootReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("should delegate actions to the correct reducer", () => {
    // Example: Test an action handled by the notesReducer
    const notesAction = {
      type: "ADD_NOTE",
      payload: { id: 1, content: "Test Note" },
    };

    const initialState = {
      notes: [],
      auth: { token: null, user: null },
      alerts: { alerts: [] },
    };

    const expectedState = {
      ...initialState,
      notes: notesReducer(initialState.notes, notesAction),
    };

    const state = rootReducer(initialState, notesAction);
    expect(state).toEqual(expectedState);
  });

  it("should handle multiple reducers independently", () => {
    const authAction = {
      type: "LOGIN_SUCCESS",
      payload: {
        token: "test-token",
        user: { id: 1, name: "Test User", email: "testuser@example.com" },
      },
    };

    const alertsAction = {
      type: "ADD_ALERT",
      payload: { id: 1, message: "Test Alert", type: "success" },
    };

    const initialState = {
      notes: [],
      auth: { token: null, user: null },
      alerts: { alerts: [] },
    };

    const intermediateState = rootReducer(initialState, authAction);

    const finalState = rootReducer(intermediateState, alertsAction);

    expect(finalState).toEqual({
      notes: [],
      auth: {
        token: "test-token",
        user: { id: 1, name: "Test User", email: "testuser@example.com" },
      },
      alerts: {
        alerts: [{ id: 1, message: "Test Alert", type: "success" }],
      },
    });
  });
});
