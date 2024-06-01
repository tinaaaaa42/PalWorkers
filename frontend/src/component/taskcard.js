import ModalContext from '../context/ModalContext';
import React, { useState,useContext } from 'react';
import { Projects} from "../Data/data";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { RightSquareOutlined } from '@ant-design/icons';
import { advanceKanbanTask } from '../service/advance';
function Taskcard(props){
    const { id,task} = props;
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const location = useLocation();
    const HandleFinish=async(event,id)=>{
        event.stopPropagation();
        try{
            const response=await advanceKanbanTask(id);
        }catch{

        }
    } 
    return (
    <div className="Taskcard" onClick={()=>openModal("kanban",task,'')}>
        <div class="card" >
            <div className="colorbar" style={{color:`blue`}}></div>
            <div>
                <div className="title">
                    <div className='titlename'>{task.title.length<=4?task.title:`${task.title.substring(0,4)}...`}</div>
                    <Button onClick={(event)=>HandleFinish(event,task.id)} icon={<RightSquareOutlined style={{fontSize:'21px',color:'gray'}}/>}style={{position:'absolute',right:'32px',border:'none'}}></Button>
                    <a href=""><div className="delete iconfont icon-lajixiang"></div></a>
                </div>
                <div className='tags'>{task.taskTags.length === 0 ?(<div></div>):task.taskTags.map(tag=>(<div>{tag.tag.name}</div>))}</div>
                <div className='team'>{task.team==null?<></>:task.team.name}</div>
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