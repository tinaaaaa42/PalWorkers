import Projtectdetail from "../component/Projectdetail";
import { useParams } from 'react-router-dom';
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Navleft from "../component/navleft";
import Navbar from "../component/Navv";
import {useEffect, useState} from "react";
import {get_project} from "../service/project";
function Projectpage(){
    const { projectid } = useParams();

    const [project, setProject] = useState(null);

    const fetchProject = async() => {
        const tmp_project = await get_project(projectid)
        setProject(tmp_project)
    }
    useEffect(() => {
        fetchProject()
    }, []);

    return (
        project && <>
            <div className="container">
                <Navleft></Navleft>
                <Navbar tasks={[]} title={"project"}></Navbar>
                <div className="mainpart">
                    <Header></Header>
                    <Control></Control>
                    <Projtectdetail project={project}></Projtectdetail>
                </div>
            </div>
        </>
    );
}
export default Projectpage