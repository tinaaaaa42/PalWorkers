import React, { useContext,useState } from 'react';
import ModalContext from '../context/ModalContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DayTasks,Tasks,WeekTasks,Projects} from "../Data/data";
import {createWeeklyTask} from "../service/weekly_write"
import {createDailyTask} from "../service/daily_write"
import {createKanbanTask} from "../service/kanbantask_write"
const ModalComponent = () => {
  const { isModalOpen, closeModal ,type,message,task} = useContext(ModalContext);



  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const [state, setState] = React.useState({
      taskName: '',
      description: '',
      type:type,
      startTime: new Date(),
      dueTime: new Date(),
      tag:[],
      assigneeOptions:['User1','User2'],
      notes: '',
      files: [],
      note:[],
      choosepro:'todo',
      team:'',
      teamTasksAnticipaters:[],
      teamTasksLeaders:[],
      important:true,
      urgent:false
    });
//传回日期格式
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
        }

        const convertWeeklyStateToBackendFormat = () => {
//        const tags = state.tag.length===[] ? [] : [state.tag];
            // 构造新的 JSON 对象
            const backendData = {

              id:task.id||null,
                title: state.taskName,
                description: state.description,
                createDate: formatDate(state.startTime),
                dueDate: formatDate(state.dueTime),
                type: state.type,
                tags: [],
              important: state.important,
              urgent: state.urgent,
              expired:false
            };
            return backendData;
          };
           const convertDailyStateToBackendFormat = () => {

                       const backendData = {

                        id:task.id||null,
                          title: state.taskName,
                          description: state.description,
                          createDate: '',
                          dueDate: '',
                          type: state.type,
                          tags: [],
                          expired:false
                        };
                        console.log(backendData.id)
                        if(task.id){
                        backendData.createDate=task.createDate;
                        backendData.dueDate=task.dueDate;
                        }
                        else{
                        backendData.createDate=formatDate(state.startTime);
                         backendData.dueDate=formatDate(state.dueTime);
                        }
                        console.log(backendData)
                      return backendData;
                    };
           const convertKanbanStateToBackendFormat = () => {

                       const backendData = {

                                     id:task.id||null,
                                       title: state.taskName,
                                       description: state.description,
                                       createDate: formatDate(state.startTime),
                                       dueDate: formatDate(state.dueTime),
                                       type: state.type,
                                       tags: [],
                                     state:state.choosepro
                                   };
                      return backendData;
                    };
