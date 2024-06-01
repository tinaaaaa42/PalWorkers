 import Navleft from "../component/navleft";
 import Header from "../component/header";
 import Control from "../component/control";
 import Daytodo from "../component/daytodocard";
 import Dayphoto from "../component/dayphotocard";
 import "../CSS/app.css"
 import Seconddir from "../component/seconddir";
 import {useEffect, useState} from "react";
 import {get_weekly_task} from "../service/weekly_task";
 import {getDailyTask, get_daily_task} from "../service/daily_task";
import Navbar from "../component/Navv";

 function App() {
      const [dailyTasks, setDailyTasks] = useState([])
      const [currentDate, setCurrentDate] = useState(new Date()); 
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
      }, [currentDate]);
      const handleDaySearch=(date)=>{
        console.log(date)
        setCurrentDate(date);
        fetchDailyTasks(date.toISOString().split('T')[0]);
      }
   return (
     <div className="App">
       <div className="container">
         <Navleft></Navleft>
         {/* <Seconddir></Seconddir> */}
         <Navbar tasks={dailyTasks} title={"Day"}></Navbar>
         <div className="mainpart">
         <Header></Header>
         <Control handleDaySearch={handleDaySearch}></Control>
         <div class="two-columns">
         <div><Daytodo tasks={dailyTasks}></Daytodo></div>
           <div> <Dayphoto></Dayphoto> </div>
            </div>
         </div>

       </div>

     </div>
   );
 }

 export default App;