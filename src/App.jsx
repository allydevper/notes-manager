import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const isFirstRender = useRef(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (selectedNote !== null && notes[selectedNote].content !== '') {
      setNotes([...notes, { id: notes.length + 1, content: '', date: new Date().toLocaleString() }]);
      setSelectedNote(notes.length);
    } else if (selectedNote == null) {
      setNotes([...notes, { id: notes.length + 1, content: '', date: new Date().toLocaleString() }]);
      setSelectedNote(notes.length);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote !== null) {
      const updatedNotes = notes.filter((_, index) => index !== selectedNote);
      setNotes(updatedNotes);
      setSelectedNote(null);
    }
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
