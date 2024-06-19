import DayPicker from "./DayPicker"
import WeekPicker from "./WeekPicker";
import MonthPicker from "./MonthPicker";
import { Tag } from "../Data/data";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
function Control({taskhandler,handleDaySearch,handleWeekSearch,handleKanbanSearch,handleReset,projecthandler}){
    const location = useLocation();
    const renderPicker = () => {
        switch (location.pathname) {
        case '/day':
            return <DayPicker handleDaySearch={handleDaySearch}handleReset={handleReset}/>;
        case '/week':
            return <WeekPicker handleWeekSearch={handleWeekSearch} handleReset={handleReset}/>;
        case '/kanban':
            return <MonthPicker handleKanbanSearch={handleKanbanSearch} handleReset={handleReset}/>;
        default:
            return null; // 你可以在这里设置一个默认的 Picker 组件
        }
    };
    const renderButton=()=>{
        if(location.pathname.includes('/project'))
        return (<Button type="primary" className="rounded-button projectbutton" onClick={projecthandler} style={{marginLeft:'1000px'}}>
            New Task
        </Button>);
        switch (location.pathname) {
            case '/kanban':
                return (<>
                <Button type="primary" className="rounded-button taskbutton" onClick={taskhandler} style={{marginLeft:'250px'}}>
                    New Task
                </Button>
                <Button type="primary" className="rounded-button projectbutton" onClick={projecthandler}>
                    New Project
                </Button></>); 
            default:
                return null;
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