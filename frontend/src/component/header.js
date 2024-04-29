import {CurUser} from "../Data/data.js"
import "../iconfont2/iconfont.css"
function Header(){
    const today = new Date();
    
    // 获取年、月、日
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 注意月份是从 0 开始计数的，所以要加 1
    const day = today.getDate();

    // 将日期格式化为字符串
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return (
        <div className="Header">
            <div className="welcome">Welcome back,{CurUser.username}</div>
            <div className="jizhang logo iconfont icon-jizhang"></div>
            <div className="search logo iconfont icon-sousuo"></div>
            <div className="tixing logo iconfont icon-xiaoxitixing-youtixing1"></div>
            <div className="rili logo iconfont icon-rili"></div>
            <div className="time">{formattedDate}</div>
            <div className="userlogo"><img src={process.env.PUBLIC_URL + CurUser.profilelogo}  alt="" ></img></div>
        </div>
    );
}
export default Header;