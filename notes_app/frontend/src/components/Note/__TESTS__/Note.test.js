import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { deleteNote } from "../../actions/notes";
import Note from "../Note";

jest.mock("../../actions/notes", () => ({
  deleteNote: jest.fn(),
}));

const mockStore = configureMockStore([]);

describe("Note Component", () => {
  const mockNote = {
    id: 1,
    title: "Sample Note",
    desc: "This is a sample note description. It contains more than 25 characters.",
    created_at: "2024-12-10T12:00:00Z",
  };

  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({});
  });

  it("should render the note details correctly", () => {
    render(
      <Provider store={store}>
        <Note note={mockNote} />
      </Provider>
    );

    // Check the rendered date
    const formattedDate = "10 Dec 2024";
    expect(screen.getByText(formattedDate)).toBeInTheDocument();

    // Check the rendered title
    expect(screen.getByText("Sample Note")).toBeInTheDocument();

    // Check the rendered truncated description
    expect(screen.getByText("This is a sample note des...")).toBeInTheDocument();
  });

  it("should call deleteNote when the delete button is clicked", () => {
    render(
      <Provider store={store}>
        <Note note={mockNote} deleteNote={deleteNote} />
      </Provider>
    );

    // Simulate button click
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    // Ensure deleteNote action is called with the correct ID
    expect(deleteNote).toHaveBeenCalledTimes(1);
    expect(deleteNote).toHaveBeenCalledWith(1);
  });

  it("should not throw errors if deleteNote is not provided", () => {
    render(
      <Provider store={store}>
        <Note note={mockNote} />
      </Provider>
    );

    // Simulate button click
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    // No errors should be thrown, even if deleteNote is not defined
    expect(deleteNote).not.toHaveBeenCalled();
  });
});
