import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
import Quadrant from "../component/quadrant";
import React, { useState,useEffect} from 'react';
import {getWeeklyTask, get_weekly_task} from "../service/weekly_task";
import Navbar from "../component/Navv";
function Weekpage(){
    const [allTags, setAllTags] = useState(new Set()); 
    const [allTaskTitles, setAllTaskTitles] = useState([]);
    const [weektasks, setWeek_tasks] = useState([]);
    const [dates, setDates] = useState([new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()]);
    const fetchWeeklyTasks = async (start, end) => {
        const weekly_tasks = await getWeeklyTask(start, end);
        setWeek_tasks(weekly_tasks);
    };
    // const init_tasks = async () => {
    //     let weekly_tasks = await get_weekly_task();
    //     setWeek_tasks(weekly_tasks)
    //     //console.log(weekly_tasks);
    //     // setAllTags(new Set(weekly_tasks.flatMap(task=>task.tags)));
    //     // setAllTaskTitles(weekly_tasks.map(task => task.title));
    // }

    // useEffect( () => {
    //     init_tasks();
    // }, []);
    useEffect(() => {
        const [start, end] = dates;
        // console.log(dates)
        // const handled_start = forma
        fetchWeeklyTasks(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    }, [dates]);
    const handleWeekSearch = (start, end) => {
        setDates([start, end]);
        fetchWeeklyTasks(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    };
    return (<>
    <div className="container">
        <Navleft></Navleft>
        {/* <Seconddir tags={allTags} taskstitle={allTaskTitles}></Seconddir> */}
        <Navbar tasks={weektasks} title={"Week"}></Navbar>
        <div className="mainpart">
        <Header></Header>
        <Control handleWeekSearch={handleWeekSearch}></Control>
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