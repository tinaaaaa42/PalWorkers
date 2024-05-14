import React, { useState } from 'react';
import ModalContext from '../context/ModalContext';
import {useContext } from 'react';
function Weekcard(props){
    const {id,title,tag}=props;
    const [isDel, setIsDel] = useState(false);
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const handleClick = (event) => {
        event.stopPropagation(); 
        let myseitch=1-isDel;
        setIsDel(myseitch);
      };
    return (<div className="Weekcard card" onClick={()=>openModal(id,"week","detail")}>
        <div className="colorandcontent">
            <div className="colorbar" style={{color:`blue`}}></div>
            <div className={`detail ${isDel ? 'Isdelete' : ''}`}>
                <div className="line">
                    <div className="title">{title}</div>
                    <div className="delete iconfont icon-lajixiang" onClick={handleClick}></div>
                </div>
                <div className="tag">{tag}</div>
            </div>
        </div>
        
        
    </div>);
}
export default Weekcard;