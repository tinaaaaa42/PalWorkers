import Weekcard from "./weekcard";
import { WeekTasks } from "../Data/data";
import ModalContext from '../context/ModalContext';
import {useContext, useEffect, useState} from 'react';
import "../iconfont3/iconfont.css"
import {get_weekly_task} from "../service/weekly_task";
function Quadrant({ quadrant ,Week_tasks,HandleUpdate}){
    let color = '';
    let content = '';
    const { openModal ,isModalOpen} = useContext(ModalContext);
    if (quadrant === 1) {
        color = 'rgba(255, 0, 0, 0.416)';
        content = '重要且紧急';
    } else if (quadrant === 2) {
        color = ' rgba(0, 157, 255, 0.676)';
        content = '重要但不紧急';
    } else if (quadrant === 3) {
        color = 'rgba(81, 225, 8, 0.767)';
        content = '不重要但紧急';
    } else if (quadrant === 4) {
        color = 'rgba(255, 166, 0, 0.614)';
        content = '不重要且不紧急';
    }
    // const [test_tasks, setTest_tasks] = useState([])

    // const init_tasks = async () => {
    //     let weekly_tasks = await get_weekly_task();
    //     setTest_tasks(weekly_tasks)
    // }

    // useEffect( () => {
    //     init_tasks();
    // }, []);

    const tasks = Week_tasks.filter(task => {
    if (quadrant === 1) {
        return task.urgent === true && task.important === true;
    } else if (quadrant === 2) {
        return task.urgent === false && task.important === true;
    } else if (quadrant === 3) {
        return task.urgent === true && task.important === false;
    } else if (quadrant === 4) {
        return task.urgent === false && task.important === false;
    }else 
    return [];
    });

    console.log(tasks)
    
    const colorStyle = {
        backgroundColor: color,
    };
    return (<div className="Quadrant">
        <div className="quadrantcard">
            <div className="colorbar" style={colorStyle}><div>{content}</div><div className="iconfont icon-jiahao" onClick={()=>openModal("week",'',quadrant)}></div></div>
            <div className="week-container">
                {tasks!=null?tasks.map(task => (
                <Weekcard key={task.id} task={task} HandleUpdate={HandleUpdate}/>
                )):<></>}
            </div>
            
        </div>
    </div>);
}
export default Quadrant;