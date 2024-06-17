import React, { useContext,useState } from 'react';
import ProjectContext from '../context/ProjectContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';
import TeamSelector from './teamSelector'
const ProjectComponent = () => {
  const { isProjectOpen, closeProject ,type} = useContext(ProjectContext);
    const handleTeamSelection = (selectedTeam) => {
      console.log(`Team selected: ${selectedTeam}`);
      // API
    };
  const [state, setState] = React.useState({
      taskName: '',
      description: '',
      type:type,
      startTime: new Date(),
      dueTime: new Date(),
      assigneeOptions:['User1','User2'],
      tag:'',
      notes: '',
      files: [],
      note:[],
      choosepro:'todo',
      team:'',
      teamTasksAnticipaters:[],
      teamTasksLeaders:[],
      teams:['team1','team2']
    });
    function formatDate(date) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if(regex.test(date))return date;
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
        }
//
//        const convertWeeklyStateToBackendFormat = () => {
//
//            let backendData = {
//
//              task_id:task.id||null,
//                title: state.taskName,
//                description: state.description,
//                createDate: formatDate(state.startTime),
//                dueDate: formatDate(state.dueTime),
//                type: state.type,
//               tags: [state.tag],
//              important: state.important,
//              urgent: state.urgent,
//              expired:false
//            };if(!state.tag)backendData.tags=[];
//
//
//            return backendData;
//          };
//           const convertDailyStateToBackendFormat = () => {
//
//                       const backendData = {
//
//                        task_id:task.id||null,
//                          title: state.taskName,
//                          description: state.description,
//                          createDate:formatDate(state.startTime),
//                          dueDate: formatDate(state.dueTime),
//                          type: state.type,
//                          tags: [state.tag],
//                          expired:false
//                        };
//                        console.log(backendData)
//
//                            if(!state.tag)backendData.tags=[];
//                                return backendData;
//                            };
//           const convertKanbanStateToBackendFormat = () => {
//
//                       let backendData = {
//
//                                     task_id:task.id||null,
//                                       title: state.taskName,
//                                       description: state.description,
//                                       createDate: formatDate(state.startTime),
//                                       dueDate:formatDate(state.dueTime),
//                                       type: state.type,
//                                       tags: [state.tag],
//                                     state:state.choosepro
//                                   };if(!state.tag)backendData.tags=[];
//                      return backendData;
//                    };
//

//                const handleSave = async (e) => {
//
//                    let response;
//                      e.preventDefault();
//                    try {console.error('创建任务:', true);
//                    console.log(type)
//                    if(!task.id){
//                    switch(type){
//                    case "day":
//                      response = await createDailyTask(convertDailyStateToBackendFormat());break;
//                     case "week":
//                       response = await createWeeklyTask(convertWeeklyStateToBackendFormat());break;
//                      case "kanban":
//                        response = await createKanbanTask(convertKanbanStateToBackendFormat());break;
//                        }}
//
//                    else {
//                    switch(type){
//
//                    case "day":
//                      response = await changeDailyTask(convertDailyStateToBackendFormat());break;
//                     case "week":
//                       response = await changeWeeklyTask(convertWeeklyStateToBackendFormat());break;
//                      case "kanban":
//                        response = await changeKanbanTask(convertKanbanStateToBackendFormat());break;
//                        }
//                    }}
//                    catch (error) {
//                      console.error('创建任务失败:', error);
//                    }
//                         closeProject();
//
//                  };




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
const handleTeamChange = (e) => {
    setState({
      ...state,
      team: e.target.value,
    });
  };
  const handleFileChange = (event) => {
    setState({
      ...state,
      files: event.target.files
    });
  };
