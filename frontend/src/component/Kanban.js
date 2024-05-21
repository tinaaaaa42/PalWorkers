import "../iconfont3/iconfont.css"
import Projectcard from "./projectcard";
import Taskcard from "./taskcard";
import { Tasks ,Projects} from "../Data/data";
import {useEffect, useState} from "react";

function Kanban({kanban_tasks,kanban_project}){
    //const [kanban_tasks, setKanban_tasks] = useState([])

    // const init_kanban_tasks = async () => {
    //     let kanban_tasks = await get_kanban_task()
    //     setKanban_tasks(kanban_tasks)
    // }

    // useEffect( () => {
    //     init_kanban_tasks();
    // }, []);

    const TodoTasks = kanban_tasks.filter(task => task.state === "todo");
    console.log(TodoTasks);
    // const InprogressTasks=kanban_tasks.filter(task => task.state === "inprogress");
    // const ReviewTasks=kanban_tasks.filter(task => task.state === "review");
    // const DownTasks=kanban_tasks.filter(task => task.state === "down");
    // const todoProjects = Projects.filter((project) => project.state === "todo");
    // const InprogressProjects = Projects.filter((project) => project.state === "inprogress");
    return (
    <div className="Kanban">
        <div className="column">
            <h2>To Do</h2>
            {TodoTasks.map((task) => (
                // <div>{task.task.title}</div>
                <Taskcard key={task.task.id} title={task.task.title} tags={task.task.taskTags} date={task.task.dueDate} id={task.task.id} task={task.task}/>
            ))}
            {/* {todoProjects.map((project) => (
                <Projectcard key={project.id} project={project} />
            ))} */}
        </div>
        {/* <div className="column">
            <h2>In Progress</h2>
            {InprogressTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tags={task.tags} date={task.dueDate} id={task.id}/>
            ))}
            {InprogressProjects.map((project) => (
                <Projectcard key={project.id} project={project} />
            ))}
        </div>
            <div className="column">
            <h2>Review</h2>
            {ReviewTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tags={task.tags} date={task.dueDate} id={task.id}/>
            ))}
        </div>
        <div className="column">
            <h2>Done</h2>
            {DownTasks.map((task) => (
                <Taskcard key={task.id} title={task.title} tags={task.tags} date={task.dueDate} id={task.id}/>
            ))}
            <a href=""><div className="card empty"><div className="add iconfont icon-jiahao"></div></div></a>
        </div> */}
    </div>);
}
export default Kanban;