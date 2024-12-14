import notesReducer from "../reducers/notes";
import { NOTE_ADDED, DELETE_NOTE, NOTES_LOADED, EMPTY_NOTES, NOTE_UPDATED } from "../actions/types";

describe("notesReducer", () => {
  const initialState = { notes: [] };

  it("should return the initial state when no action is provided", () => {
    const state = notesReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("should handle NOTE_ADDED", () => {
    const action = {
      type: NOTE_ADDED,
      payload: { id: 1, title: "Test Note", content: "This is a test note." },
    };

    const expectedState = {
      notes: [action.payload],
    };

    const state = notesReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle NOTES_LOADED", () => {
    const action = {
      type: NOTES_LOADED,
      payload: [
        { id: 1, title: "Note 1", content: "First note" },
        { id: 2, title: "Note 2", content: "Second note" },
      ],
    };

    const expectedState = {
      notes: action.payload,
    };

    const state = notesReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle DELETE_NOTE", () => {
    const initialStateWithNotes = {
      notes: [
        { id: 1, title: "Note 1", content: "First note" },
        { id: 2, title: "Note 2", content: "Second note" },
      ],
    };

    const action = {
      type: DELETE_NOTE,
      payload: 1, // ID of the note to be deleted
    };

    const expectedState = {
      notes: [{ id: 2, title: "Note 2", content: "Second note" }],
    };

    const state = notesReducer(initialStateWithNotes, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle NOTE_UPDATED", () => {
    const initialStateWithNotes = {
      notes: [
        { id: 1, title: "Note 1", content: "First note" },
        { id: 2, title: "Note 2", content: "Second note" },
      ],
    };

    const action = {
      type: NOTE_UPDATED,
      payload: { id: 1, title: "Updated Note 1", content: "Updated content" },
    };

    const expectedState = {
      notes: [
        { id: 1, title: "Updated Note 1", content: "Updated content" },
        { id: 2, title: "Note 2", content: "Second note" },
      ],
    };

    const state = notesReducer(initialStateWithNotes, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle EMPTY_NOTES", () => {
    const initialStateWithNotes = {
      notes: [
        { id: 1, title: "Note 1", content: "First note" },
        { id: 2, title: "Note 2", content: "Second note" },
      ],
    };

    const action = {
      type: EMPTY_NOTES,
    };

    const expectedState = {
      notes: [],
    };

    const state = notesReducer(initialStateWithNotes, action);
    expect(state).toEqual(expectedState);
  });
});
