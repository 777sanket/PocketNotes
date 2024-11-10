import { useState } from 'react';
import PropTypes from 'prop-types';

function AddNote({ groupIndex, addNote }) {
  const [text, setText] = useState('');

  const handleAddNote = () => {
    const date = new Date();
    const note = {
      text,
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
    };
    addNote(groupIndex, note);
    setText(''); // Clear the input after adding note
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter note content"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

AddNote.propTypes = {
  groupIndex: PropTypes.number.isRequired,
  addNote: PropTypes.func.isRequired,
};

export default AddNote;
