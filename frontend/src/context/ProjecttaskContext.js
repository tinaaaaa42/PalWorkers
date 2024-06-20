import React, { createContext, useState } from 'react';
import ProjecttaskComponent from "../component/ProjecttaskComponent"
export const ProjecttaskContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  message: "new",
});

export const ProjecttaskProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message,setMessage]=useState(1);
  const [task, setTask] = useState();
  const[refresh,setRefresh]=useState(false);
  const openModal = (theType,task,theMessage) => {
    setIsModalOpen(true);
    setMessage(theMessage);
    setTask(task);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRefresh(true);
window.location.reload();
  };

  const contextValue = {
    isModalOpen,
    openModal,
    closeModal,
    message,
    task,
    refresh
  };

  return (
    <ProjecttaskContext.Provider value={contextValue}>
      {children}
      {isModalOpen && (
      <div className="modal">
          console.log(theKey)
            <ProjecttaskComponent>
            </ProjecttaskComponent>

        </div>
     )}
    </ProjecttaskContext.Provider>
  );
};

export default ProjecttaskContext;