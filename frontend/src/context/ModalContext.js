import React, { createContext, useState } from 'react';
import ModalComponent from "../component/ModalComponent"
export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  type: "day",
  key: 0
});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type,setType]=useState("day");
  const [key,setKey]=useState(0);
  const openModal = (theKey,theType) => {
    setIsModalOpen(true);
    setKey(theKey);
    setType(theType);

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

            <ModalComponent>
            </ModalComponent>

        </div>
     )}
    </ModalContext.Provider>
  );
};

export default ModalContext;