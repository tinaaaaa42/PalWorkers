import DayPicker from "./DayPicker"
import WeekPicker from "./WeekPicker";
import MonthPicker from "./MonthPicker";
import { Tag } from "../Data/data";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
function Control({taskhandler}){
    const location = useLocation();
    const renderPicker = () => {
        switch (location.pathname) {
        case '/day':
            return <DayPicker />;
        case '/week':
            return <WeekPicker />;
        case '/kanban':
            return <MonthPicker />;
        default:
            return null; // 你可以在这里设置一个默认的 Picker 组件
        }
    };
    const renderButton=()=>{
        switch (location.pathname) {
            case '/kanban':
                return (<>
                <Button type="primary" className="rounded-button taskbutton" onClick={taskhandler} style={{marginLeft:'250px'}}>
                    New Task
                </Button>
                <Button type="primary" className="rounded-button projectbutton">
                    New Project
                </Button></>);
            default:
                return null; // 你可以在这里设置一个默认的 Picker 组件
            }
    }
    return (
        <div className="Control">
            {renderPicker()}
            {renderButton()}
        </div>
    );
}
export default Control;