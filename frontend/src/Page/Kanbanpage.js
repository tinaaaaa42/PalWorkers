import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
import ModalContext from '../context/ModalContext';
import React, { useContext } from 'react';
function Kanbanpage(){
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const handleClick = () => {
        openModal(0,"kanban","new");
    };
    return (<>
    <div className="container">
        <Navleft></Navleft>
        <Seconddir></Seconddir>
        <div className="mainpart">
        <Header></Header>
        <Control taskhandler={handleClick}></Control>
        <Kanban></Kanban>
        </div>
    </div>
    </>);
}
export default Kanbanpage