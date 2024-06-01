import React, { useState } from 'react';
import ModalContext from '../context/ModalContext';
import {useContext } from 'react';
function Weekcard(props){
    const {id,task}=props;
    const [isDel, setIsDel] = useState(false);
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const handleClick = (event) => {
        event.stopPropagation(); 
        let myseitch=1-isDel;
        setIsDel(myseitch);
      };
    return (<div className="Weekcard card" onClick={()=>openModal("week",task,'')}>
        <div className="colorandcontent">
            <div className="colorbar" style={{color:`blue`}}></div>
            <div className={`detail ${isDel ? 'Isdelete' : ''}`}>
                <div className="line">
                    <div className="title">{task.title}</div>
                    <div className="delete iconfont icon-lajixiang" onClick={handleClick}></div>
                </div>
                <div className='team'>{task.team==null?1:task.team.name}</div>
                <div className='tags'>{task.taskTags.map(tag => (<div className="tag">{tag.tag.name}</div>))}</div>
            </div>
        </div>
        
        
    </div>);
}
export default Weekcard;