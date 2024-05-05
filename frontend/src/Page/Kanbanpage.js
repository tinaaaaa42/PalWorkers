import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
function Kanbanpage(){
    return (<>
    <div className="container">
        <Navleft></Navleft>
        <Seconddir></Seconddir>
        <div className="mainpart">
        <Header></Header>
        <Control></Control>
        <Kanban></Kanban>
        </div>
    </div>
    </>);
}
export default Kanbanpage