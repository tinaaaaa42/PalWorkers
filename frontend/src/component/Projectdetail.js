import "../iconfont3/iconfont.css"
import Taskcard from "./taskcard";
import {Projects} from "../Data/data";
function Projtectdetail(props){
    const {id}=props;
    const projectid=+id;
    const project = Projects.find((project) => project.id === projectid);
    const Tasks=project.Tasks;
    const TodoTasks = Tasks.filter(task => task.state === "todo"); 
    const InprogressTasks=Tasks.filter(task => task.state === "inprogress");
    const ReviewTasks=Tasks.filter(task => task.state === "review");
    const DownTasks=Tasks.filter(task => task.state === "down");
    return (
    <div className="Projectdetail">
        <div class="column">
            <h2>To Do</h2>
            {TodoTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tag={task.tag} date={task.date} />
            ))}
        </div>
        <div class="column">
            <h2>In Progress</h2>
            {InprogressTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tag={task.tag} date={task.date} />
            ))}
        </div>
            <div class="column">
            <h2>Review</h2>
            {ReviewTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tag={task.tag} date={task.date} />
            ))}
        </div>
        <div class="column">
            <h2>Done</h2>
            {DownTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tag={task.tag} date={task.date} />
            ))}
            <a href=""><div class="card empty"><div className="add iconfont icon-jiahao"></div></div></a>
        </div>
    </div>);
}
export default Projtectdetail;