import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css'

function Modal({ onClose, onSave, checkGroupNameUnique }) {
  const [groupName, setGroupName] = useState('');
  const [colorPicked, setColorPicked] = useState('')
  const [error, setError] = useState("");

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // const handleSaveGroup = () => {
  //   if (groupName && colorPicked) { 
  //     onSave(groupName, colorPicked);
  //     onClose();
  //   } else {
  //     if (!groupName && !colorPicked) {
  //       alert("Please enter a group name and select a color.");
  //     } else if (!groupName) {
  //       alert("Please enter a group name.");
  //     } else if (!colorPicked) {
  //       alert("Please select a color.");
  //     }
  //   }
  // }

  const handleSaveGroup = () => {
    if (!groupName) {
      setError("Please enter a group name.");
      return;
    }
    if (!colorPicked) {
      setError("Please select a color.");
      return;
    }
    if (!checkGroupNameUnique(groupName)) {
      setError("Name must be unique");
      return;
    }
    onSave(groupName, colorPicked);
    onClose(); 
  };

  const handleColorPicked = (color) => setColorPicked(color)

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          Create New Group
        </div>
        <div className={styles.groupName}>
          <div className={styles.groupNameContainer}>
            <label htmlFor="">Group Name</label>
            <input type="text" placeholder='Enter group name' value={groupName} onChange={(e) => setGroupName(e.target.value)} /> <br />
          </div>
          <div className={styles.error}>
            {error && <p >{error}</p>}
          </div>
        </div>
        <div className={styles.colorPicker}>
          <div className={styles.colorHeading}>Choose Colour</div>
          <div className={styles.colorOptions}>
            {colors.map((color) => (
              <div
                key={color} 
                className={styles.colorPalet}
                style={{ background: color,
                  border: colorPicked === color ? '2px solid black' : '2px solid transparent',
                 }}
                onClick={() => handleColorPicked(color)}
              ></div>
            ))}
          </div>
        </div>
        <div className={styles.createGroupBtn}>
          <button onClick={handleSaveGroup}>Create</button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  checkGroupNameUnique: PropTypes.func.isRequired,
};

export default Modal