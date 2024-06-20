 import Navleft from "../component/navleft";
 import Header from "../component/header";
 import Control from "../component/control";
 import Daytodo from "../component/daytodocard";
 import Dayphoto from "../component/dayphotocard";
 import "../CSS/app.css"
 import ModalContext from '../context/ModalContext';
 import Seconddir from "../component/seconddir";
 import {useEffect, useState,useContext} from "react";
 import {get_weekly_task} from "../service/weekly_task";
 import {getDailyTask, get_daily_task, deleteDailyTaskWithDate} from "../service/daily_task";
import Navbar from "../component/Navv";
import { message } from "antd";

 function App() {
        const { openModal ,isModalOpen} = useContext(ModalContext);
      const [dailyTasks, setDailyTasks] = useState([])
      const [currentDate, setCurrentDate] = useState(new Date()); 
      const [update,Setupdate]=useState(0);
      const fetchDailyTasks = async (date) => {
        if(date==null){
          const dailyTasks = await getDailyTask(currentDate.toISOString().split('T')[0]);
          setDailyTasks(dailyTasks);
        }
        else {
          const dailyTasks = await getDailyTask(date);
          setDailyTasks(dailyTasks);
        }
      };
      // const init_tasks = async () => {
      //     let dailyTasks = await getDailyTask(todayString);
      //     setDailyTasks(dailyTasks)
      // }
      useEffect(() => {
        fetchDailyTasks();
        const handleKeyDown = (event) => {
          if (event.ctrlKey && event.key.toLowerCase() === 'c') {
            event.preventDefault(); 
            message.info('清空每日任务'); 
            deleteDailyTaskWithDate(currentDate.toISOString().split('T')[0]);
            Setupdate(update+1);
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [currentDate,update,isModalOpen]);
      const handleUpdate=()=>{
        Setupdate(update+1);
      }
      const handleDaySearch=(date)=>{
        console.log(date)
        setCurrentDate(date);
        fetchDailyTasks(date.toISOString().split('T')[0]);
      }
      const handleReset=()=>{
        setCurrentDate(new Date);
        fetchDailyTasks((new Date).toISOString().split('T')[0]);
      }
   return (
     <div className="App">
       <div className="container">
         <Navleft></Navleft>
         {/* <Seconddir></Seconddir> */}
         <Navbar tasks={dailyTasks} title={"Day"}></Navbar>
         <div className="mainpart">
         <Header></Header>
         <Control handleDaySearch={handleDaySearch} handleReset={handleReset}></Control>
         <div class="two-columns">
         <div><Daytodo tasks={dailyTasks} handleUpdate={handleUpdate}></Daytodo></div>
           <div> <Dayphoto></Dayphoto> </div>
            </div>
         </div>

       </div>

     </div>
   );
 }

 export default App;
