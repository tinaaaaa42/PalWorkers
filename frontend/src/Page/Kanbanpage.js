import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
import ModalContext from '../context/ModalContext';
import React, { useContext ,useState,useEffect} from 'react';
import {getKanbanTask, get_kanban_task} from "../service/kanban_task";
import Navbar from "../component/Navv";
function Kanbanpage(){
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const [kanbantasks, setKanban_tasks] = useState([]);
    const [allTags, setAllTags] = useState(new Set()); 
    const [allTaskTitles, setAllTaskTitles] = useState([]);
    // useEffect( () => {
    //     init_kanban_tasks();
    // }, []);
    // const init_kanban_tasks = async () => {
    //     let kanban_tasks = await get_kanban_task();
    //     console.log(kanban_tasks);
    //     setKanban_tasks(kanban_tasks);
    // }
    const [dates, setDates] = useState([new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()]);
    const fetchKanbanTasks = async (start, end) => {
        const Kanban_tasks = await getKanbanTask(start,end);
        setKanban_tasks(Kanban_tasks);
    };
    useEffect(() => {
        const [start, end] = dates;
        fetchKanbanTasks(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    }, [dates]);
    const handleKanbanSearch = (start, end) => {
        setDates([start, end]);
        fetchKanbanTasks(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    };
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
        <Control taskhandler={handleClick} handleKanbanSearch={handleKanbanSearch}></Control>
        <Kanban kanban_tasks={kanbantasks}></Kanban>
        </div>
    </div>
    </>);
}
export default Kanbanpage