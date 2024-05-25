import ModalContext from '../context/ModalContext';
import React, { useState,useContext } from 'react';
import { Projects} from "../Data/data";
import { useLocation, useNavigate } from 'react-router-dom';
function Taskcard(props){
    const { id,task} = props;
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const location = useLocation();
    return (
    <div className="Taskcard" onClick={()=>openModal(id,"kanban","detail")}>
        <div class="card" >
            <div className="colorbar" style={{color:`blue`}}></div>
            <div>
                <div className="title">
                    <div>{task.title}</div>
                    <a href=""><div className="delete iconfont icon-lajixiang"></div></a>
                </div>
                <div className='tags'>{task.taskTags.length === 0 ?(<div></div>):task.taskTags.map(tag=>(<div>{tag.tag.name}</div>))}</div>
                <div className="detail">
                    <div className="Date">
                        {task.dueDate === null ?  <></>: task.dueDate} 
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