//           const convertWeeklyStateToBackendFormat = () => {
//                       const backendData = {
//
//                        id:task.id||null,
//                          title: state.taskName,
//                          description: state.description,
//                          createDate: formatDate(state.startTime),
//                          dueDate: formatDate(state.dueTime),
//                          type: state.type,
//                          tags: [],
//                        };
//                      return backendData;
//                    };



                const handleSave = async (e) => {

                    let response;
                      e.preventDefault();
                    try {console.error('创建任务:', true);
                    console.log(type)
                    switch(type){
                    case "day":
                      response = await createDailyTask(convertDailyStateToBackendFormat());break;
                     case "week":
                       response = await createWeeklyTask(convertWeeklyStateToBackendFormat());break;
                      case "kanban":
                        response = await createKanbanTask(convertKanbanStateToBackendFormat());break;
                        }
                    }
                    catch (error) {
                      console.error('创建任务失败:', error);
                    }
                         closeModal();

                  };




       const handleInputChange = (event) => {
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;

          setState({
            ...state,
            [name]: value
          });
        };
        const handleInputtagChange = (event) => {
                  const target = event.target;
                  const value = target.type === 'checkbox' ? target.checked : target.value;


                  setState({
                    ...state,
                    tag: value
                  });
                };

  const handledueDateChange = (date) => {
    setState({
      ...state,
      dueTime: date
    });
  };
   const handlestartDateChange = (date) => {
      setState({
        ...state,
        startTime: date
      });
    };

  const handleLabelChange = (event) => {
    setState({
      ...state,
      label: event.target.value
    });
  };

  const handleAssigneeChange = (event) => {
    setState({
      ...state,
      assignee: event.target.value
    });
  };
  const handleProChange = (event) => {
      setState({
        ...state,
        choosepro: event.target.value
      });
    };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setState({
        ...state,
        image: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleNotesChange = (value) => {
    setState({
      ...state,
      notes: value
    });
  };

  const handleFileChange = (event) => {
    setState({
      ...state,
      files: event.target.files
    });
  };
//  React.useEffect(() => {
//      console.log(type);
//    });
React.useEffect(() => {
          if(message==1)
             setState(prevState => ({
               ...prevState,
               important: true,
               urgent:true
             }));
          if(message==2)
             setState(prevState => ({
               ...prevState,
               important: true,
               urgent:false
             }));
          if(message==3)
             setState(prevState => ({
               ...prevState,
               important: false,
               urgent:true
             }));
          if(message==4)
             setState(prevState => ({
               ...prevState,
               important: false,
               urgent:false
             }));
    switch(type){

      case "day":{

      if(!task) {
             setState(prevState => ({
               ...prevState,
               type:"daily",
               taskName: '',
             }));
             break;
             }


        setState(prevState => ({
          ...prevState,
          choosepro:task.state,
          taskName: task.title||'',
          tag:task.taskTags && task.taskTags.length > 0 ? task.taskTags[0].tag.name : '',
          startTime:task.createDate||'',
          dueTime: task.dueDate || '',
          description:task.description,
          type:"daily"
        }));
        if(task.team!=null){
        setState(prevState => ({
              ...prevState,
              team: task.team.name,
              teamTasksAnticipaters:task.teamTasksAnticipaters,
              teamTasksLeaders:task.teamTasksLeaders


           }));}
      break;
      }
      case "week":{
       if(!task) {
                   setState(prevState => ({
                     ...prevState,
                     taskName: '',
                     type:"weekly"
                     }));
                   break;
                   }


              setState(prevState => ({
                ...prevState,
                type:"weekly",
                choosepro:task.state,
                taskName: task.title||'',
                tag:task.taskTags && task.taskTags.length > 0 ? task.taskTags[0].tag.name : '',
                startTime:task.createDate||'',
                dueTime: task.dueDate || '',
                description:task.description
              }));
              if(task.team!=null){
              setState(prevState => ({
                    ...prevState,
                    team: task.team.name,
                    teamTasksAnticipaters:task.teamTasksAnticipaters,
                    teamTasksLeaders:task.teamTasksLeaders


                 }));}
            break;
            }
      case "kanban":{
            if(!task) {
             setState(prevState => ({
               ...prevState,
               type:"kanban",
               taskName: '',
             }));
             break;
             }


        setState(prevState => ({
          ...prevState,
          type:"kanban",
          choosepro:task.state,
          taskName: task.title||'',
          tag:task.taskTags && task.taskTags.length > 0 ? task.taskTags[0].tag.name : '',
          startTime:task.createDate||'',
          dueTime: task.dueDate || '',
          description:task.description
        }));
//        if(task.team!=null){
//        setState(prevState => ({
//              ...prevState,
//              team: task.team.name,
//              teamTasksAnticipaters:task.teamTasksAnticipaters,
//              teamTasksLeaders:task.teamTasksLeaders
//
//
//           }));}
      break;
      }
//           let task;
//          if(projectid){
//          const project=Projects.find(project=>project.id==projectid)
//           task=project?.Tasks.find(task=>task.id===key)||null
//          }
//         else {task = Tasks.find(task => task.id === key)||null;}
//            if (task) {
//             console.log("task")
//              setState(prevState => ({
//                ...prevState,
//                taskName: task.title,
//                tag:task.tag,
//                 dueTime:task.date
//
//              }));
//              if(task.note!=null){
//              setState(prevState => ({
//                    ...prevState,
//                    note: task.note,
//
//                 }));}
//            }break;
//            }
    }
  },[])
 const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 创建一个Object URL，用于在编辑器中引用文件
      const fileUrl = URL.createObjectURL(file);

      // 插入链接到编辑器
      const quill = ReactQuill.getEditor();
      if (quill) {
        quill.focus();
        quill.format('link', fileUrl); // 设置当前选中内容的链接格式
        quill.insertText(`\n`); // 在链接后添加换行符，防止链接与其他文本合并
      }
    }
  };
  return (

    <div className="modal-container">
      {isModalOpen && (

          <div className="modal-content">
            {/* 表单内容 */}
            <div className="Modal">
              <div className="container">
                <div className="form-container">
                  <div className="label">
                    <input
                        type="text"
                        name="taskName"
                        value={state.taskName}
                        onChange={handleInputChange} className="title"/>
                     <i className="fa fa-pencil"></i>
                  </div>
                  <div className="column Destitle">
                    Description:
                    <textarea 
                      name="description"
                      value={state.description}
                      onChange={handleInputChange}
                      placeholder="description..."
                      rows="4"
                      cols="50"
                      className="modal-rounded-textarea description"
                    />
                  </div>
                  <div className="column">
                      Add File:
                      <input className='logfile'
                        type="file"
                        onChange={handleFileChange}
                        multiple
                      />
                      <ul>
                        {Array.from(state.files).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                  </div>
                  <div className="label">
                  <img className='pic' src={process.env.PUBLIC_URL + "/标签.png"}  alt="" ></img>
                    Tag:
                    <input className='taginfo'
                        type="text"
                        name="taskName"
                        value={state.tag}
                        onChange={handleInputtagChange}/>
                  </div>
                  <div className="label">
                  <img className='pic' src={process.env.PUBLIC_URL + "/标签.png"}  alt="" ></img>
                    Team:
                    <input className='taginfo'
                        type="text"
                        name="taskName"
                        value={state.team}
                        onChange={handleInputtagChange}/>
                  </div>
                  <div className="label">
                  <img className='pic' src={process.env.PUBLIC_URL + "/用户.png"}  alt="" ></img>
                    <label className='Userlabel'>
                      <div className='asstitle'>Assignee: </div>
                      <select name=" assigneeOptions" className='Progressselect'  value={state.assignee} onChange={handleAssigneeChange}>
                          {state.assigneeOptions.map((option) => (
                             <option key={option} value={option}>{option}</option>
                            ))}
                      </select>
                    </label>
                  </div>

                  <div className="label">
                    <label>
                    <img className='pic' src={process.env.PUBLIC_URL + "/进度.png"}  alt="" ></img>
                      progress:
                      <select name="assignee" className='Progressselect'  value={state.choosepro} onChange={handleProChange}>
                            <option value="todo">Todo</option>
                            <option value="inprogress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                      </select>
                    </label>
                  </div>

                  <div className="label datelabel">
                  <img className='pic' src={process.env.PUBLIC_URL + "/日历-内容页.png"}  alt="" ></img>
                        <div className='Due'>Start:</div>
                        <div>
                        <DatePicker className='Date'
                          selected={state.startTime}
                          onChange={handlestartDateChange}
                           dateFormat="yyyy-MM-dd"
                            style={{
                             borderRadius: '10px'
                              }}
                        />
                        </div>
                  </div>
                  <div className="label datelabel">
                  <img className='pic' src={process.env.PUBLIC_URL + "/日历-内容页.png"}  alt="" ></img>
                      <div className='Due'>Due:</div>
                      <div>
                      <DatePicker className='Date'
                        selected={state.dueTime}
                        onChange={handledueDateChange}
                        dateFormat="yyyy-MM-dd"
                        style={{
                            borderRadius: '10px'
                          }}
                      />
                      </div>
                  </div>
                  <div className="label">
                    <button className="detail save" onClick={handleSave}>Save</button>
                    <button className="detail cancle" onClick={closeModal}>Cancel</button>
                  </div>
                  </div>




                <div className="notes-container" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: '0.8' }}>
                {(type!=="new"&&state.note!=='')&&(
                    <div className="Compile-card" >
                       <div className="compile-title"> Compile</div>
                       <div >{state.note}</div>
                       <div className="compile-time"> 5.1</div>
                        </div>
                       ) }
                       </div>

                 <div className="label" style={{ flex: '1', marginTop: '10px' }}>
                       <label>
                         Notes:
                         <ReactQuill
                           value={state.notes}//yhis
                           onChange={handleNotesChange}

                           placeholder="Enter your notes here..."
                         />
                       </label>
                     </div>

                </div>
              </div>
            </div>
            {/* ... 表单内容 */}
          </div>

      )}
    </div>
  );
};

export default ModalComponent;
