import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [currentNote, setCurrentNote] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const colors = {
    red: '#ff9999',
    yellow: '#ffeb99',
    green: '#99ff99',
    blue: '#99ccff'
  };

  const colorMeanings = {
    red: "Don't Understand",
    yellow: "Need to Review",
    green: "Understood Well",
    blue: "Important Info"
  };

  const addNote = (color) => {
    if (currentNote.trim() !== '' && currentTitle.trim() !== '') {
      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = { 
          title: currentTitle, 
          text: currentNote, 
          color: colors[color] 
        };
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setNotes([...notes, { 
          title: currentTitle, 
          text: currentNote, 
          color: colors[color] 
        }]);
      }
      setCurrentNote('');
      setCurrentTitle('');
      showFeedback('Note saved successfully!');
    } else {
      showFeedback('Please include both title and note!', 'error');
    }
  };

  const deleteNote = (index) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
      showFeedback('Note deleted successfully!');
    }
  };

  const editNote = (index) => {
    setCurrentTitle(notes[index].title);
    setCurrentNote(notes[index].text);
    setEditingIndex(index);
    document.querySelector('input[type="text"]').focus();
  };

  const showFeedback = (message, type = 'success') => {
    setShowTooltip({ message, type });
    setTimeout(() => setShowTooltip(false), 3000);
  };

  // Group notes by color
  const getNotesByColor = (colorType) => {
    return notes.filter(note => note.color === colors[colorType]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Coded Notes</h1>
        <p className="header-subtitle">Organize your thoughts with colors</p>
      </header>
      <main className="App-main">
        <div className="note-input">
          <input
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            placeholder="Enter title (e.g., Physics Chapter 1)"
            maxLength={50}
            className="title-input"
          />
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Write your note here..."
            maxLength={200}
          />
          <div className="character-count">
            Title: {currentTitle.length}/50 | Note: {currentNote.length}/200
          </div>
          <div className="button-group">
            <button 
              className="red-button"
              onClick={() => addNote('red')}
              title={colorMeanings.red}
            >
              Don't Understand
            </button>
            <button 
              className="yellow-button"
              onClick={() => addNote('yellow')}
              title={colorMeanings.yellow}
            >
              Need to Review
            </button>
            <button 
              className="green-button"
              onClick={() => addNote('green')}
              title={colorMeanings.green}
            >
              Understood Well
            </button>
            <button 
              className="blue-button"
              onClick={() => addNote('blue')}
              title={colorMeanings.blue}
            >
              Important Info
            </button>
          </div>
          {editingIndex !== null && (
            <div className="editing-indicator">
              Editing note... 
              <button 
                className="cancel-button"
                onClick={() => {
                  setEditingIndex(null);
                  setCurrentNote('');
                  setCurrentTitle('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        
        {showTooltip && (
          <div className={`tooltip ${showTooltip.type}`}>
            {showTooltip.message}
          </div>
        )}
        
        <div className="notes-sections">
          <div className="notes-column">
            <h2 className="column-header red-header">{colorMeanings.red}</h2>
            <div className="notes-list">
              {getNotesByColor('red').map((note, index) => (
                <div 
                  key={index}
                  className="note"
                  style={{ backgroundColor: note.color }}
                >
                  <div className="note-content">
                    <div className="note-title">{note.title}</div>
                    <div className="note-text">{note.text}</div>
                    <div className="note-actions">
                      <button 
                        className="edit-button"
                        onClick={() => editNote(notes.indexOf(note))}
                        title="Edit note"
                      >
                        ✎
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => deleteNote(notes.indexOf(note))}
                        title="Delete note"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="notes-column">
            <h2 className="column-header yellow-header">{colorMeanings.yellow}</h2>
            <div className="notes-list">
              {getNotesByColor('yellow').map((note, index) => (
                <div 
                  key={index}
                  className="note"
                  style={{ backgroundColor: note.color }}
                >
                  <div className="note-content">
                    <div className="note-title">{note.title}</div>
                    <div className="note-text">{note.text}</div>
                    <div className="note-actions">
                      <button 
                        className="edit-button"
                        onClick={() => editNote(notes.indexOf(note))}
                        title="Edit note"
                      >
                        ✎
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => deleteNote(notes.indexOf(note))}
                        title="Delete note"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="notes-column">
            <h2 className="column-header green-header">{colorMeanings.green}</h2>
            <div className="notes-list">
              {getNotesByColor('green').map((note, index) => (
                <div 
                  key={index}
                  className="note"
                  style={{ backgroundColor: note.color }}
                >
                  <div className="note-content">
                    <div className="note-title">{note.title}</div>
                    <div className="note-text">{note.text}</div>
                    <div className="note-actions">
                      <button 
                        className="edit-button"
                        onClick={() => editNote(notes.indexOf(note))}
                        title="Edit note"
                      >
                        ✎
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => deleteNote(notes.indexOf(note))}
                        title="Delete note"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="notes-column">
            <h2 className="column-header blue-header">{colorMeanings.blue}</h2>
            <div className="notes-list">
              {getNotesByColor('blue').map((note, index) => (
                <div 
                  key={index}
                  className="note"
                  style={{ backgroundColor: note.color }}
                >
                  <div className="note-content">
                    <div className="note-title">{note.title}</div>
                    <div className="note-text">{note.text}</div>
                    <div className="note-actions">
                      <button 
                        className="edit-button"
                        onClick={() => editNote(notes.indexOf(note))}
                        title="Edit note"
                      >
                        ✎
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => deleteNote(notes.indexOf(note))}
                        title="Delete note"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
