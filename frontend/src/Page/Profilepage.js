import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import React, { useState,useEffect} from 'react';
import UserProfile from "../component/Profile";
import Navbar from "../component/Navv";
import {get_team} from "../service/team";
function Profilepage(){
    const [team, setTeam] = useState([])

    const init_team = async () => {
        let team = await get_team();
        console.log(team)
        setTeam(team);
    }

    useEffect( () => {
        init_team();
    }, []);
    const allteam=['Team4', 'Team5', 'Team6'];
    return (<>
    <div className="container">
        <Navleft></Navleft>
        {/* <Seconddir ></Seconddir> */}
        <Navbar tasks={[]} title={"Profile"} allteam={allteam}></Navbar>
        <div className="mainpart">
        <Header></Header>
        <UserProfile></UserProfile>
        </div>
    </div>
    </>);
}
export default Profilepage