import DayPicker from "./DatePicker";
import { Tag } from "../Data/data";
function Control({taskhandler}){
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
            <DayPicker></DayPicker>
            <div className="placeholder"></div>
            <button className="rounded-button taskbutton" onClick={taskhandler}>New Task</button>
            <button className="rounded-button projectbutton">New Project</button>
        </div>
    );
}
export default Control;