import React, { createContext, useState } from 'react';
import ModalComponent from "../component/ModalComponent"
export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  type: "day",
  key: 0,
  message: "new",
  importance:0,
  urgency:0,
  progress:"todo",
  projectid:null
});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type,setType]=useState("day");
  const [message,setMessage]=useState("new");
  const [key,setKey]=useState(0);
  const [importance,setImportance]=useState(0);
  const [urgency,setUrgency]=useState(0);
  const [projectid,setProjectid]=useState(null);
  const [progress,setProgress]=useState("todo");
  const [tasks, setTasks] = useState()
  const openModal = (theKey,theType,theMessage,theProjectid,theImportance,theUrgency,theProgress,tasks) => {
    setIsModalOpen(true);
    setKey(theKey);
    setType(theType);
    setMessage(theMessage);
    setImportance(theImportance);
    setProgress(theProgress);
    setUrgency(theUrgency);
     setProjectid(theProjectid);
    setTasks(tasks)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contextValue = {
    isModalOpen,
    openModal,
    closeModal,
    type,
    key,
    message,
      importance,
      urgency,
      progress,
      projectid,
    tasks
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {isModalOpen && (
      <div className="modal">
          console.log(theKey)
            <ModalComponent>
            </ModalComponent>

        </div>
     )}
    </ModalContext.Provider>
  );
};

export default ModalContext;