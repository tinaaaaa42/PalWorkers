import React, { useContext,useState } from 'react';
import ModalContext from '../context/ModalContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DayTasks,Tasks,WeekTasks} from "../Data/data";
const ModalComponent = () => {
  const { isModalOpen, closeModal ,type,key,message} = useContext(ModalContext);



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
      time: new Date(),
      tag:'',
      assignee: '',
      assigneeOptions: ['User1', 'User2', 'User3'],
      image: null,
      notes: '',
      files: [],
      note:[]
    });

     const handleEditClick = (event) => {
        // 使用事件目标的 value 属性更新 taskName 状态
        console.log("change")
        const newTaskName =event.target.value
        setState(prevState => ({
                  ...prevState,
                  taskName: event.target.value,
                }));

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

  const handleDateChange = (date) => {
    setState({
      ...state,
      time: date
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
    // 根据 keyToFind 的值初始化 taskNam
    switch(type){

      case "day":{

      if(message=== 'new') {
             setState(prevState => ({
               ...prevState,
               taskName: '',
             }));
             break;
             }

      const task = DayTasks.find(task => task.key === key);
      if (task) {
        setState(prevState => ({
          ...prevState,
          taskName: task.title,
          tag:task.tag,
          time:task.date,
          description:task.description
        }));
        if(task.note!=null){
        setState(prevState => ({
              ...prevState,
              note: task.note,

           }));}
      }break;
      }
      case "week":{
       if(type=== 'new') {
                   setState(prevState => ({
                     ...prevState,
                     taskName: '',
                   }));
                   break;
                   }
       const task = WeekTasks.find(task => task.id === key);
            if (task) {
              setState(prevState => ({
                ...prevState,
                taskName: task.title,
                tag:task.tag,
                time:task.date
              }));
              if(task.note!=null){
              setState(prevState => ({
                    ...prevState,
                    note: task.note,

                 }));}
            }break;
            }
      case "kanban":{
      //console.log(key)
       if(message=== 'new') {
                   setState(prevState => ({
                     ...prevState,
                     taskName: '',
                   }));
                   break;
                   }
       const task = Tasks.find(task => task.id === key);
            if (task) {
             console.log("task")
              setState(prevState => ({
                ...prevState,
                taskName: task.title,
                tag:task.tag,
                 time:task.date
              }));
              if(task.note!=null){
              setState(prevState => ({
                    ...prevState,
                    note: task.note,

                 }));}
            }break;
            }
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

                    <div className="column">
                      Description:
                      <textarea
                        name="description"
                        value={state.description}
                        onChange={handleInputChange}
                        placeholder="Enter your description here..."
                        rows="4"
                        cols="50"
                        className="modal-rounded-textarea"
                      />
                    </div>

                   <div className="column">
                      Add File:
                      <input
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
                    Tag:
                    <input
                        type="text"
                         name="taskName"
                           value={state.tag}/>
                    </div>

                  <div className="label">
                    <label>
                      Assignee:
                      <select
                        name="assignee"
                        value={state.assignee}
                        onChange={handleAssigneeChange}
                      >
                        {state.assigneeOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                  </div>


                    <div className="label">
                        <label>
                           Due:
                             <DatePicker
                              selected={state.time}
                              onChange={handleDateChange}
                              dateFormat="yyyy-MM-dd"
                              style={{
                                  borderRadius: '10px'
                                }}
                             />
                        </label>
                     </div>

                     <div className="label">
                        <button className="save">Save</button>
                        <button className="cancle" onClick={closeModal}>Cancle</button>
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
