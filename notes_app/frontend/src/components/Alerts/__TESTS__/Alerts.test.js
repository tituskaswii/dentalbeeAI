import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { withAlert } from "react-alert";
import Alerts from "../Alerts";

jest.mock("react-alert", () => ({
  withAlert: () => (Component) => (props) => <Component {...props} alert={{ error: jest.fn(), success: jest.fn() }} />,
}));

const mockStore = configureMockStore([]);

describe("Alerts Component", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({
      alerts: {
        alerts: [
          { type: "success", alert: "Success Alert Message" },
          { type: "error", alert: "Error Alert Message" },
        ],
      },
    });
  });

  it("should display success and error alerts", () => {
    const mockAlert = {
      error: jest.fn(),
      success: jest.fn(),
    };

    render(
      <Provider store={store}>
        <Alerts alert={mockAlert} />
      </Provider>
    );

    // Check if success alert is called with correct message
    expect(mockAlert.success).toHaveBeenCalledWith("Success Alert Message");

    // Check if error alert is called with correct message
    expect(mockAlert.error).toHaveBeenCalledWith("Error Alert Message");

    // Ensure the correct number of alert invocations
    expect(mockAlert.success).toHaveBeenCalledTimes(1);
    expect(mockAlert.error).toHaveBeenCalledTimes(1);
  });

  it("should not call alerts if no alerts are in the Redux state", () => {
    store = mockStore({
      alerts: {
        alerts: [],
      },
    });

    const mockAlert = {
      error: jest.fn(),
      success: jest.fn(),
    };

    render(
      <Provider store={store}>
        <Alerts alert={mockAlert} />
      </Provider>
    );

    // Ensure no alerts are triggered
    expect(mockAlert.success).not.toHaveBeenCalled();
    expect(mockAlert.error).not.toHaveBeenCalled();
  });
});
