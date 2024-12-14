import * as types from "../types";

describe("Action Types", () => {
  it("should have the correct constant values", () => {
    const expectedTypes = {
      NOTE_ADDED: "NOTE_ADDED",
      DELETE_NOTE: "DELETE_NOTE",
      LOGIN_SUCCESS: "LOGIN_SUCCESS",
      LOGOUT_USER: "LOGOUT_USER",
      EMPTY_NOTES: "EMPTY_NOTES",
      REGISTER_SUCCESS: "REGISTER_SUCCESS",
      NOTES_LOADED: "NOTES_LOADED",
      ADD_ALERT: "ADD_ALERT",
      EMPTY_ALERT: "EMPTY_ALERT",
      NOTE_UPDATED: "NOTE_UPDATED",
    };

    // Compare each type from types.js with the expected values
    Object.entries(expectedTypes).forEach(([key, value]) => {
      expect(types[key]).toBe(value);
    });
  });

  it("should include all action types", () => {
    const definedTypes = Object.keys(types);
    const expectedKeys = [
      "NOTE_ADDED",
      "DELETE_NOTE",
      "LOGIN_SUCCESS",
      "LOGOUT_USER",
      "EMPTY_NOTES",
      "REGISTER_SUCCESS",
      "NOTES_LOADED",
      "ADD_ALERT",
      "EMPTY_ALERT",
      "NOTE_UPDATED",
    ];

    // Ensure no action type is missing
    expect(definedTypes).toEqual(expectedKeys);

    // Check for unexpected types
    expect(definedTypes.length).toBe(expectedKeys.length);
  });
});
