import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { loginUser, registerUser, logoutUser } from "../actions/auth";
import { addAlert } from "../actions/alerts";
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT_USER, EMPTY_NOTES, EMPTY_ALERT } from "../actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new MockAdapter(axios);

describe("auth action creators", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({});
    axiosMock.reset();
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("loginUser", () => {
    it("should dispatch LOGIN_SUCCESS and addAlert on successful login", async () => {
      const userData = { email: "test@example.com", password: "password123" };
      const responseData = {
        token: "test-token",
        user: { id: 1, email: "test@example.com" },
      };

      axiosMock.onPost("http://localhost:8000/api/v1/users/login/").reply(200, responseData);

      const expectedActions = [
        addAlert({ type: "success", alert: "You are now Logged In!" }),
        { type: LOGIN_SUCCESS, payload: responseData },
      ];

      await store.dispatch(loginUser(userData));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      expect(localStorage.getItem("token")).toBe("test-token");
      expect(localStorage.getItem("user")).toBe(JSON.stringify(responseData.user));
    });

    it("should dispatch an error alert on failed login", async () => {
      const userData = { email: "test@example.com", password: "wrong-password" };
      const errorMessage = "Invalid credentials";

      axiosMock.onPost("http://localhost:8000/api/v1/users/login/").reply(400, { detail: errorMessage });

      const expectedActions = [
        addAlert({ type: "error", alert: errorMessage }),
      ];

      await store.dispatch(loginUser(userData));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  describe("registerUser", () => {
    it("should dispatch REGISTER_SUCCESS and addAlert on successful registration", async () => {
      const userData = { email: "test@example.com", username: "testuser", password: "password123" };
      const responseData = {
        token: "test-token",
        user: { id: 1, email: "test@example.com", username: "testuser" },
      };

      axiosMock.onPost("http://localhost:8000/api/v1/users/register/").reply(201, responseData);

      const expectedActions = [
        addAlert({ type: "success", alert: "Your Account has been created!" }),
        { type: REGISTER_SUCCESS, payload: responseData },
      ];

      await store.dispatch(registerUser(userData));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      expect(localStorage.getItem("token")).toBe("test-token");
      expect(localStorage.getItem("user")).toBe(JSON.stringify(responseData.user));
    });

    it("should dispatch an error alert on failed registration", async () => {
      const userData = { email: "test@example.com", username: "testuser", password: "password123" };
      const errorMessage = "Email is already in use";

      axiosMock.onPost("http://localhost:8000/api/v1/users/register/").reply(400, {
        details: { email: errorMessage },
      });

      const expectedActions = [
        addAlert({ type: "error", alert: errorMessage }),
      ];

      await store.dispatch(registerUser(userData));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  describe("logoutUser", () => {
    it("should dispatch LOGOUT_USER, EMPTY_ALERT, EMPTY_NOTES, and addAlert on successful logout", async () => {
      const token = "test-token";
      const detailMessage = "You have successfully logged out";

      axiosMock
        .onGet("http://localhost:8000/api/v1/users/logout/", { headers: { Authorization: `Token ${token}` } })
        .reply(200, { detail: detailMessage });

      store = mockStore({
        auth: { token },
      });

      const expectedActions = [
        addAlert({ type: "success", alert: detailMessage }),
        { type: EMPTY_ALERT },
        { type: EMPTY_NOTES },
        { type: LOGOUT_USER },
      ];

      await store.dispatch(logoutUser());

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      expect(localStorage.getItem("token")).toBe(null);
      expect(localStorage.getItem("user")).toBe(null);
    });

    it("should handle 401 unauthorized logout and clear local storage", async () => {
      const token = "test-token";
      const errorMessage = "Invalid token";

      axiosMock
        .onGet("http://localhost:8000/api/v1/users/logout/", { headers: { Authorization: `Token ${token}` } })
        .reply(401, { detail: errorMessage });

      store = mockStore({
        auth: { token },
      });

      const expectedActions = [
        { type: EMPTY_ALERT },
        { type: EMPTY_NOTES },
        { type: LOGOUT_USER },
        addAlert({ type: "error", alert: errorMessage }),
      ];

      await store.dispatch(logoutUser());

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      expect(localStorage.getItem("token")).toBe(null);
      expect(localStorage.getItem("user")).toBe(null);
    });
  });
});
