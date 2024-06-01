import "../iconfont3/iconfont.css";
import Projectcard from "./projectcard";
import Taskcard from "./taskcard";
import { Tasks, Projects } from "../Data/data";
import { useEffect, useState } from "react";

function Kanban({ kanban_tasks, kanban_project }) {
  //const [kanban_tasks, setKanban_tasks] = useState([])

  // const init_kanban_tasks = async () => {
  //     let kanban_tasks = await get_kanban_task()
  //     setKanban_tasks(kanban_tasks)
  // }

  // useEffect( () => {
  //     init_kanban_tasks();
  // }, []);

  const TodoTasks = kanban_tasks?.filter((task) => task.state === "todo") || [];
  const InprogressTasks =
    kanban_tasks?.filter((task) => task.state === "inprogress") || [];
  const ReviewTasks =
    kanban_tasks?.filter((task) => task.state === "review") || [];
  const DownTasks = kanban_tasks?.filter((task) => task.state === "done") || [];
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
        {TodoTasks != null ? (
          TodoTasks.map((task) => <Taskcard key={task.id} task={task} />)
        ) : (
          <></>
        )}
        {/* {todoProjects.map((project) => (
                <Projectcard key={project.id} project={project} />
            ))} */}
      </div>
      <div className="column">
        <h2>In Progress</h2>
        {InprogressTasks != null ? (
          InprogressTasks.map((task) => <Taskcard task={task} />)
        ) : (
          <></>
        )}
        {/* {InprogressProjects.map((project) => (
                <Projectcard key={project.id} project={project} />
            ))} */}
      </div>
      <div className="column">
        <h2>Review</h2>
        {ReviewTasks != null ? (
          ReviewTasks.map((task) => <Taskcard key={task.id} task={task} />)
        ) : (
          <></>
        )}
      </div>
      <div className="column">
        <h2>Done</h2>
        {DownTasks != null ? (
          DownTasks.map((task) => <Taskcard key={task.id} task={task} />)
        ) : (
          <></>
        )}
        <a href="">
          <div className="card empty">
            <div className="add iconfont icon-jiahao"></div>
          </div>
        </a>
      </div>
    </div>
  );
}
export default Kanban;

