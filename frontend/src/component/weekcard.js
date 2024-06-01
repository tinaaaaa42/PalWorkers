import React, { useState } from 'react';
import ModalContext from '../context/ModalContext';
import {useContext } from 'react';
import { Button } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { completeTask } from '../service/advance';
function Weekcard(props){
    const {id,task}=props;
    const [isDel, setIsDel] = useState(false);
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const handleClick = (event) => {
        event.stopPropagation(); 
        let myseitch=1-isDel;
        setIsDel(myseitch);
    };
    const handleFinish=async(event,id)=>{
        event.stopPropagation();
        console.log(id);
        try{
            const response=await completeTask(id);
        }catch{
            
        }
        
    }
    return (<div className="Weekcard card" onClick={()=>openModal("week",task,'')}>
        <div className="colorandcontent">
            <div className="colorbar" style={{color:`blue`}}></div>
            <div className={`detail ${task.completed==true ? 'Isdelete' : ''}`}>
                <div className="line">
                    <div className="title">{task.title.length<=4?task.title:`${task.title.substring(0,4)}...`}</div>
                    <Button onClick={(event) => handleFinish(event, task.id)} icon={<CheckSquareOutlined style={{fontSize:'20px',color:'gray'}}/>}style={{position:'absolute',right:'20px',border:'none'}}></Button>
                    <div className="delete iconfont icon-lajixiang" onClick={handleClick}></div>
                </div>
                <div className='team'>{task.team==null?<></>:task.team.name}</div>
                <div className='tags'>{task.taskTags.map(tag => (<div className="tag">{tag.tag.name}</div>))}</div>
            </div>
        </div>
        
        
    </div>);
}
export default Weekcard;