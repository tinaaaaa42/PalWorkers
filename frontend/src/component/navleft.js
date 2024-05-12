import "../iconfont1/iconfont.css"
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
function Navleft(){
    const location = useLocation();
    const [activeId, setActiveId] = useState(getActiveId(location.pathname));
    function getActiveId(pathname) {
        if (pathname.startsWith('/project')) {
                return '1';
        }
        switch(pathname) {
            case '/':
                return '1';
            case '/week':
                return '3';

            case '/day':
                return '2';

            default:
                return '1'; // 默认激活第一个 id
        }
    }
    const navigate = useNavigate();
    const handleClick = (id, e) => {
        e.preventDefault(); // 阻止默认行为
        switch(id){
            case '1':   navigate('/');
                        break;
            case '2':   navigate('/day');
                         break;

            case '3':   navigate('/week');
                        break;
        }
      };
    return (
    <div className="Navleft">
        <div className="top">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <a href="" id="0"><div className="planlogo logo iconfont icon-lifangtilitiduomiantifangkuai" style={{fontSize:'25px'}}></div></a>
        <a href="" id="1" onClick={(e)=>handleClick("1",e)}><div className={`month ${activeId === '1' ? 'active' : ''} logo iconfont icon-rili`} style={{fontSize:'25px'}}></div></a>
        <a href="" id="2" onClick={(e)=>handleClick("2",e)}><div className={`day ${activeId === '2' ? 'active' : ''} logo iconfont icon-jihua`} style={{fontSize:'25px'}}></div></a>
        <a href="" id="3" onClick={(e)=>handleClick("3",e)}><div className={`week ${activeId === '3' ? 'active' : ''} logo iconfont icon-sixiangxiankanban`} style={{fontSize:'25px'}}></div></a>
        <a href="" id="4" onClick={(e)=>handleClick("4",e)}><div className={`zhongbao ${activeId === '4' ? 'active' : ''} logo iconfont icon-zhuzhuangtu`} style={{fontSize:'25px'}}></div></a>
        <a href="" id="5" onClick={(e)=>handleClick("5",e)}><div className={`profile ${activeId === '5' ? 'active' : ''} logo iconfont icon-geren`} style={{fontSize:'25px'}}></div></a>
        <a href="" id="6" onClick={(e)=>handleClick("6",e)}><div className={`set logo ${activeId === '6' ? 'active' : ''} iconfont icon-yanfaxiangmujiedianshenpiliucheng`} style={{fontSize:'25px'}}></div></a>
        <a href="" id="7"><div className="exit logo iconfont icon-tuichu" style={{fontSize:'25px'}}></div></a>
    </div>);

}
export default Navleft;