import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AddNote from "../AddNote";
import { addNote } from "../../actions/notes";

jest.mock("../../actions/notes", () => ({
  addNote: jest.fn(),
}));

const mockStore = configureMockStore([]);

describe("AddNote Component", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({});
  });

  it("renders the AddNote form correctly", () => {
    render(
      <Provider store={store}>
        <AddNote addNote={addNote} />
      </Provider>
    );

    // Check for the presence of form elements
    expect(screen.getByText("Add Note")).toBeInTheDocument();
    expect(screen.getByLabelText(/Note Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Note Description:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Note/i })).toBeInTheDocument();
  });

  it("updates input values as the user types", () => {
    render(
      <Provider store={store}>
        <AddNote addNote={addNote} />
      </Provider>
    );

    // Simulate user typing in the inputs
    const titleInput = screen.getByLabelText(/Note Title:/i);
    const descInput = screen.getByLabelText(/Note Description:/i);

    fireEvent.change(titleInput, { target: { value: "New Note Title" } });
    fireEvent.change(descInput, { target: { value: "This is a note description." } });

    // Verify the values have been updated
    expect(titleInput.value).toBe("New Note Title");
    expect(descInput.value).toBe("This is a note description.");
  });

  it("calls addNote with the correct data when the form is submitted", () => {
    render(
      <Provider store={store}>
        <AddNote addNote={addNote} />
      </Provider>
    );

    // Simulate user typing in the inputs
    const titleInput = screen.getByLabelText(/Note Title:/i);
    const descInput = screen.getByLabelText(/Note Description:/i);

    fireEvent.change(titleInput, { target: { value: "New Note Title" } });
    fireEvent.change(descInput, { target: { value: "This is a note description." } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /Submit Note/i });
    fireEvent.click(submitButton);

    // Verify addNote is called with the correct arguments
    expect(addNote).toHaveBeenCalledTimes(1);
    expect(addNote).toHaveBeenCalledWith({
      title: "New Note Title",
      desc: "This is a note description.",
    });

    // Verify that inputs are cleared after submission
    expect(titleInput.value).toBe("");
    expect(descInput.value).toBe("");
  });

  it("does not submit the form if inputs are empty", () => {
    render(
      <Provider store={store}>
        <AddNote addNote={addNote} />
      </Provider>
    );

    // Submit the form without entering any values
    const submitButton = screen.getByRole("button", { name: /Submit Note/i });
    fireEvent.click(submitButton);

    // Verify addNote is not called
    expect(addNote).not.toHaveBeenCalled();
  });
});