//React.useEffect(() => {
//          if(message==1)
//             setState(prevState => ({
//               ...prevState,
//               important: true,
//               urgent:true
//             }));
//          if(message==2)
//             setState(prevState => ({
//               ...prevState,
//               important: true,
//               urgent:false
//             }));
//          if(message==3)
//             setState(prevState => ({
//               ...prevState,
//               important: false,
//               urgent:true
//             }));
//          if(message==4)
//             setState(prevState => ({
//               ...prevState,
//               important: false,
//               urgent:false
//             }));
//    switch(type){
//
//      case "day":{
//
//      if(!task) {
//             setState(prevState => ({
//               ...prevState,
//               type:"daily",
//               taskName: '',
//             }));
//             break;
//             }
//
//
//        setState(prevState => ({
//          ...prevState,
//          choosepro:task.state,
//          taskName: task.title||'',
//          tag:task.taskTags && task.taskTags.length > 0 ? task.taskTags[0].tag.name : '',
//          startTime:task.createDate||'',
//          dueTime: task.dueDate || '',
//          description:task.description,
//          type:"daily"
//        }));
//        if(task.team!=null){
//        setState(prevState => ({
//              ...prevState,
//              team: task.team.name,
//              teamTasksAnticipaters:task.teamTasksAnticipaters,
//              teamTasksLeaders:task.teamTasksLeaders
//
//
//           }));}
//      break;
//      }
//      case "week":{
//       if(!task) {
//                   setState(prevState => ({
//                     ...prevState,
//                     taskName: '',
//                     type:"weekly"
//                     }));
//                   break;
//                   }
//
//
//
//              setState(prevState => ({
//                ...prevState,
//                type:"weekly",
//                choosepro:task.state,
//                taskName: task.title||'',
//                tag:task.taskTags && task.taskTags.length > 0 ? task.taskTags[0].tag.name : '',
//                startTime:task.createDate||'',
//                dueTime: task.dueDate || '',
//                description:task.description,
//                urgent:task.urgent,
//                important:task.important
//              }));
//              if(task.team!=null){
//              setState(prevState => ({
//                    ...prevState,
//                    team: task.team.name,
//                    teamTasksAnticipaters:task.teamTasksAnticipaters,
//                    teamTasksLeaders:task.teamTasksLeaders
//
//
//                 }));}
//            break;
//            }
//      case "kanban":{
//            if(!task) {
//             setState(prevState => ({
//               ...prevState,
//               type:"kanban",
//               taskName: '',
//             }));
//             break;
//             }
//
//
//        setState(prevState => ({
//          ...prevState,
//          type:"kanban",
//          choosepro:task.state,
//          taskName: task.title||'',
//          tag:task.taskTags && task.taskTags.length > 0 ? task.taskTags[0].tag.name : '',
//          startTime:task.createDate||'',
//          dueTime: task.dueDate || '',
//          description:task.description
//        }));
//
//      break;
//      }
//
//    }
//  },[])
 const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      const quill = ReactQuill.getEditor();
      if (quill) {
        quill.focus();
        quill.format('link', fileUrl);
        quill.insertText(`\n`);
      }
    }
  };
  return (

    <div className="modal-container">
      {isProjectOpen && (

          <div className="modal-content">
            {/* 表单内容 */}
            <div className="Modal">
              <div className="container">
                <div className="form-container">
                  <div className="label">
                    <Input
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
                      <Input className='logfile'
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
                    <Input className='taginfo'
                        type="text"
                        name="taskName"
                        value={state.tag}
                        onChange={handleInputtagChange}/>
                  </div>
                   <div className="label">
                   <img className='pic' src={process.env.PUBLIC_URL + "/标签.png"}  alt="" ></img>
                     Team:

                         <select
                            className='taginfo'
                            value={state.team}
                            onChange={handleTeamChange}>
                            <option value="">Select Team</option>
                            {state.teams.map((team,index)=>(
                             <option key={index} value={team}>{team}</option>
                            ))}
                            </select>
                   </div>
{
                   state.team ? (
                     <>
                       <div className="label">
                         <img className='pic' src={process.env.PUBLIC_URL + "/用户.png"} alt="" />
                         TeamAnticipaters:
                         {/* 注释掉的选择框 */}
                         {/* <select
                           className='taginfo'
                           value={state.Anticipaters}
                           onChange={handleAnticipatersChange}>
                           <option value="">Select Anticipaters</option>
                           {state.teamAnticipaters.map((anticipater, index) => (
                             <option key={index} value={anticipater}>{anticipater}</option>
                           ))}
                         </select> */}
                       </div>
                       <div className="label">
                         <img className='pic' src={process.env.PUBLIC_URL + "/用户.png"} alt="" />
                         TeamLeader:
                         {/* 注释掉的选择框 */}
                         {/* <select
                           className='taginfo'
                           value={state.Leader}
                           onChange={handleLeaderChange}>
                           <option value="">Select Leader</option>
                           {state.teamLeaders.map((leader, index) => (
                             <option key={index} value={leader}>{leader}</option>
                           ))}
                         </select> */}
                       </div>
                     </>
                   ) : null
                 }






             {
//              <div className="label">
//                  <img className='pic' src={process.env.PUBLIC_URL + "/用户.png"}  alt="" ></img>
//                    <label className='Userlabel'>
//                      <div className='asstitle'>Assignee: </div>
//                      <select name=" assigneeOptions" className='Progressselect'  value={state.assignee} onChange={handleAssigneeChange}>
//                          {state.assigneeOptions.map((option) => (
//                             <option key={option} value={option}>{option}</option>
//                            ))}
//                      </select>
//                    </label>
//                  </div>
                  }

                  {type=="kanban"&&(<div className="label">
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
                  </div>)}

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

                    <button className="detail cancle" onClick={closeProject}>Cancel</button>
                  </div>
                  </div>




                <div className="notes-container" style={{ display: 'flex', flexDirection: 'column' }}>
                   <TeamSelector className='taginfo' onTeamSelect={handleTeamSelection} />
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

export default ProjectComponent;
