import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import React, { useState,useEffect} from 'react';
import UserProfile from "../component/Profile";
import Navbar from "../component/Navv";
function Profilepage(){
    return (<>
    <div className="container">
        <Navleft></Navleft>
        {/* <Seconddir ></Seconddir> */}
        <Navbar></Navbar>
        <div className="mainpart">
        <Header></Header>
        <UserProfile></UserProfile>
        </div>
    </div>
    </>);
}
export default Profilepage