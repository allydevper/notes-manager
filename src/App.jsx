import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([
    { id: 1, content: 'Buy groceries', date: new Date().toLocaleString() },
    { id: 2, content: 'Read a book', date: new Date().toLocaleString() },
    { id: 3, content: 'Go for a run', date: new Date().toLocaleString() },
    { id: 4, content: 'Finish project report', date: new Date().toLocaleString() },
    { id: 5, content: 'Call mom', date: new Date().toLocaleString() }
  ]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState('');

  const handleAddNote = () => {
    // Logic to add a new note
  };

  const handleDeleteNote = () => {
    // Logic to delete the selected note
  };

  const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="d-flex h-100">
      <div className="sidebar d-flex flex-column">
        <div className="search-bar mb-3">
          <input type="text" className="form-control" placeholder="Search" onChange={(e) => setFilter(e.target.value)}></input>
        </div>
        <div className="note-list">
          {filteredNotes.map((note, index) => (
            <div key={index} className={`note-item ${selectedNote === index ? 'selected' : ''}`} onClick={() => setSelectedNote(index)}>
              <div className="note-title">{note.content.split('\n')[0]}</div>
              <div className="note-date">{note.date}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <div className="header mb-3 d-flex justify-content-between">
          <button className="btn button-success me-2" onClick={handleAddNote}>Crear Nota</button>
          {
            selectedNote !== null && (
              <button className="btn button-danger" onClick={handleDeleteNote}>Eliminar Nota</button>
            )
          }
        </div>
        <div className="note-body" style={{ flexGrow: 1 }}>
          {selectedNote !== null && (
            <textarea
              className="form-control"
              placeholder="Contenido de la nota"
              value={notes[selectedNote].content}
              onChange={(e) => {
                const updatedNotes = [...notes];
                updatedNotes[selectedNote].content = e.target.value;
                setNotes(updatedNotes);
              }}
              style={{ height: '100%', resize: 'none', backgroundColor: '#181818', color: 'white' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
