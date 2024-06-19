import React, { useContext,useState } from 'react';
import ModalContext from '../context/ModalContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';
import { DayTasks,Tasks,WeekTasks,Projects} from "../Data/data";
import {createWeeklyTask} from "../service/weekly_write"
import {createDailyTask} from "../service/daily_write"
import {createKanbanTask} from "../service/kanbantask_write"
import {changeWeeklyTask} from "../service/weekly_change"
import {changeDailyTask} from "../service/daily_change"
import {changeKanbanTask} from "../service/kanbantask_change"
import TeamSelector from './teamSelector';
import {get_team}from "../service/team"
const ModalComponent = () => {
  const { isModalOpen, closeModal ,type,message,task} = useContext(ModalContext);
  //
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
      tag:'',
      assigneeOptions:['User1','User2'],
      notes: '',
      files: [],
      note:[],
      choosepro:'todo',
      team:'',
      teamAnticipaters:[],//含id与name
      teamAnticipater:'',
      teamLeaders:[],
      important:true,
      urgent:true,
      teams:[],//含team id与name
      teamData:[]//原数据


    });
          const fetchTeams = async () => {
            try {
              const Teams = await get_team();
              const formattedTeams = Teams.map(team => ({
                id: team.team.id,
                name: team.team.name
              }));

              setState(prevState => ({
                ...prevState,
                teams: formattedTeams,
                teamData: Teams
              }));
            } catch (error) {
              console.error("Error fetching teams:", error);
            }
          };
    function getTeamMember(name){
        const team=state.teamData.find(teamObj=>teamObj.team.name==name);

        if(team){
            return team.team.teamMembers
        }
        return undefined
    }
    function getIdByName(name){

            const team = state.teams.find(team => team.name === name);
              return team ? team.id : null;
    }
     function getAntiIdByName(name){
                const user = state.teamAnticipaters.find(team => team.name === name);

                  return user ? user.id : null;
        }
    function formatDate(date) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if(regex.test(date))return date;
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
        }

        const convertWeeklyStateToBackendFormat = () => {
//        const tags = state.tag.length===[] ? [] : [state.tag];
            const teamId = getIdByName(state.team);
            const userId=getAntiIdByName(state.teamAnticipater);
            // 构造新的 JSON 对象
            let backendData = {

              task_id:task.id||null,
                title: state.taskName,
                description: state.description,
                createDate: formatDate(state.startTime),
                dueDate: formatDate(state.dueTime),
                type: "weekly",
               tags: [state.tag],
              important: state.important,
              urgent: state.urgent,
              expired:false,
              teamIds: teamId ? [teamId] : [],
              userIds:userId?[userId]:[]
            };if(!state.tag)backendData.tags=[];
            if(!teamId)backendData.teamIds=[];
            if(!userId)backendData.userIds=[];
            return backendData;
          };
           const convertDailyStateToBackendFormat = () => {
           const teamId = getIdByName(state.team);
           const userId=getAntiIdByName(state.teamAnticipater);

                       const backendData = {

                        task_id:task.id||null,
                          title: state.taskName,
                          description: state.description,
                          createDate:formatDate(state.startTime),
                          dueDate: formatDate(state.dueTime),
                          type: "daily",
                          tags: [state.tag],
                          expired:false,
                         teamIds: teamId ? [teamId] : [],
                       userIds:userId?[userId]:[]
                        };
                        console.log(backendData)
                            if(!state.tag)backendData.tags=[];
                            if(!teamId)backendData.teamIds=[];
                                        if(!userId)backendData.userIds=[];
                                return backendData;
                            };
           const convertKanbanStateToBackendFormat = () => {
        const teamId = getIdByName(state.team);
        const userId=getAntiIdByName(state.teamAnticipater);
                       let backendData = {

                                     task_id:task.id||null,
                                       title: state.taskName,
                                       description: state.description,
                                       createDate: formatDate(state.startTime),
                                       dueDate:formatDate(state.dueTime),
                                       type: state.type,
                                       tags: [state.tag],
                                     state:state.choosepro,
                                       teamIds: teamId ? [teamId] : [],
                                       userIds:userId?[userId]:[]
                                   };
                                     console.log(backendData)
                                     if(!state.tag)backendData.tags=[];
                                   if(!teamId)backendData.teamIds=[];
                                               if(!userId)backendData.userIds=[];
                                    console.log('Generated backend data:', backendData);
                      return backendData;
                    };
                const handleSave = async (e) => {

                    let response;
                      e.preventDefault();
                    try {console.error('创建任务:', true);
                    if(!task.id){
                    switch(type){
                    case "day":
                      response = await createDailyTask(convertDailyStateToBackendFormat());break;
                     case "week":
                       response = await createWeeklyTask(convertWeeklyStateToBackendFormat());break;
                      case "kanban":
                        response = await createKanbanTask(convertKanbanStateToBackendFormat());break;
                        }}

                    else {
                    switch(type){

                    case "day":
                      response = await changeDailyTask(convertDailyStateToBackendFormat());break;
                     case "week":
                       response = await changeWeeklyTask(convertWeeklyStateToBackendFormat());break;
                      case "kanban":
                        response = await changeKanbanTask(convertKanbanStateToBackendFormat());break;
                        }
                    }}
                    catch (error) {
                      console.error('创建任务失败:', error);
                    }
                         closeModal();

                  };

