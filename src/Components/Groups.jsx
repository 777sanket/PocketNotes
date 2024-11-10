
import style from "./Groups.module.css";
import plusImg from "../assets/plus.png";
import AddGroupItem from "./AddGroupItem";
import PropTypes from "prop-types";

function Groups({openModal, groups, onSelect, selectedGroup}) {
  const handleOpen = () => {
    openModal();
  }

  // const [activeIndex, setActiveIndex] = useState(null);

  // const handleClick = (group, index) => {
  //   setActiveIndex(index); 
  //   onSelect(group); 
  // };

  return (
    <div className={style.Group}>
      <div className={style.heading}>
        <h1>Pocket Notes</h1>
      </div>
      <div className={style.groupsList}>
       <ul>
        {groups.map((group, index) => (
          <li
            // className={style.listItem}
            key={index}
            // className={`${style.listItem} ${activeIndex === index ? style.active : ""}`}
            // onClick={() => handleClick(group, index)}
            className={`${style.listItem} ${selectedGroup === group ? style.active : ""}`}
            onClick={() => onSelect(group)}
            style={{ cursor: "pointer" }}
          >
            <AddGroupItem  group={group} />
          </li>
        ))}
       </ul>
      </div>
      
        <div className={style.addGroupBtn} onClick={handleOpen} >
          <button >
            <img src={plusImg} alt="Add Grp Button" />

          </button>
        </div>
       
    </div>
  );
}

Groups.propTypes = {
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
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Groups;
