import DayPicker from "./DayPicker"
import WeekPicker from "./WeekPicker";
import MonthPicker from "./MonthPicker";
import { Tag } from "../Data/data";
import { useLocation } from "react-router-dom";
import {Button, message} from "antd";
import {get_if_authorized} from "../service/project";
function Control({projectId,taskhandler,handleDaySearch,handleWeekSearch,handleKanbanSearch,handleReset,projecthandler}){
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

    const proHandle = async () => {
        const res = await get_if_authorized(projectId);
        if (res) {
            projecthandler();
        }
        else {
            message.error("Sorry!You are not authorized to new task in Team Project.")
            return;
        }
    }
    const renderButton=()=>{
        if(location.pathname.includes('/project'))
        return (<Button type="primary" className="rounded-button projectbutton" onClick={proHandle} style={{marginLeft:'1100px'}}>
            New Task
        </Button>);
        switch (location.pathname) {
            case '/kanban':
                return (<>
                <Button type="primary" className="rounded-button taskbutton" onClick={taskhandler} style={{marginLeft:'400px'}}>
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