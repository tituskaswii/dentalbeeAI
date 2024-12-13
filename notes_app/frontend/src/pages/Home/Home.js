import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotes, updateNote, deleteNote } from "../../actions/notes"; // Include deleteNote action
import Note from "../../components/Note/Note";
import AddNote from "../../containers/AddNote/AddNote";
import { ReactMic } from 'react-mic'; // Import ReactMic
import './home.css';
import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons

const Home = ({ notes, getNotes, updateNote, deleteNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // To store the audio URL for playback
  const [isRecordingVisible, setRecordingVisible] = useState(false); // Toggle visibility of the recording section

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setEditTitle(note.title); // Set the initial title for editing
    setEditBody(note.desc); // Set the initial body for editing
  };

  const closePopup = () => {
    setSelectedNote(null);
  };

  const handleStartRecording = () => {
    setRecording(true);
  };

  const handleStopRecording = () => {
    setRecording(false);
  };

  const handleAudioStop = (recordedBlob) => {
    setAudioBlob(recordedBlob.blob); // Store the recorded audio blob
    setAudioUrl(URL.createObjectURL(recordedBlob.blob)); // Create a URL to play the audio
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedNote) {
      const updatedNote = {
        id: selectedNote.id,
        title: editTitle,
        desc: editBody, // Use the description (body) field
        audio: audioBlob // Attach the audio blob to the update payload
      };

      console.log('Updated Note in Home.js:', updatedNote);
      updateNote(updatedNote);
      //updateNote: (note) => dispatch(updateNote(note.id, { title: note.title, desc: note.desc })),
      setSelectedNote(null); // Close the popup after editing
      setAudioBlob(null); // Clear the audio blob after submission
      setAudioUrl(null); // Clear the audio URL after submission
    }
  };

  const handleToggleRecording = () => {
    setRecordingVisible(!isRecordingVisible); // Toggle visibility of the recording component
  };

  const handleTrashClick = (noteId) => {
    deleteNote(noteId); // Dispatch the delete action
  };

  return (
    <div className="home container">
      <AddNote />

      <div>
        <br />
      <h2>List of available Notes</h2>
      <div className="notes-container">
        <div className="notes">
          {notes.map((note) => (
            <div className="note-card" key={note.id}>
              <Note note={note} />
              <button
                className="view-note-btn"
                onClick={() => handleNoteClick(note)}
              >
                View Note
              </button>
              <FaTrash
                className="trash-icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the click event for viewing the note
                  handleTrashClick(note.id);
                }}
                title="Delete Note"
              />
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Popup for zoomed-in note details */}
      {selectedNote && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Edit Note</h2>
            <div className="form-container">
              <form onSubmit={handleEditSubmit}>
                <div className="input-container">
                  <label htmlFor="edit-title"> <strong>Note Title: </strong> </label>
                  <input
                    id="edit-title"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="edit-body"><strong> Note Description: </strong></label>
                  <textarea
                    id="edit-body"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    required
                  />
                </div>

                {/* Link to toggle audio recording */}
                <a
                  href="#"
                  onClick={handleToggleRecording}
                  className="toggle-recording-link"
                  style={{ display: 'block', textAlign: 'left' }}
                >
                  {isRecordingVisible
                    ? 'Hide Audio Recording'
                    : 'Add Audio Recording'}
                </a>

                {/* Audio recording section */}
                {isRecordingVisible && (
                  <div className="audio-recording">
                    <div className="recording-buttons">
                      <button
                        type="button"
                        onClick={handleStartRecording}
                        disabled={recording}
                        className="start-recording-btn"
                      >
                        Start Recording
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        onClick={handleStopRecording}
                        disabled={!recording}
                        className="stop-recording-btn"
                      >
                        Stop Recording
                      </button>
                    </div>
                    <br />
                    <div className="mic-visual">
                      <ReactMic
                        record={recording}
                        className="sound-wave"
                        onStop={handleAudioStop}
                        strokeColor="#000000"
                        backgroundColor="#FF4081"
                      />
                    </div>

                    {/* Play the recorded audio */}
                    {audioUrl && (
                      <div className="audio-player">
                        <audio controls>
                          <source src={audioUrl} type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>
                )}
                <br />

                <button type="submit" className="btn btn--primary">
                  Save Changes
                </button>
              </form>
            </div>

            {/* Close button outside the form */}
            <button
              className="btn btn--primary close-btn"
              onClick={closePopup}
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: () => dispatch(getNotes()),
    updateNote: (note) => dispatch(updateNote({id: note.id, title: note.title, desc: note.desc })),
    deleteNote: (id) => dispatch(deleteNote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
