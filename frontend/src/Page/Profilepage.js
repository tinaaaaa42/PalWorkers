import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import React, { useState,useEffect} from 'react';
import UserProfile from "../component/Profile";
import Navbar from "../component/Navv";
import {get_all_team, get_team} from "../service/team";
import {get_kanban_statistics, get_week_statistics} from "../service/profile";
import {get_kanban_task} from "../service/kanban_task";
import { get_notify } from "../service/notify";
function Profilepage(){
    const [team, setTeam] = useState([])
    const [week_data, setWeek_data] = useState([])
    const [kanban_data, setKanban_data] = useState([])
    const [remind_task,setRemind_task] =useState([])
    const [update,setupdate]=useState(0);
    const handleUpdate=()=>{
        setupdate(update+1);
    }
    const init_team = async () => {
        let team = await get_all_team();
        console.log(team)
        setTeam(team);
    }

    const init_gram = async () => {
        let weekly_data = await get_week_statistics();
        let kanban_data = await get_kanban_statistics();
        setWeek_data(weekly_data)
        setKanban_data(kanban_data)
    }
    const getRemind = async () =>{
        let remindtask= await get_notify();
        console.log(remindtask)
        setRemind_task(remindtask);
    }
    useEffect( () => {
        init_team();
        init_gram();
        getRemind();
    }, [update]);
    const teamNames=[];
    team.forEach(teamData => {
        const teamName = teamData.team.name;
        teamNames.push(teamName);
    });
    const allteam=['Team4', 'Team5', 'Team6'];
    console.log(remind_task)
    return (<>
    <div className="container">
        <Navleft></Navleft>
        {/* <Seconddir ></Seconddir> */}
        <Navbar tasks={[]} title={"Profile"} allteam={allteam} teamss={teamNames}></Navbar>
        <div className="mainpart">
        <Header></Header>
        <UserProfile team={team} week_data={week_data} kanban_data={kanban_data} remindtask={remind_task} handleUpdate={handleUpdate}></UserProfile>
        </div>
    </div>
    </>);
}
export default Profilepage