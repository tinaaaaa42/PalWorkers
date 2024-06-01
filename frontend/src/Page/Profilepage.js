import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import React, { useState,useEffect} from 'react';
import UserProfile from "../component/Profile";
import Navbar from "../component/Navv";
import {get_team} from "../service/team";
import {get_kanban_statistics, get_week_statistics} from "../service/profile";
import {get_kanban_task} from "../service/kanban_task";
function Profilepage(){
    const [team, setTeam] = useState([])
    const [week_data, setWeek_data] = useState([])
    const [kanban_data, setKanban_data] = useState([])

    const init_team = async () => {
        let team = await get_team();
        console.log(team)
        setTeam(team);
    }

    const init_gram = async () => {
        let weekly_data = await get_week_statistics();
        let kanban_data = await get_kanban_statistics();
        setWeek_data(weekly_data)
        setKanban_data(kanban_data)
    }

    useEffect( () => {
        init_team();
        init_gram();
    }, []);
    const teamNames=[];
    team.forEach(teamData => {
        const teamName = teamData.team.name;
        teamNames.push(teamName);
    });
    const allteam=['Team4', 'Team5', 'Team6'];
    return (<>
    <div className="container">
        <Navleft></Navleft>
        {/* <Seconddir ></Seconddir> */}
        <Navbar tasks={[]} title={"Profile"} allteam={allteam} teamss={teamNames}></Navbar>
        <div className="mainpart">
        <Header></Header>
        <UserProfile team={team} week_data={week_data} kanban_data={kanban_data}></UserProfile>
        </div>
    </div>
    </>);
}
export default Profilepage