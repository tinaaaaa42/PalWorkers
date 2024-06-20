import Projtectdetail from "../component/Projectdetail";
import { useParams } from 'react-router-dom';
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Navleft from "../component/navleft";
import Navbar from "../component/Navv";
import ModalContext from '../context/ModalContext';
import {useEffect, useState ,useContext} from "react";
import {get_project,get_if_teamProject} from "../service/project";
import ProjecttaskContext from '../context/ProjecttaskContext';
function Projectpage(){
    const { openProjecttask ,isProjecttaskOpen} = useContext(ProjecttaskContext);
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const { projectid } = useParams();
    const [update,Setupdate]=useState(0);
        const [teamName,SetteamName]=useState(null);
    const HandleUpdate=()=>{
        Setupdate(update+1);
    }
    const [project, setProject] = useState(null);

    const fetchProject = async() => {
        const tmp_project = await get_project(projectid)
        const tmp_name = await get_if_teamProject(projectid)
        SetteamName(tmp_name)
        setProject(tmp_project)
    }
    useEffect(() => {
        fetchProject()
    }, [update,isProjecttaskOpen,isModalOpen]);
  const handleClick = () => {
        openProjecttask(projectid,"",teamName);

    };
    return (
        project && <>
            <div className="container">
                <Navleft></Navleft>
                <Navbar tasks={[]} title={"project"}></Navbar>
                <div className="mainpart">
                    <Header></Header>
                    <Control projectId={projectid} projecthandler={handleClick}></Control>
                    <Projtectdetail project={project} HandleUpdate={HandleUpdate}></Projtectdetail>
                </div>
            </div>
        </>
    );
}
export default Projectpage