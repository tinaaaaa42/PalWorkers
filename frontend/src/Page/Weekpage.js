import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
import Quadrant from "../component/quadrant";
function Weekpage(){
    return (<>
    <div className="container">
        <Navleft></Navleft>
        <Seconddir></Seconddir>
        <div className="mainpart">
        <Header></Header>
        <Control></Control>
        <div className="firstline">
            <Quadrant quadrant={1}></Quadrant>
            <Quadrant quadrant={2}></Quadrant>
        </div>
        <div className="secondline">
            <Quadrant quadrant={3}></Quadrant>
            <Quadrant quadrant={4}></Quadrant>
        </div>
        </div>
    </div>
    </>);
}
export default Weekpage