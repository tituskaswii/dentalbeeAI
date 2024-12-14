import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "../Home";
import { getNotes, updateNote, deleteNote } from "../../actions/notes";

jest.mock("../../actions/notes", () => ({
  getNotes: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn(),
}));

const mockStore = configureMockStore([thunk]);

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({
      notes: {
        notes: [
          {
            id: 1,
            title: "Test Note 1",
            desc: "This is a test note.",
            audio: null,
            created_at: "2024-12-14T10:00:00Z",
          },
          {
            id: 2,
            title: "Test Note 2",
            desc: "Another test note.",
            audio: "audio_2.webm",
            created_at: "2024-12-13T10:00:00Z",
          },
        ],
      },
    });
  });

  it("renders the list of notes", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/List of Available Notes/i)).toBeInTheDocument();
    expect(screen.getByText("Test Note 1")).toBeInTheDocument();
    expect(screen.getByText("Test Note 2")).toBeInTheDocument();
  });

  it("fetches notes on component load", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getNotes).toHaveBeenCalledTimes(1);
  });

  it("opens the edit popup when a note is clicked", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const viewNoteButton = screen.getAllByText(/View Note/i)[0];
    fireEvent.click(viewNoteButton);

    expect(screen.getByText(/Edit Note/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Note Title:/i)).toHaveValue("Test Note 1");
    expect(screen.getByLabelText(/Note Description:/i)).toHaveValue(
      "This is a test note."
    );
  });

  it("updates a note when the edit form is submitted", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const viewNoteButton = screen.getAllByText(/View Note/i)[0];
    fireEvent.click(viewNoteButton);

    const titleInput = screen.getByLabelText(/Note Title:/i);
    const descInput = screen.getByLabelText(/Note Description:/i);
    const saveButton = screen.getByText(/Save Changes/i);

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(descInput, { target: { value: "Updated Description" } });
    fireEvent.click(saveButton);

    expect(updateNote).toHaveBeenCalledWith({
      id: 1,
      title: "Updated Title",
      desc: "Updated Description",
      audio: null,
    });
  });

  it("deletes a note when the trash icon is clicked", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const trashIcon = screen.getAllByTitle(/Delete Note/i)[0];
    fireEvent.click(trashIcon);

    expect(deleteNote).toHaveBeenCalledWith(1);
  });

  it("starts and stops audio recording", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const viewNoteButton = screen.getAllByText(/View Note/i)[0];
    fireEvent.click(viewNoteButton);

    const toggleRecordingLink = screen.getByText(/Add Audio Recording/i);
    fireEvent.click(toggleRecordingLink);

    const startRecordingButton = screen.getByText(/Start Recording/i);
    const stopRecordingButton = screen.getByText(/Stop Recording/i);

    fireEvent.click(startRecordingButton);
    expect(startRecordingButton).toBeDisabled();
    expect(stopRecordingButton).not.toBeDisabled();

    fireEvent.click(stopRecordingButton);
    expect(startRecordingButton).not.toBeDisabled();
    expect(stopRecordingButton).toBeDisabled();

    // Mock audio recording completion and validate playback
    await waitFor(() => {
      const audioPlayer = screen.getByRole("audio");
      expect(audioPlayer).toBeInTheDocument();
    });
  });

  it("closes the edit popup when the close button is clicked", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const viewNoteButton = screen.getAllByText(/View Note/i)[0];
    fireEvent.click(viewNoteButton);

    const closeButton = screen.getByText(/Close Window/i);
    fireEvent.click(closeButton);

    expect(screen.queryByText(/Edit Note/i)).not.toBeInTheDocument();
  });
});
