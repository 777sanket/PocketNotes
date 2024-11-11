import { useState, useEffect } from "react";
import Groups from "./Components/Groups";
import Notes from "./Components/Notes";
import Modal from "./Components/Modal";
import { saveGroupLocal, getGroupsLocal } from "./utils/storageHelper";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupsVisible, setIsGroupsVisible] = useState(true); 
  const [isMobile, setIsMobile] = useState(window.innerWidth >= 320 && window.innerWidth <= 430); 

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth >= 320 && window.innerWidth <= 430;
      setIsMobile(mobileView);

      if (!mobileView) {
        setIsGroupsVisible(true); 
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
      setIsGroupsVisible(false);
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
      setIsGroupsVisible(false);
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
        </>
      )}
      {isModalOpen && <Modal onClose={closeModal} onSave={handleSave} checkGroupNameUnique={checkGroupNameUnique} />}
    </div>
  );
}

export default App;

