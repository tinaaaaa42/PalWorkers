import Weekcard from "./weekcard";
import { WeekTasks } from "../Data/data";
function Quadrant({ quadrant }){
    let color = '';
    let content = '';

    if (quadrant === 1) {
        color = 'rgba(255, 0, 0, 0.416)';
        content = '重要且紧急';
    } else if (quadrant === 2) {
        color = ' rgba(0, 157, 255, 0.676)';
        content = '重要但不紧急';
    } else if (quadrant === 3) {
        color = 'rgba(81, 225, 8, 0.767)';
        content = '不重要但紧急';
    } else if (quadrant === 4) {
        color = 'rgba(255, 166, 0, 0.614)';
        content = '不重要且不紧急';
    }
    const tasks = WeekTasks.filter(task => {
    if (quadrant === 1) {
        return task.urgent === 1 && task.important === 1;
    } else if (quadrant === 2) {
        return task.urgent === 0 && task.important === 1;
    } else if (quadrant === 3) {
        return task.urgent === 1 && task.important === 0;
    } else if (quadrant === 4) {
        return task.urgent === 0 && task.important === 0;
    }
    return false;
    });
    
    const colorStyle = {
        backgroundColor: color,
      };
    return (<div className="Quadrant">
        <div className="quadrantcard">
            <div className="colorbar" style={colorStyle}>{content}</div>
            {tasks.map(task => (
            <Weekcard key={task.id} title={task.title} tag={task.tag} />
            ))}
        </div>
    </div>);
}
export default Quadrant;