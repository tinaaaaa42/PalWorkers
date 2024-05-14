import "../iconfont3/iconfont.css"
import Projectcard from "./projectcard";
import Taskcard from "./taskcard";
import { Tasks ,Projects} from "../Data/data";
function Kanban(){
    const TodoTasks = Tasks.filter(task => task.state === "todo"); 
    const InprogressTasks=Tasks.filter(task => task.state === "inprogress");
    const ReviewTasks=Tasks.filter(task => task.state === "review");
    const DownTasks=Tasks.filter(task => task.state === "down");
    const todoProjects = Projects.filter((project) => project.state === "todo");
    const InprogressProjects = Projects.filter((project) => project.state === "inprogress");
    return (
    <div className="Kanban">
        <div class="column">
            <h2>To Do</h2>
            {TodoTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tag={task.tag} date={task.date} id={task.id}/>
            ))}
            {todoProjects.map((project) => (
                <Projectcard key={project.id} project={project} />
            ))}
        </div>
        <div class="column">
            <h2>In Progress</h2>
            {InprogressTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tag={task.tag} date={task.date} id={task.id}/>
            ))}
            {InprogressProjects.map((project) => (
                <Projectcard key={project.id} project={project} />
            ))}
        </div>
            <div class="column">
            <h2>Review</h2>
            {ReviewTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tag={task.tag} date={task.date} id={task.id}/>
            ))}
        </div>
        <div class="column">
            <h2>Done</h2>
            {DownTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tag={task.tag} date={task.date} id={task.id}/>
            ))}
            <a href=""><div class="card empty"><div className="add iconfont icon-jiahao"></div></div></a>
        </div>
    </div>);
}
export default Kanban;