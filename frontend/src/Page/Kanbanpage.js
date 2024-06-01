import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
import ModalContext from '../context/ModalContext';
import React, { useContext ,useState,useEffect} from 'react';
import {get_kanban_task} from "../service/kanban_task";
import Navbar from "../component/Navv";
function Kanbanpage(){
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const [kanbantasks, setKanban_tasks] = useState([]);
    const [allTags, setAllTags] = useState(new Set()); 
    const [allTaskTitles, setAllTaskTitles] = useState([]);
    useEffect( () => {
        init_kanban_tasks();
    }, []);
    const init_kanban_tasks = async () => {
        let kanban_tasks = await get_kanban_task();
        console.log(kanban_tasks);
        setKanban_tasks(kanban_tasks);
    }
    const handleClick = () => {
        openModal("kanban","","");
    };
    return (<>
    <div className="container">
        <Navleft></Navleft>
        {/* <Seconddir tags={allTags} taskstitle={allTaskTitles}></Seconddir> */}
        <Navbar tasks={kanbantasks} title={"Kanban"}></Navbar>
        <div className="mainpart">
        <Header></Header>
        <Control taskhandler={handleClick}></Control>
        <Kanban kanban_tasks={kanbantasks}></Kanban>
        </div>
    </div>
    </>);
}
export default Kanbanpage