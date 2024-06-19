import "../iconfont3/iconfont.css"
import Taskcard from "./taskcard";
import {Projects} from "../Data/data";
function Projtectdetail({project}){
    // const {id}=props;
    // const projectid=+id;
    // const project = Projects.find((project) => project.id === projectid);
    // const Tasks=project.Tasks;
    // const TodoTasks = [];
    const TodoTasks = project.projectsTasks.filter((task) => task.state == "todo")
    const updatedTodoTasks = TodoTasks.map((task) => {
        // 创建一个新对象，复制原有的task属性，并添加新的state字段
        return {
            ...task.task,
            state: task.state // 这里可以设置您想要的任何初始状态值
        };
    });

    const InprogressTasks = project.projectsTasks.filter((task) => task.state == "inprogress")
    const updatedInProgressTasks = InprogressTasks.map((task) => {
        // 创建一个新对象，复制原有的task属性，并添加新的state字段
        return {
            ...task.task,
            state: task.state // 这里可以设置您想要的任何初始状态值
        };
    });

    const DoneTasks = project.projectsTasks.filter((task) => task.state == "done")
    const updatedDoneTasks = DoneTasks.map((task) => {
        // 创建一个新对象，复制原有的task属性，并添加新的state字段
        return {
            ...task.task,
            state: task.state // 这里可以设置您想要的任何初始状态值
        };
    });

    const ReviewTasks = project.projectsTasks.filter((task) => task.state == "review")
    const updatedReviewTasks = ReviewTasks.map((task) => {
        // 创建一个新对象，复制原有的task属性，并添加新的state字段
        return {
            ...task.task,
            state: task.state // 这里可以设置您想要的任何初始状态值
        };
    });



    // const TodoTasks = Tasks.filter(task => task.state === "todo"); 
    // const InprogressTasks=Tasks.filter(task => task.state === "inprogress");
    // const ReviewTasks=Tasks.filter(task => task.state === "review");
    // const DownTasks=Tasks.filter(task => task.state === "down");
    return (
    <div className="Projectdetail">
        <div class="column">
            <h2>To Do</h2>
            {updatedTodoTasks.map((task) => (
                <Taskcard key={task.id} task={task}/>
            ))}
        </div>
        <div class="column">
            <h2>In Progress</h2>
             {updatedInProgressTasks.map((task) => (
                <Taskcard key={task.id} task={task}/>
            ))}
        </div>
            <div class="column">
            <h2>Review</h2>
            {updatedReviewTasks.map((task) => (
                <Taskcard key={task.id} task={task}/>
            ))}
        </div>
        <div class="column">
            <h2>Done</h2>
             {updatedDoneTasks.map((task) => (
                <Taskcard key={task.id} task={task}/>
            ))}
            <a href=""><div class="card empty"><div className="add iconfont icon-jiahao"></div></div></a>
        </div>
    </div>);
}
export default Projtectdetail;