
import { useState } from "react";
import PropTypes from 'prop-types';
import { formatDate, formatTime } from "../utils/timedateHelper";
import Content from "./Content";
import AddGroupItem from "./AddGroupItem";
import dotImg from "../assets/dot.png";
import enterImg from "../assets/Enterbtn.png";
import activeBtn from "../assets/active.png";
import backBtn from "../assets/MobileBackBtn.png";
import style from "./Notes.module.css";

function Notes({ selectedGroup, addNote, groups, goBack }) {

  const [text, setText] = useState(''); 

  const handleAddNote = () => {
    const date = new Date();
    const note = {
      text,
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
    };
    addNote(groupIndex, note);
    setText(''); 
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const groupIndex = groups.indexOf(selectedGroup);

  return (
    <div className={style.Note}>
      {selectedGroup ? (
        <div className={style.noteContent}>
          <div className={style.groupNotes}>
            <div className={style.noteHeader}>
              {goBack && (
                <button onClick={goBack} className={style.backButton}>
                  <img src={backBtn} alt="Back Button" />
                </button>
              )}
              <div className={style.groupHeading}>
                <AddGroupItem group={selectedGroup} isInNotes={true} />
              </div>
            </div>

            <div className={style.noteCardContainer}>
              {groups[groupIndex] && 
                groups[groupIndex].notes.map((note, noteIndex) => (
                <div className={style.noteCard} key={noteIndex}>
                  <div className={style.noteText}>
                    {note.text}
                  </div>
                  <div className={style.dateTime}>
                    <div className={style.date}>{formatDate(note.date)}</div>
                    <div className={style.dot}><img src={dotImg} alt="" /></div>
                    <div className={style.time}>{formatTime(note.time)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={style.bottomContainer}>
              <div className={style.textAreaContainer}>
                <div className={style.inputArea}>
                  <textarea placeholder="Here’s the sample text for sample work" value={text} onChange={handleTextChange}></textarea>
                </div>
                <div className={style.enterBtn}>
                  {text.trim() === '' ? (
                    <img className={style.disableBtn} src={enterImg} alt="Disabled Enter Button" />
                  ) : (
                    <img className={style.enableBtn} src={activeBtn} alt="Enabled Enter Button"  onClick={handleAddNote} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>) : (
        <div className={style.noteContent}>
          <Content />
        </div>)
      }
    </div>
  )
}

//PropTypes Validation
Notes.propTypes = {
  selectedGroup: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  addNote: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      notes: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
        })
      ), 
    })
  ).isRequired,
  goBack: PropTypes.func,
};

export default Notes;


