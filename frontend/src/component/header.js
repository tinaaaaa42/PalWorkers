import React, { useState,useEffect } from "react";
import { Modal, Calendar } from 'antd';
import { CurUser } from "../Data/data.js";
import "../iconfont2/iconfont.css";
import { get_username } from "../service/user.js";

function Header() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const [name,setName]=useState("Vincent");
    const [quote, setQuote] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState(`Welcome back, ${name}`);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);  // 控制日历弹窗的状态
    
    const Getname=async()=>{
        const username=await get_username();
        console.log(username);
        setName(username);
        setWelcomeMessage(`Welcome back, ${username}`)
    }
    useEffect(()=>{
        Getname();
    },[])
    const handleQuoteChange = () => {
        const quotes = [
            "All we have is now.",
            "Go big or go home.",
            "Live and learn.",
            "Conquer from within.",
            "The best is yet to come."
        ];
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    const toggleCalendar = () => {
        setIsCalendarVisible(!isCalendarVisible);  // 切换日历的显示状态
    };

    return (
        <div className="Header">
            <div className="welcome">
                {quote ? quote : welcomeMessage}
                <img className="jizhang" onClick={handleQuoteChange} src={process.env.PUBLIC_URL + "/击掌.png"} alt=""></img>
            </div>
            <div className="search logo iconfont icon-sousuo"></div>
            <div className="tixing logo iconfont icon-xiaoxitixing-youtixing1"></div>
            <div className="rili logo iconfont icon-rili" onClick={toggleCalendar}></div>
            <div className="time">{formattedDate}</div>
            <div className="userlogo">
                <img src={process.env.PUBLIC_URL + '/' + CurUser.profilelogo} alt=""></img>
            </div>

            <Modal
                title="选择日期"
                visible={isCalendarVisible}
                onCancel={toggleCalendar}
                onOk={toggleCalendar}
                footer={null}
            >
                <Calendar fullscreen={false} />
            </Modal>
        </div>
    );
}

export default Header;