const handleTry=()=>{

handleTeamFirst();
console.log(state)
}


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
  const handleAnticipatersChange=(event)=>{
     setState({
                 ...state,
                 teamAnticipater:event.target.value
         });
  }
  const handleTeamChange = (e) => {
    const selectedTeamName = e.target.value;
    // 如果选择了 "Select Team" 或者没有选择具体的团队
    if (selectedTeamName === "" || selectedTeamName === "Select Team") {
      setState(prevState => ({
        ...prevState,
        teamAnticipaters: [],
        teamLeaders: [],
        team: ""  // 或者你可以设置为 'Select Team' 视情况而定
      }));
      return; // 直接返回，避免继续执行后续逻辑
    }

    // 获取选定团队的成员
    const members = getTeamMember(selectedTeamName);
    const member = members.map(team => ({
      id: team.user.id,
      name: team.user.username
    }));

    // 获取选定团队的领导
    const leader = members
      .filter(team => team.leader) // 筛选出team.leader为true的成员
      .map(leader => ({
        id: leader.user.id,
        name: leader.user.username
      }));

    setState(prevState => ({
      ...prevState,
      teamAnticipaters: member,
      teamLeaders: leader,
      team: selectedTeamName
    }));
  };
const handleTeamFirst = () => {
    console.log("Calling handleTeamFirst");

    if (!task.team) {
      console.log("No team found in task");
      return;
    }

    // 调试 getTeamMember 函数的返回值
    const members = getTeamMember(task.team.name);
    console.log("Members fetched:", members);

    if (!Array.isArray(members) || members.length === 0) {
      console.log("No members found for the team");
      return;
    }

    const member = members.map(team => ({
      id: team.user.id,
      name: team.user.username
    }));

    console.log("Mapped team members:", member);

    const leader = members
      .filter(team => team.leader) // 筛选出 team.leader 为 true 的成员
      .map(leader => ({
        id: leader.user.id,
        name: leader.user.username
      }));

    console.log("Mapped team leaders:", leader);

    setState(prevState => ({
      ...prevState,
      teamAnticipaters: member,
      teamLeaders: leader,
      team: task.team
    }));

    console.log("State after updating team:", state);
  };

  const handleFileChange = (event) => {
    setState({
      ...state,
      files: event.target.files
    });
  };
 React.useEffect(() => {
    // 初始化逻辑封装在一个异步函数中
    const initializeData = async () => {
      try {
        // 先等待 fetchTeams 完成
        await fetchTeams();

        // 根据 message 更新状态
        switch (message) {
          case 1:
            setState(prevState => ({
              ...prevState,
              important: true,
              urgent: true
            }));
            break;
          case 2:
            setState(prevState => ({
              ...prevState,
              important: true,
              urgent: false
            }));
            break;
          case 3:
            setState(prevState => ({
              ...prevState,
              important: false,
              urgent: true
            }));
            break;
          case 4:
            setState(prevState => ({
              ...prevState,
              important: false,
              urgent: false
            }));
            break;
          default:
            break;
        }

        // 根据 task.type 更新状态
        if (task) {
          switch (type) {
            case "day":
              setState(prevState => ({
                ...prevState,
                type: "daily",
                choosepro: task.state,
                taskName: task.title || '',
                tag: task.taskTags?.[0]?.tag?.name || '',
                startTime: task.createDate || '',
                dueTime: task.dueDate || '',
                description: task.description
              }));
              if (task.team) {
                setState(prevState => ({
                  ...prevState,
                  team: task.team.name,
                  teamAnticipaters: task.teamAnticipaters,
                  teamLeaders: task.teamLeaders
                }));
              }
              break;

            case "week":
              setState(prevState => ({
                ...prevState,
                type: "weekly",
                choosepro: task.state,
                taskName: task.title || '',
                tag: task.taskTags?.[0]?.tag?.name || '',
                startTime: task.createDate || '',
                dueTime: task.dueDate || '',
                description: task.description,
                urgent: task.urgent,
                important: task.important
              }));
              if (task.team) {
                setState(prevState => ({
                  ...prevState,
                  team: task.team.name,
                  teamAnticipaters: task.teamAnticipaters,
                  teamLeaders: task.teamLeaders
                }));
              }
              break;

            case "kanban":
                  setState(prevState => ({
                         ...prevState,
                         type: "kanban",
                         choosepro: task.state,
                         taskName: task.title || '',
                         tag: task.taskTags?.[0]?.tag?.name || '',
                         startTime: task.createDate || '',
                         dueTime: task.dueDate || '',
                         description: task.description,
                         team: task.team?.name || '',
                         teamAnticipater: task.teamTasksAnticipaters?.[0]?.anticipater?.username || '',
                       }));
                       handleTeamFirst();
                       break;
            default:
              break;
          }
        }

      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    // 调用初始化函数
    initializeData();

  }, []);
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
                      {
//                      <ul>
//                        {state.files && Array.from(state.files).map((file) => (
//                          <li key={file.id}>{file.name}</li>
//                        ))}
//                      </ul>
}
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
                           {state.teams.map((team)=>(
                            <option key={team.id} value={team.name}>{team.name}</option>
                           ))}
                           </select>
                  </div>
                 {
                   state.team ? (
                     <>
                       <div className="label">
                         <img className='pic' src={process.env.PUBLIC_URL + "/用户.png"} alt="" />
                         TeamAnticipaters:
                          <select
                           className='taginfo'
                           value={state.Anticipater}
                           onChange={handleAnticipatersChange}>
                           <option value="">Select Anticipaters</option>
                           {state.teamAnticipaters.map((anticipater) => (
                             <option key={anticipater.id} value={anticipater.name}>{anticipater.name}</option>
                           ))}
                         </select>
                       </div>
                      <div className="label">
                        <img className='pic' src={process.env.PUBLIC_URL + "/用户.png"} alt="" />
                        <div>
                          TeamLeader:
                          {state.teamLeaders.length === 1 ? (
                            <span className='taginfo'>{state.teamLeaders[0].name}</span>
                          ) : state.teamLeaders.length > 1 ? (
                            // 有多个领导者
                            <select className='taginfo'>
                              <option value="">Select Leader</option>
                              {state.teamLeaders.map((leader) => (
                                <option key={leader.id} value={leader.name}>{leader.name}</option>
                              ))}
                            </select>
                          ) : (
                            // 没有领导者
                            <div>No Leader</div>
                          )}
                        </div>
                      </div>
                     </>
                   ) : null
                 }
                 {
//                  <div className="label">
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
            <button onClick={handleTry}>new</button>
            {/* ... 表单内容 */}
          </div>

      )}
    </div>
  );
};

export default ModalComponent;
