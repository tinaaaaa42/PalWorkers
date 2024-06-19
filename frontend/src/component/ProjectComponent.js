import React, { useContext,useState } from 'react';
import ProjectContext from '../context/ProjectContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';
import TeamSelector from './teamSelector'
import {get_team}from "../service/team"

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
       teams:[],//含team id与name
       teamData:[]//原数据


     });
    function formatDate(date) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if(regex.test(date))return date;
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
        }
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
const handleAnticipatersChange=(event)=>{
     setState({
                 ...state,
                 teamAnticipater:event.target.value
         });
  }
  const handleNotesChange = (value) => {
    setState({
      ...state,
      notes: value
    });
  };
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

     //获取选定团队的成员
    const members = getTeamMember(selectedTeamName);
    const member = members.map(team => ({
      id: team.user.id,
      name: team.user.username
    }));

     //获取选定团队的领导
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
React.useEffect(() => {
     // 初始化逻辑封装在一个异步函数中
     const initializeData = async () => {
       try {
         // 先等待 fetchTeams 完成
         await fetchTeams();
               setState(prevState => ({
                 ...prevState,
                 type: "kanban",
                 choosepro: "todo",
                 taskName:  '',
                 tag: '',

                 description: ""
               }));

       } catch (error) {
         console.error("Error initializing data:", error);
       }
     };

     // 调用初始化函数
     initializeData();

   }, []);

               const handleSave = async (e) => {
                 e.preventDefault();

                 const { taskName, team } = state;
                 let teamId = getIdByName(team) || 0; // 如果没有找到teamId，设置默认值为0

                 try {
                   // 使用URLSearchParams来构建查询字符串
                   const params = new URLSearchParams();
                   params.append('title', taskName);
                   params.append('teamId', teamId); // 确保teamId是字符串

                   // 将查询参数附加到URL上
                   const apiUrl = 'http://localhost:8088/api/project/create?' + params.toString();

                   const response = await fetch(apiUrl, {
                     method: 'POST',
                     headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                     },
                     credentials:"include"
                   });

                   if (!response.ok) {
                     throw new Error(`Error! status: ${response.status}`);
                   }

                   const projectDto = await response.json();
                   console.log('Project created successfully:', projectDto);
                   closeProject();
                 } catch (error) {
                   console.error('Failed to create project:', error);
                 }
               };
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



                  <div className="label">
   <button className="detail save" onClick={handleSave}>Save</button>
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
