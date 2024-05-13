import React, { createContext, useState } from 'react';
import ModalComponent from "../component/ModalComponent"
export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  type: "day",
  key: 0,
  message: "new"
});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type,setType]=useState("day");
  const [message,setMessage]=useState("new");
  const [key,setKey]=useState(0);
  const openModal = (theKey,theType,theMessage) => {
    setIsModalOpen(true);
    setKey(theKey);
    setType(theType);
    setMessage(theMessage)

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contextValue = {
    isModalOpen,
    openModal,
    closeModal,
    type,
    key

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