import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
import Quadrant from "../component/quadrant";
import React, { useState,useEffect} from 'react';
import {get_weekly_task} from "../service/weekly_task";
import Navbar from "../component/Navv";
function Weekpage(){
    const [allTags, setAllTags] = useState(new Set()); 
    const [allTaskTitles, setAllTaskTitles] = useState([]);
    const [weektasks, setWeek_tasks] = useState([]);
    const init_tasks = async () => {
        let weekly_tasks = await get_weekly_task();
        setWeek_tasks(weekly_tasks)
        //console.log(weekly_tasks);
        // setAllTags(new Set(weekly_tasks.flatMap(task=>task.tags)));
        // setAllTaskTitles(weekly_tasks.map(task => task.title));
    }

    useEffect( () => {
        init_tasks();
    }, []);
    return (<>
    <div className="container">
        <Navleft></Navleft>
        {/* <Seconddir tags={allTags} taskstitle={allTaskTitles}></Seconddir> */}
        <Navbar tasks={weektasks} title={"Week"}></Navbar>
        <div className="mainpart">
        <Header></Header>
        <Control></Control>
        <div className="firstline">
            <Quadrant quadrant={1} Week_tasks={weektasks}></Quadrant>
            <Quadrant quadrant={2} Week_tasks={weektasks}></Quadrant>
        </div>
        <div className="secondline">
            <Quadrant quadrant={3} Week_tasks={weektasks}></Quadrant>
            <Quadrant quadrant={4} Week_tasks={weektasks}></Quadrant>
        </div>
        </div>
    </div>
    </>);
}
export default Weekpage