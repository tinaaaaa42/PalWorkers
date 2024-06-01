import DayPicker from "./DayPicker"
import WeekPicker from "./WeekPicker";
import { Tag } from "../Data/data";
import { useLocation } from "react-router-dom";
function Control({taskhandler}){
    return (
        <div className="Control">
            <WeekPicker></WeekPicker>
            <div className="placeholder"></div>
            <button className="rounded-button taskbutton" onClick={taskhandler}>New Task</button>
            <button className="rounded-button projectbutton">New Project</button>
        </div>
    );
}
export default Control;