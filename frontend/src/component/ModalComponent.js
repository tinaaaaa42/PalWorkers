import React, { useContext,useState } from 'react';
import ModalContext from '../context/ModalContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DayTasks} from "../Data/data";
const ModalComponent = () => {
  const { isModalOpen, closeModal ,type,key} = useContext(ModalContext);



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
      isProject: false,
      time: new Date(),
      label: 'task',
      labelOptions: ['task', 'project', 'lab'],
      assignee: '',
      assigneeOptions: ['User1', 'User2', 'User3'],
      image: null,
      notes: '',
      files: [],
      createTime: getCurrentDateTime()
    });

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

  return (

    <div className="modal-container">
      {isModalOpen && (

          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>X</button>
            {/* 表单内容 */}
            <div className="Modal">
              <div className="container">
                <div className="form-container">
                  <h1>Task Details</h1>
                  <div className="label">
                    <label>
                      Task Name:
                      <input
                        type="text"
                        name="taskName"
                        value={state.taskName}
                        onChange={handleInputChange} />
                    </label>
                  </div>
                  <div className="label row">
                    <div className="column">
                      <textarea
                        name="description"
                        value={state.description}
                        onChange={handleInputChange}
                        placeholder="Enter your description here..."
                        rows="4"
                        cols="50"
                      />
                    </div>

                    <div className="column">
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="file-input"
                        />
                        {state.image && (
                          <img src={state.image} alt="Description" style={{ maxWidth: '100%' }} />
                        )}
                      </label>
                    </div>
                  </div>


                  <div>
                  {key}</div>


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
                      Is it a project?
                      <input
                        type="checkbox"
                        name="isProject"
                        checked={state.isProject}
                        onChange={handleInputChange} />
                    </label>
                  </div>

                  <div className="label">
                    <label>
                      Create Time:
                      <input
                        type="text"
                        value={state.createTime}
                        readOnly
                        className="create-time"
                      />
                    </label>
                  </div>

                    <div className="label">
                        <label>
                           Due:
                             <DatePicker
                              selected={state.time}
                              onChange={handleDateChange}
                              dateFormat="yyyy-MM-dd"
                             />
                        </label>
                     </div>

                 <div className="label">
                          <label>
                              Label:
                              <select
                                name="label"
                                value={state.label}
                                onChange={handleLabelChange}
                              >
                                {state.labelOptions.map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </label>
                          </div>

                        </div>
                <div className="notes-container">
                  <div className="label">
                    <label>
                      Notes:
                      <ReactQuill
                        value={state.notes}
                        onChange={handleNotesChange}
                        placeholder="Enter your notes here..."
                      />
                    </label>
                  </div>
                  <div className="label">
                    <label>
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
