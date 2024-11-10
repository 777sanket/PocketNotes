import PropTypes from 'prop-types'
import { getInitials } from '../utils/getInitialHelper';
import styles from './AddGroupItem.module.css'

function AddGroupItem({group, isInNotes}) {

  // function getInitials(name) {
  //   if (!name) return ""; 
  //   const words = name.split(" ");
  //   const initials = words
  //     .slice(0, 2) 
  //     .map(word => word[0].toUpperCase()) 
  //     .join(""); 
  //   return initials;
  // }
  
  // const initials = getInitials(group?.name);

  return (
    <div className={styles.groupItem}>
      <div className={styles.groupLogo} style={{background: group?.color}}>
        <div className={styles.logoText}>
          {getInitials(group?.name)}
          {/* {initials} */}
        </div>
      </div>

      <div className={styles.groupName}
      style={{color: isInNotes ? "#FFFFFF" : "#000000"}}>
        {group?.name}
      </div>
    </div>
  )
}

AddGroupItem.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  isInNotes: PropTypes.bool,
};

export default AddGroupItem