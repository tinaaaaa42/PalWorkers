import DayPicker from "./DatePicker"
import WeekPicker from "./DatePicker"
import { Tag } from "../Data/data";
import { useLocation } from "react-router-dom";
function Control({taskhandler}){
    const location = useLocation();
    const isDayRoute = location.pathname.includes('/day');
    const isWeekRoute = location.pathname.includes('/week');
    return (
        <div className="Control">
            
            {/* <div className="title">Sort By</div>
            <select id="sortSelect">
                <option value="dateAsc">TimeAsc</option>
                <option value="dateDesc">TimeDesc</option>
            </select>
            <div className="title">Show</div>
            <select id="sortSelect">
                <option value="all">ALL</option>
                {Tag.map(tag=>(<option value={`${tag.name}`} key={tag.name}>{tag.name}</option>))}
            </select> */}
            {isDayRoute && <DayPicker />}

            {isWeekRoute && <WeekPicker/>}
            <div className="placeholder"></div>
            <button className="rounded-button taskbutton" onClick={taskhandler}>New Task</button>
            <button className="rounded-button projectbutton">New Project</button>
        </div>
    );
}
export default Control;