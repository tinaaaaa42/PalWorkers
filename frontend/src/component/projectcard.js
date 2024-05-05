import ProgressBar from "./Progressbar";
import { useNavigate } from 'react-router-dom';

function Projectcard({ project }){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/project/${project.id}`);
    };
    return (<div className="Projectcard" onClick={handleClick}>
        <a href=""><div class="card">
            <div className="colorbar" style={{color:`blue`}}></div>
            <div>
                <div className="title">
                    <div>{project.title}</div>
                    <a href=""><div className="delete iconfont icon-lajixiang"></div></a>
                </div>
                <div className="grouptag ">
                {project.grouptag === "isgroup" ? `Group${project.groupid}` : "Myself"}
                </div>
                <div className="rate"><li>Progress</li><div className="ratenum">{project.down}/{project.total}</div></div>
                <ProgressBar percentage={(project.down / project.total) * 100}></ProgressBar>
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
        </div></a>
    </div>);
}
export default Projectcard;