import React, { createContext, useState } from 'react';
import ModalComponent from "../component/ModalComponent"
export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  type: "day",
  message: "new",
});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type,setType]=useState("day");
  const [message,setMessage]=useState(1);
  const [task, setTask] = useState();
  const[refresh,setRefresh]=useState(false);
  const openModal = (theType,task,theMessage) => {
    setIsModalOpen(true);
    setType(theType);
    setMessage(theMessage);
    setTask(task);
  };

  const closeModal = () => {
//  window.location.reload();
    setIsModalOpen(false);
    setRefresh(true);

  };

  const contextValue = {
    isModalOpen,
    openModal,
    closeModal,
    type,
    message,
    task,
    refresh
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