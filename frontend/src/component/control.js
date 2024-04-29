import { Tag } from "../Data/data";
function Control(){
    return (
        <div className="Control">
            <div className="title">Sort By</div>
            <select id="sortSelect">
                <option value="dateAsc">TimeAsc</option>
                <option value="dateDesc">TimeDesc</option>
            </select>
            <div className="title">Show</div>
            <select id="sortSelect">
                <option value="all">ALL</option>
                {Tag.map(tag=>(<option value={`${tag.name}`} key={tag.name}>{tag.name}</option>))}
            </select>
            <div className="placeholder"></div>
            <button class="rounded-button">New Task</button>
            <button class="rounded-button">New Project</button>
        </div>
    );
}
export default Control;