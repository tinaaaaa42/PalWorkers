import React, { useState,useContext } from 'react';
import 'font-awesome/css/font-awesome.css';
import { DayTasks} from "../Data/data";
import ModalContext from '../context/ModalContext';
const DayTodoCard = () => {
  const data=DayTasks
   const { openModal ,isModalOpen} = useContext(ModalContext);

  return (
    <div className="Daycardtodo">
      <div className="layout">
        <div className="content">
          <h1 className="title">每日计划</h1>
          <ul className="todo-list">
            {data.map((item, index) => (
              <li key={index} className="todo-item">
                <div className="task-box"  >
                  {item.title}
                  <button className="edit" onClick={()=>openModal(item.key,"day")} >
                  <i className="fa fa-pencil" ></i>
                  </button>
                  <button className="delete-btn" aria-label="删除" onClick={() => console.log('Delete button clicked')}>
                    <i className="fa fa-trash-o"></i>
                  </button>
                  <button className="check">
                     <i className={`fa fa-check-circle ${item.completed ? 'text-success' : ''}`}></i>
                  </button>
                </div>
              </li>
            ))}
            <li className="todo-item" >
              <div className="task-box">
              <button className="new">
                  <li className="fa fa-plus-circle" onClick={()=>openModal(0,"new")} ></li>
              </button>
              </div>
            </li>


          </ul>
        </div>
      </div>
    </div>
  );
};

export default DayTodoCard;