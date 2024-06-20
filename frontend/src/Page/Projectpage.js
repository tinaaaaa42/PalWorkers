import Projtectdetail from "../component/Projectdetail";
import { useParams } from 'react-router-dom';
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Navleft from "../component/navleft";
import Navbar from "../component/Navv";
import {useEffect, useState ,useContext} from "react";
import {get_project} from "../service/project";
import ProjecttaskContext from '../context/ProjecttaskContext';
function Projectpage(){
    const { openProjecttask ,isModalOpen} = useContext(ProjecttaskContext);
    const { projectid } = useParams();
    const [update,Setupdate]=useState(0);
    const HandleUpdate=()=>{
        Setupdate(update+1);
    }
    const [project, setProject] = useState(null);

    const fetchProject = async() => {
        const tmp_project = await get_project(projectid)
        setProject(tmp_project)
    }
    useEffect(() => {
        fetchProject()
    }, [update,isModalOpen]);
  const handleClick = () => {
        openProjecttask(projectid,"");

    };
    return (
        project && <>
            <div className="container">
                <Navleft></Navleft>
                <Navbar tasks={[]} title={"project"}></Navbar>
                <div className="mainpart">
                    <Header></Header>
                    <Control projecthandler={handleClick}></Control>
                    <Projtectdetail project={project} HandleUpdate={HandleUpdate}></Projtectdetail>
                </div>
            </div>
        </>
    );
}
export default Projectpage