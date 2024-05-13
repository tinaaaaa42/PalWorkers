import ModalContext from '../context/ModalContext';
import React, { useState,useContext } from 'react';
function Taskcard(props){
    const { key,title, tag, date } = props;
    const { openModal ,isModalOpen} = useContext(ModalContext);
    return (<div className="Taskcard" onClick={()=>openModal(key,"kanban","detail")}>
        <div class="card" >
            <div className="colorbar" style={{color:`blue`}}></div>
            <div>
                <div className="title">
                    <div>{title}</div>
                    <a href=""><div className="delete iconfont icon-lajixiang"></div></a>
                </div>
                <div className="tag"><div>{tag}</div></div>
                <div className="detail">
                    <div className="Date">
                        {date}
                    </div>
                    <div className="comment">
                        <div className="iconfont icon-pinglun"></div>
                        <div className="iconfont icon-lianjie"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
export default Taskcard;