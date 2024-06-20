import React, { createContext, useState } from 'react';
import ProjecttaskComponent from "../component/ProjecttaskComponent"
export const ProjecttaskContext = createContext({
  isProjecttaskOpen: false,
  openProjecttask: () => {},
  closeProjecttask: () => {},
  message: "new",
  refresh:'nwe'
});

export const ProjecttaskProvider = ({ children }) => {
  const [isProjecttaskOpen, setIsProjecttaskOpen] = useState(false);
  const [projectId,setProjectId]=useState(1);
  const [task, setTask] = useState();
  const[refresh,setRefresh]=useState();
  const openProjecttask = (theprojectId,task,therefresh) => {
    setIsProjecttaskOpen(true);
    setProjectId(theprojectId);
    setTask(task);
    setRefresh(therefresh);
  };

  const closeProjecttask = () => {


    setIsProjecttaskOpen(false);
    setRefresh(true);

  };

  const contextValue = {
    isProjecttaskOpen,
    closeProjecttask,
    openProjecttask,
    projectId,
    task,
    refresh
  };

  return (
    <ProjecttaskContext.Provider value={contextValue}>
      {children}
      {isProjecttaskOpen && (
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