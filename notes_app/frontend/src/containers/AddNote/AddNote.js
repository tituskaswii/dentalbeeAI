import { useState } from 'react'
import { connect } from 'react-redux'
import { addNote } from '../../actions/notes'
import './AddNote.css'

const AddNote = ({ addNote }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        addNote({ title, desc })

        setTitle('')
        setDesc('')
    }

    return (
        <div>
            <h2>Daily Note Management</h2>
            <br />
        <div className="add-note-container">
            <div className="add-note">
            <h2>Add Note</h2>
                <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label htmlFor="title"><strong> Note Title: </strong></label>
                            <input 
                                type="text" 
                                id="title" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                                required 
                                placeholder="Enter Note Title"
                            />
                        </div>

                        <div className="">
                            <label htmlFor="desc"><strong>Note Description:</strong></label>
                            <textarea 
                                id="desc" 
                                value={desc} 
                                onChange={e => setDesc(e.target.value)} 
                                required 
                                placeholder="Enter Note Description"
                            />
                        </div>

                        <button className="btn btn--primary">Submit Note</button>
                </form>
            </div>

            {/* The list of notes will be displayed to the right */}
            <div className="notes-list">
            <p><b> App Features...</b></p>
            <br/>
            <ul>
            <ul>
                <li><strong>Note Creation:</strong> Easily create, edit, and save personal notes with a title and description.</li>
                <li><strong>Text Formatting:</strong> Add rich text formatting for better note organization and readability.</li>
                <li><strong>Note Management:</strong> View and manage your saved notes, including the ability to delete or update them.</li>
                <li><strong>Audio Recording:</strong> Attach audio recordings to your notes for more dynamic and interactive note-taking.</li>
                <li><strong>Responsive Design:</strong> The app is fully responsive, providing an optimal experience on both desktop and mobile devices.</li>
                <li><strong>Data Persistence:</strong> Notes are stored locally, ensuring they are retained across app sessions.</li>
                <li><strong>User-Friendly Interface:</strong> Simple and intuitive interface to create and manage notes efficiently.</li>
                <li><strong>Fast Performance:</strong> The app ensures quick response times for a smooth user experience, even with multiple notes.</li>
            </ul>
            </ul>
        </div>

        </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNote: (note) => dispatch(addNote(note))
    }
}

export default connect(null, mapDispatchToProps)(AddNote)