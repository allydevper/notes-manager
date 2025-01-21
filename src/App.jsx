import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Quill from 'quill';

function App() {
  const quillRefs = useRef([]);
  const [notes, setNotes] = useState([]);
  const isFirstRender = useRef(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState('');
  const nextId = useRef(1);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        nextId.current = Math.max(...parsedNotes.map(note => note.id)) + 1;
      }
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (selectedNote !== null) {
      if (!quillRefs.current[selectedNote]) {

        const quill = new Quill(`#editor-${selectedNote}`, {
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              ['link', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean']
            ]
          }
        });

        quill.focus();

        quill.on('text-change', () => {
          const content = quill.root.innerHTML;
          setNotes(prevNotes => prevNotes.map(note => note.id === selectedNote ? { ...note, content } : note));
        });

        quill.root.innerHTML = notes.find(f => f.id == selectedNote)?.content || '';
        quillRefs.current[selectedNote] = quill;
      }
    }

    return () => {
      if (selectedNote !== null && quillRefs.current[selectedNote]) {
        quillRefs.current[selectedNote].theme.modules.toolbar.container.remove();
        quillRefs.current[selectedNote].off('text-change');
        quillRefs.current[selectedNote] = null;
      }
    };
  }, [selectedNote]);

  const handleAddNote = () => {
    if (!selectedNote || (notes.find(f => f.id == selectedNote).content.replace(/<[^>]*>/g, '') !== '' && notes[0].content.replace(/<[^>]*>/g, '') !== '')) {
      const newNote = {
        id: nextId.current++,
        content: '',
        date: new Date().toLocaleString()
      };

      setNotes([newNote, ...notes]);
      setSelectedNote(newNote.id);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote !== null) {
      const updatedNotes = notes.filter((note) => note.id !== selectedNote);
      setNotes(updatedNotes);
      setSelectedNote(null);
    }
  };

  const filteredNotes = notes.filter(note => note.content.replace(/<[^>]*>/g, '').toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="d-flex h-100">
      <div className="sidebar d-flex flex-column">
        <div className="search-bar mb-3">
          <input type="text" className="form-control" placeholder="Buscar Nota" onChange={(e) => setFilter(e.target.value)} />
        </div>
        <div className="note-list">
          {filteredNotes.map((note) => (
            <div key={note.id} className={`note-item ${selectedNote === note.id ? 'selected' : ''}`} onClick={() => setSelectedNote(note.id)}>
              <div className="note-title text-truncate">
                {note.content.replaceAll("</p>", '\n').replace(/<[^>]*>/g, '').split('\n').find(line => line.trim() !== '') || 'Nueva Nota'}
              </div>
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
          {selectedNote !== null && <div id={`editor-${selectedNote}`}></div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
