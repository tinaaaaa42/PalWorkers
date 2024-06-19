import ProgressBar from "./Progressbar";
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import { RightSquareOutlined } from "@ant-design/icons";
import { advanceKanbanTask ,deleteTask} from "../service/advance";
function Projectcard({ project ,HandleUpdate}){
    const navigate = useNavigate();
    const HandleFinish=async(event,id)=>{
        event.stopPropagation();
        try{
            const response=await advanceKanbanTask(id);
            HandleUpdate();
        }catch{

        }
    } 
    const handleClick = () => {
        navigate(`/project/${project.id}`);
    };
    const HandleDelete=async(event,id)=>{
        event.stopPropagation();
        try{
            const response=await deleteTask(id);
            HandleUpdate();
        }catch{
        }
      }
    return (<div className="Projectcard" onClick={handleClick}>
        <div class="card">
            <div className="colorbar" style={{backgroundColor:`rgba(0, 64, 255, 0.676)`}}></div>
            <div>
                <div className="title">
                    <div>{project.title}</div>
                    <Button onClick={(event)=>HandleFinish(event,project.id)} icon={<RightSquareOutlined style={{fontSize:'21px',color:'gray'}}/>}style={{position:'absolute',right:'32px',border:'none'}}></Button>
                    <a href=""><div className="delete iconfont icon-lajixiang" style={{position:'absolute',right:'5px'}} onClick={(event) => HandleDelete(event,project.id)}></div></a>
                </div>
                <div className="grouptag ">
                {project.teamProject === true ? `Team: ${project.teamName}` : "Myself"}
                </div>
                <div className="rate"><li>Progress</li><div className="ratenum">{project.done
}/{project.total}</div></div>
                <ProgressBar percentage={(project.done
 / project.total) * 100}></ProgressBar>
                <div className="detail">
                    <div className="Date">
                        {project.date}
                    </div>
                    <div className="comment">
                        <div className="iconfont icon-pinglun"></div>
                        <div className="iconfont icon-lianjie"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
export default Projectcard;