import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
import ModalContext from '../context/ModalContext';
import React, { useContext ,useState,useEffect} from 'react';
import {get_kanban_task} from "../service/kanban_task";
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
        // setAllTags(new Set(kanban_tasks.flatMap(task => task.tags)));
        // setAllTaskTitles(kanban_tasks.map(task => task.title));
        //console.log(allTags);
    }
    const handleClick = () => {
        openModal(0,"kanban","new");
    };
    return (<>
    <div className="container">
        <Navleft></Navleft>
        <Seconddir tags={allTags} taskstitle={allTaskTitles}></Seconddir>
        <div className="mainpart">
        <Header></Header>
        <Control taskhandler={handleClick}></Control>
        <Kanban kanban_tasks={kanbantasks}></Kanban>
        </div>
    </div>
    </>);
}
export default Kanbanpage