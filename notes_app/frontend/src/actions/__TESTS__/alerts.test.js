import { addAlert } from "../actions/alerts";
import { ADD_ALERT } from "../actions/types";

describe("addAlert action creator", () => {
  it("should create an action to add an alert", () => {
    const alert = {
      message: "This is a test alert.",
      type: "success",
    };

    const expectedAction = {
      type: ADD_ALERT,
      payload: alert,
    };

    const action = addAlert(alert);
    expect(action).toEqual(expectedAction);
  });
});
