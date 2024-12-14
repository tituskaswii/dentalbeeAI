import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
} from "../actions/notes";
import { addAlert } from "../actions/alerts";
import { logoutUser } from "../actions/auth";
import { NOTE_ADDED, DELETE_NOTE, NOTES_LOADED, NOTE_UPDATED } from "../actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new MockAdapter(axios);

describe("notes action creators", () => {
  let store;

  beforeEach(() => {
    localStorage.clear();
    store = mockStore({
      auth: { token: "test-token" },
    });
    axiosMock.reset();
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addNote", () => {
    it("should dispatch NOTE_ADDED and addAlert on successful note creation", async () => {
      const noteData = { title: "Test Note", desc: "This is a test note." };
      const responseData = { note: { id: 1, title: "Test Note", desc: "This is a test note." } };

      axiosMock.onPost("http://127.0.0.1:8000/api/v1/notes/").reply(201, responseData);

      const expectedActions = [
        addAlert({ type: "success", alert: "Note Created!" }),
        { type: NOTE_ADDED, payload: responseData.note },
      ];

      await store.dispatch(addNote(noteData));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });

    it("should dispatch logoutUser on unauthorized error", async () => {
      const noteData = { title: "Test Note", desc: "This is a test note." };

      axiosMock.onPost("http://127.0.0.1:8000/api/v1/notes/").reply(401);

      await store.dispatch(addNote(noteData));

      const actions = store.getActions();
      expect(actions).toContainEqual(logoutUser());
    });

    it("should dispatch an error alert on failed note creation", async () => {
      const noteData = { title: "Test Note", desc: "This is a test note." };
      const errorMessage = "Failed to create note";

      axiosMock.onPost("http://127.0.0.1:8000/api/v1/notes/").reply(400, { detail: errorMessage });

      const expectedActions = [
        addAlert({ type: "error", alert: errorMessage }),
      ];

      await store.dispatch(addNote(noteData));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  describe("updateNote", () => {
    it("should dispatch NOTE_UPDATED and addAlert on successful note update", async () => {
      const updatedNote = { id: 1, title: "Updated Note", desc: "Updated description" };
      const responseData = { note: updatedNote };

      axiosMock.onPut(`http://127.0.0.1:8000/api/v1/notes/1/`).reply(200, responseData);

      const expectedActions = [
        addAlert({ type: "success", alert: "Note Updated!" }),
        { type: NOTE_UPDATED, payload: responseData.note },
      ];

      await store.dispatch(updateNote(updatedNote));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });

    it("should dispatch logoutUser on unauthorized error", async () => {
      const updatedNote = { id: 1, title: "Updated Note", desc: "Updated description" };

      axiosMock.onPut(`http://127.0.0.1:8000/api/v1/notes/1/`).reply(401);

      await store.dispatch(updateNote(updatedNote));

      const actions = store.getActions();
      expect(actions).toContainEqual(logoutUser());
    });

    it("should dispatch an error alert on failed note update", async () => {
      const updatedNote = { id: 1, title: "Updated Note", desc: "Updated description" };
      const errorMessage = "Failed to update note";

      axiosMock.onPut(`http://127.0.0.1:8000/api/v1/notes/1/`).reply(400, { detail: errorMessage });

      const expectedActions = [
        addAlert({ type: "error", alert: errorMessage }),
      ];

      await store.dispatch(updateNote(updatedNote));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  describe("deleteNote", () => {
    it("should dispatch DELETE_NOTE and addAlert on successful note deletion", async () => {
      const noteId = 1;
      const detailMessage = "Note deleted successfully";

      axiosMock.onDelete(`http://127.0.0.1:8000/api/v1/notes/delete/${noteId}/`).reply(200, { detail: detailMessage });

      const expectedActions = [
        { type: DELETE_NOTE, payload: noteId },
        addAlert({ type: "success", alert: detailMessage }),
      ];

      await store.dispatch(deleteNote(noteId));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });

    it("should dispatch logoutUser on unauthorized error", async () => {
      const noteId = 1;

      axiosMock.onDelete(`http://127.0.0.1:8000/api/v1/notes/delete/${noteId}/`).reply(401);

      await store.dispatch(deleteNote(noteId));

      const actions = store.getActions();
      expect(actions).toContainEqual(logoutUser());
    });

    it("should dispatch an error alert on failed note deletion", async () => {
      const noteId = 1;
      const errorMessage = "Failed to delete note";

      axiosMock.onDelete(`http://127.0.0.1:8000/api/v1/notes/delete/${noteId}/`).reply(400, { detail: errorMessage });

      const expectedActions = [
        addAlert({ type: "error", alert: errorMessage }),
      ];

      await store.dispatch(deleteNote(noteId));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  describe("getNotes", () => {
    it("should dispatch NOTES_LOADED on successful notes fetch", async () => {
      const responseData = { notes: [{ id: 1, title: "Note 1", desc: "Description 1" }] };

      axiosMock.onGet("http://127.0.0.1:8000/api/v1/notes/").reply(200, responseData);

      const expectedActions = [
        { type: NOTES_LOADED, payload: responseData.notes },
      ];

      await store.dispatch(getNotes());

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });

    it("should dispatch logoutUser on unauthorized error", async () => {
      axiosMock.onGet("http://127.0.0.1:8000/api/v1/notes/").reply(401);

      await store.dispatch(getNotes());

      const actions = store.getActions();
      expect(actions).toContainEqual(logoutUser());
    });

    it("should dispatch an error alert on failed notes fetch", async () => {
      const errorMessage = "Failed to fetch notes";

      axiosMock.onGet("http://127.0.0.1:8000/api/v1/notes/").reply(400, { detail: errorMessage });

      const expectedActions = [
        addAlert({ type: "error", alert: errorMessage }),
      ];

      await store.dispatch(getNotes());

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
