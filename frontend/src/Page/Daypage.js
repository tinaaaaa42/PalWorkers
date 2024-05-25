import Navleft from "../component/navleft";
import Header from "../component/header";
import Control from "../component/control";
import Daytodo from "../component/daytodocard";
import Dayphoto from "../component/dayphotocard";
import "../CSS/app.css"
import Seconddir from "../component/seconddir";
import {useEffect, useState} from "react";
import {get_weekly_task} from "../service/weekly_task";
import {get_daily_task} from "../service/daily_task";

function App() {
    const [dailyTasks, setDailyTasks] = useState()
    const init_tasks = async () => {
        let dailyTasks = await get_daily_task();
        setDailyTasks(dailyTasks)
        // setAllTags(new Set(weekly_tasks.flatMap(task=>task.tags)));
        // setAllTaskTitles(weekly_tasks.map(task => task.title));
    }

    useEffect( () => {
        init_tasks();
    }, []);
  return (
    <div className="App">
      <div className="container">
        <Navleft></Navleft>
        <Seconddir></Seconddir>
        <div className="mainpart">
        <Header></Header>

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