import ModalContext from '../context/ModalContext';
import React, { useState,useContext } from 'react';
import { Projects} from "../Data/data";
import { useLocation, useNavigate } from 'react-router-dom';
function Taskcard(props){
    const { id,title, tags, tag,date ,projectid=null} = props;
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const location = useLocation();
    if(location.pathname.startsWith('/project')){
        return (
            <div className="Taskcard" onClick={()=>openModal(id,"kanban","detail",projectid)}>
                <div class="card" >
                    <div className="colorbar" style={{color:`blue`}}></div>
                    <div>
                        <div className="title">
                            <div>{title}</div>
                            <a href=""><div className="delete iconfont icon-lajixiang"></div></a>
                        </div>
                        <div className='tags'><div>{tag}</div></div>
                        <div className="detail">
                            <div className="Date">
                                {date===null?<></>:date}
                            </div>
                            <div className="comment">
                                <div className="iconfont icon-pinglun"></div>
                                <div className="iconfont icon-lianjie"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }else 
    return (
    <div className="Taskcard" onClick={()=>openModal(id,"kanban","detail",projectid)}>
        <div class="card" >
            <div className="colorbar" style={{color:`blue`}}></div>
            <div>
                <div className="title">
                    <div>{title}</div>
                    <a href=""><div className="delete iconfont icon-lajixiang"></div></a>
                </div>
                <div className="tags">{tags.length === 0 ? (<div></div>) : (tags.map(tag => (<div key={tag}>{tag}</div>)))}</div>
                {/* <div className="tags">{tags.length === 0 ? (<i style={{height:'27px'}}></i>) : (tags.map(tag => (<div key={tag}>{tag}</div>)))}</div> */}
                <div className="detail">
                    <div className="Date">
                        {date===null?<></>:date}
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