import React, { createContext, useState } from 'react';
import ProjectComponent from "../component/ProjectComponent"
export const ProjectContext = createContext({
  isProjectOpen: false,
  openProject: () => {},
  closeProject: () => {},
  type: "new",
});

export const ProjectProvider = ({ children }) => {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [type,setType]=useState("day");
  const openProject = (theType) => {
    setIsProjectOpen(true);
    setType(theType);
console.log("open project")
  };

  const closeProject = () => {
    setIsProjectOpen(false);
  };

  const contextValue = {
    isProjectOpen,
    openProject,
    closeProject,
    type
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
      {isProjectOpen && (
      <div className="modal">
          console.log(theKey)
            <ProjectComponent>
            </ProjectComponent>

        </div>
     )}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;