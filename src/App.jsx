import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState('');

  const handleAddNote = () => {
    // Logic to add a new note
  };

  const handleDeleteNote = () => {
    // Logic to delete the selected note
  };

  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 sidebar">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar notas..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ul className="list-group">
            {filteredNotes.map((note, index) => (
              <li key={index} className={`list-group-item ${selectedNote === index ? 'active' : ''}`} onClick={() => setSelectedNote(index)}>
                {note.title} - {note.date}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8 main-content">
          <div className="header mb-3">
            <button className="btn btn-primary me-2" onClick={handleAddNote}>Crear Nota</button>
            <button className="btn btn-danger" onClick={handleDeleteNote}>Eliminar Nota</button>
          </div>
          {selectedNote !== null && (
            <div>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Título de la nota"
                value={notes[selectedNote].title}
                onChange={(e) => {
                  const updatedNotes = [...notes];
                  updatedNotes[selectedNote].title = e.target.value;
                  setNotes(updatedNotes);
                }}
              />
              <textarea
                className="form-control"
                placeholder="Contenido de la nota"
                value={notes[selectedNote].body}
                onChange={(e) => {
                  const updatedNotes = [...notes];
                  updatedNotes[selectedNote].body = e.target.value;
                  setNotes(updatedNotes);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
