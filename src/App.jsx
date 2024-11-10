// import { useState, useEffect } from "react"
// import Groups from "./Components/Groups"
// import Notes from "./Components/Notes"
// import Modal from "./Components/Modal"
// import { saveGroupLocal, getGroupsLocal } from "./utils/storageHelper"
// import "./App.css"


// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [groups, setGroups] = useState([]);
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [isGroupsVisible, setIsGroupsVisible] = useState(true);
 
//   useEffect(() => {
//     const savedGroups = getGroupsLocal();
//     setGroups(savedGroups);
//   }, []);

//   //  useEffect(() => {
//   //   const savedGroups = getGroupsLocal() || [];
//   //   // Ensure each group has a notes array, even if retrieved from storage
//   //   const initializedGroups = savedGroups.map(group => ({
//   //     ...group,
//   //     notes: group.notes || [],
//   //   }));
//   //   setGroups(initializedGroups);
//   // }, []);

//   // const checkGroupNameUnique = (name) => {
//   //   return !groups.some((group) => group.name === name);
//   // };

//   const checkGroupNameUnique = (name) => {
//     const normalizedInputName = name.trim().replace(/\s+/g, " ");
//     return !groups.some((group) => group.name.trim().replace(/\s+/g, " ") === normalizedInputName);
//   };

  
//   const saveGroup = ({name, color}) => {
//     const newGroup = { name, color, notes: []};
//     const updateGroups = [...groups, newGroup]
//     setGroups(updateGroups)
//     saveGroupLocal(updateGroups)  
//     setSelectedGroup(newGroup);
//     setIsGroupsVisible(false);
//     setIsModalOpen(false);   
//   }

//   const addNoteToGroup = (groupIndex, note) => {
//     const updatedGroups = [...groups];
//     updatedGroups[groupIndex].notes.push(note);
//     setGroups(updatedGroups);
//     saveGroupLocal(updatedGroups);
//     // if (groups[groupIndex]) { // Ensure the group exists
//     //   const updatedGroups = [...groups];
//     //   updatedGroups[groupIndex].notes = updatedGroups[groupIndex].notes || []; // Ensure notes array exists
//     //   updatedGroups[groupIndex].notes.push(note);
//     //   setGroups(updatedGroups);
//     //   saveGroupLocal(updatedGroups);
//     // } else {
//     //   console.warn(`Group at index ${groupIndex} does not exist.`);
//     // }
//   };

//   const handleSave = (name, color) => {
//     saveGroup({ name, color });
//   };

//   const handleGroupSelect = (group) => {
//     setSelectedGroup(group);
//     setIsGroupsVisible(false);
//   };

//   const openModal = () => setIsModalOpen(true)
//   const closeModal = () => setIsModalOpen(false)

//   return (
//     <div className="app">   
//       {/* <Groups  openModal={openModal} groups={groups} onSelect={handleGroupSelect} selectedGroup={selectedGroup}/> */}
//       {/* <Notes selectedGroup={selectedGroup}  addNote={addNoteToGroup} groups={groups}/> */}
//       {/* {isModalOpen && <Modal onClose={closeModal} onSave={handleSave} checkGroupNameUnique={checkGroupNameUnique} />} */}
//       {isGroupsVisible ? (
//         <Groups openModal={openModal} groups={groups} onSelect={handleGroupSelect} selectedGroup={selectedGroup} />
//       ) : (
//         <Notes selectedGroup={selectedGroup} addNote={addNoteToGroup} groups={groups} goBack={() => setIsGroupsVisible(true)} />
//       )}
//       {isModalOpen && <Modal onClose={closeModal} onSave={handleSave} checkGroupNameUnique={checkGroupNameUnique} />}
//     </div>
//   )
// }

// export default App


import { useState, useEffect } from "react";
import Groups from "./Components/Groups";
import Notes from "./Components/Notes";
import Content from "./Components/Content";
import Modal from "./Components/Modal";
import { saveGroupLocal, getGroupsLocal } from "./utils/storageHelper";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupsVisible, setIsGroupsVisible] = useState(true); // Controls mobile-specific view
  const [isMobile, setIsMobile] = useState(window.innerWidth >= 320 && window.innerWidth <= 430); // Detects initial screen size

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth >= 320 && window.innerWidth <= 430;
      setIsMobile(mobileView);

      // Reset to show Groups if resized out of mobile
      if (!mobileView) {
        setIsGroupsVisible(true); // Reset to original layout for larger screens
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedGroups = getGroupsLocal();
    setGroups(savedGroups);
  }, []);

  const checkGroupNameUnique = (name) => {
    const normalizedInputName = name.trim().replace(/\s+/g, " ");
    return !groups.some(
      (group) => group.name.trim().replace(/\s+/g, " ") === normalizedInputName
    );
  };

  const saveGroup = ({ name, color }) => {
    const newGroup = { name, color, notes: [] };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    saveGroupLocal(updatedGroups);
    setSelectedGroup(newGroup);

    if (isMobile) {
      setIsGroupsVisible(false); // Switch to Notes only in mobile
    }
    setIsModalOpen(false);
  };

  const addNoteToGroup = (groupIndex, note) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].notes.push(note);
    setGroups(updatedGroups);
    saveGroupLocal(updatedGroups);
  };

  const handleSave = (name, color) => {
    saveGroup({ name, color });
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    if (isMobile) {
      setIsGroupsVisible(false); // Show Notes when a group is selected on mobile
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      {isMobile ? (
        isGroupsVisible ? (
          <Groups openModal={openModal} groups={groups} onSelect={handleGroupSelect} selectedGroup={selectedGroup} />
        ) : (
          <Notes selectedGroup={selectedGroup} addNote={addNoteToGroup} groups={groups} goBack={() => setIsGroupsVisible(true)} />
        )
      ) : (
        <>
          <Groups openModal={openModal} groups={groups} onSelect={handleGroupSelect} selectedGroup={selectedGroup} />
          <Notes selectedGroup={selectedGroup} addNote={addNoteToGroup} groups={groups} />
          {/* <Content /> */}
        </>
      )}
      {isModalOpen && <Modal onClose={closeModal} onSave={handleSave} checkGroupNameUnique={checkGroupNameUnique} />}
    </div>
  );
}

export default App;

