import axios from "axios"
import { addAlert } from "./alerts"
import { logoutUser } from "./auth"
import { NOTE_ADDED, DELETE_NOTE, NOTES_LOADED, NOTE_UPDATED } from "./types"

export const addNote = ({ title, desc }) => {
    return function (dispatch, getState) {
        const formData = new FormData()

        formData.append('title', title)
        formData.append('desc', desc)

        axios.post(`http://127.0.0.1:8000/api/v1/notes/`, formData, {
            headers: {
                'Authorization': `Token ${getState().auth.token}`
            }
        })
            .then(res => {
                if (res.status === 201) {
                    dispatch(addAlert({
                        type: 'success',
                        alert: 'Note Created!'
                    }))
                    dispatch({
                        type: NOTE_ADDED,
                        payload: res.data.note
                    })
                }
            })
            .catch(e => {
                switch(e.response.status) {
                    case 401:
                        dispatch(logoutUser())
                        break
                    default:
                        dispatch(addAlert({
                            type: 'error',
                            alert: e.response.data.detail
                        }))
                }
            })
    }
}

export const updateNoteWorkingWithoutFile = (updatedNote) => {
    console.log('Data Received :', updatedNote);
    return function (dispatch, getState) {
      // Destructure id, title, desc, audio from the updatedNote object
      const { id, title, desc, audio } = updatedNote;

      console.error('Data update Inside : ' + updatedNote);

      // Check if the id exists
      if (!id) {
        console.error('ID is missing or undefined');
        return;
      }

      console.log('ID:', id);  // Logging the id to ensure it's correct

      // Create FormData object
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', desc);
      if (audio) {
        formData.append('audio', audio); // Only append audio if it's not null
      }

      console.log('Sending update request for note id:', id);

      // Send the PUT request with updated data
      axios.put(`http://127.0.0.1:8000/api/v1/notes/${id}/`, formData, {
        headers: {
          'Authorization': `Token ${getState().auth.token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(addAlert({
            type: 'success',
            alert: 'Note Updated!'
          }));
          dispatch({
            type: NOTE_UPDATED,
            payload: res.data.note
          });
        }
      })
      .catch(e => {
        switch (e.response.status) {
          case 401:
            dispatch(logoutUser());
            break;
          default:
            dispatch(addAlert({
              type: 'error',
              alert: e.response.data.detail
            }));
        }
      });
    };
  }

  export const updateNote = (updatedNote) => {
    console.log('Data Received:', updatedNote);
    return function (dispatch, getState) {
      const { id, title, desc, audio } = updatedNote;

      console.error('Data update Inside:', updatedNote);
      console.log('Audio File Content:', audio);

      // Check if the id exists
      if (!id) {
        console.error('ID is missing or undefined');
        return;
      }

      console.log('ID:', id);  // Logging the id to ensure it's correct

      // Create FormData object
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', desc);

      if (audio) {
        // Log the file details before sending
        console.log('Audio File:', audio);
        console.log('File Name:', audio.name);
        console.log('File Size:', audio.size);
        console.log('File Type:', audio.type);

        formData.append('audio', audio); // Only append audio if it's not null
      }

      // Send the PUT request with updated data
      axios.put(`http://127.0.0.1:8000/api/v1/notes/${id}/`, formData, {
        headers: {
          'Authorization': `Token ${getState().auth.token}`,
          'Content-Type': 'multipart/form-data' // Axios automatically handles this header for FormData
        }
      })
      .then(res => {
        if (res.status === 200) {
          // Show success alert and update Redux state
          dispatch(addAlert({
            type: 'success',
            alert: 'Note Updated!'
          }));
          dispatch({
            type: NOTE_UPDATED,
            payload: res.data.note
          });
        }
      })
      .catch(e => {
        switch (e.response.status) {
          case 401:
            dispatch(logoutUser());
            break;
          default:
            dispatch(addAlert({
              type: 'error',
              alert: e.response.data.detail
            }));
        }
      });
    };
  }

export const deleteNote = (id) => {
    return function (dispatch, getState) {
        console.log('Delete ID inside Axio:', id);
        axios.delete(`http://127.0.0.1:8000/api/v1/notes/delete/${id}/`, {
            headers: {
                'Authorization': `Token ${getState().auth.token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: DELETE_NOTE,
                        payload: id
                    })
                    dispatch(addAlert({
                        type: 'success',
                        alert: res.data.detail
                    }))
                }
            })
            .catch(e => {
                switch(e.response.status) {
                    case 401:
                        dispatch(logoutUser())
                        break
                    default:
                        dispatch(addAlert({
                            type: 'error',
                            alert: e.response.data.detail
                        }))
                }
            })
    }
}

export const getNotes = () => {
    return function (dispatch, getState) {
        axios.get('http://127.0.0.1:8000/api/v1/notes/', {
            headers: {
                'Authorization': `Token ${getState().auth.token}`
            }
        })
            .then(res => {
                dispatch({
                    type: NOTES_LOADED,
                    payload: res.data.notes
                })
            })
            .catch(e => {
                switch(e.response.status) {
                    case 401:
                        dispatch(logoutUser())
                        break
                    default:
                        dispatch(addAlert({
                            type: 'error',
                            alert: e.response.data.detail
                        }))
                }
            })
    }
}