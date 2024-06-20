import React, { createContext, useState } from 'react';
import ProjecttaskComponent from "../component/ProjecttaskComponent"
export const ProjecttaskContext = createContext({
  isModalOpen: false,
  openProjecttask: () => {},
  closeProjecttask: () => {},
  message: "new",
});

export const ProjecttaskProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectId,setProjectId]=useState(1);
  const [task, setTask] = useState();
  const[refresh,setRefresh]=useState(false);
  const openProjecttask = (theprojectId,task) => {
    setIsModalOpen(true);
    setProjectId(theprojectId);
    setTask(task);
  };

  const closeProjecttask = () => {
    window.location.reload();
    setIsModalOpen(false);
    setRefresh(true);

  };

  const contextValue = {
    isModalOpen,
    closeProjecttask,
    openProjecttask,
    projectId,
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