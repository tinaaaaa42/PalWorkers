import Projtectdetail from "../component/Projectdetail";
import { useParams } from 'react-router-dom';
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Navleft from "../component/navleft";
import Navbar from "../component/Navv";
function Projectpage(){
    const { projectid } = useParams();
    return (<>
    <div className="container">
        <Navleft></Navleft>
        <Navbar tasks={[]} title={"project"}></Navbar>
        <div className="mainpart">
        <Header></Header>
        <Control></Control>
        <Projtectdetail id={projectid}></Projtectdetail>
        </div>
    </div>
    </>);
}
export default Projectpage