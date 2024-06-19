import React, { useState,useContext } from 'react';
import 'font-awesome/css/font-awesome.css';
import { DayTasks} from "../Data/data";
import ModalContext from '../context/ModalContext';
import { CheckCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { completeTask, deleteTask } from '../service/advance';
const DayTodoCard = ({tasks,handleUpdate}) => {
      const data=tasks;
      console.log(data)
      const { openModal ,isModalOpen} = useContext(ModalContext);
      const handleFinish=async(id)=>{
          try{
            const response=await completeTask(id);
            handleUpdate();
          }catch{

          }
      }
      const handleDelete = async (id) => {
        try {
          const response = await deleteTask(id);
          handleUpdate();
        } catch {
      }
            }
      return (
        <div className="Daycardtodo">
          <div className="layout">
            <div className="content">
              <h1 className="title">Daily plan</h1>
              <ul className="todo-list">
                {data && data.length > 0 ? (data.map((item, index) => (
                  <li key={index} className="todo-item">
                    <div className="task-box"  >
                      <div className={`daytitle ${item.completed==false?'':'daydelete'}`}>
                      {item.title}
                      </div>
                      
                      <div className="image">
                      <Button shape="circle" onClick={()=>handleFinish(item.id)} style={{border:'none',marginTop:'5px',marginRight:'11px'}}icon={<CheckCircleOutlined  style={{fontSize:'34px',color:'#b9b6b6'}}/>}/>
                      <button className="edit" onClick={()=>openModal("day",item,'',handleUpdate)} >
                      <i className="fa fa-pencil" ></i>
                      </button>
                      <button className="delete-btn" aria-label="删除" onClick={() => handleDelete(item.id)}>
                        <i className="fa fa-trash-o"></i>
                      </button>
                      <button className="check">
                        {/*<i className={`fa fa-check-circle ${item.completed ? 'text-success' : ''}`}></i>*/}
                      </button>
                      </div>
                    </div>
                  </li>
                ))
                ): (
                            <p>No tasks available.</p>
                          )}

                <li className="todo-item" >
                  <div className="task-box">
                  <button className="new">
                      <li className="fa fa-plus-circle" onClick={()=>openModal("day",'','')} ></li>
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
