import Navleft from "../component/navleft";
import Seconddir from "../component/seconddir";
import Header from "../component/header";
import Control from "../component/control";
import Kanban from "../component/Kanban";
import ModalContext from '../context/ModalContext';
import ProjectContext from '../context/ProjectContext';
import React, { useContext ,useState,useEffect} from 'react';
import {getKanbanTask, get_kanban_task} from "../service/kanban_task";
import {createBatchKanbanTask} from "../service/kanbantask_write";
import Navbar from "../component/Navv";
import {Modal,Input} from "antd";
import {get_all_projects} from "../service/project";
function Kanbanpage(){
    const { openModal ,isModalOpen} = useContext(ModalContext);
    const { openProject ,isProjectOpen} = useContext(ProjectContext);
    const [kanbantasks, setKanban_tasks] = useState([]);
    const [allTags, setAllTags] = useState(new Set()); 
    const [allTaskTitles, setAllTaskTitles] = useState([]);
    const [update,setUpdate]=useState(0);
    const [projects, setProjects] = useState([])
    // useEffect( () => {
    //     init_kanban_tasks();
    // }, []);
    // const init_kanban_tasks = async () => {
    //     let kanban_tasks = await get_kanban_task();
    //     console.log(kanban_tasks);
    //     setKanban_tasks(kanban_tasks);
    // }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userInput, setUserInput] = useState('');
    const showModal = () => {
        setIsModalVisible(true);
    };
    const HandleUpdate=()=>{
        setUpdate(update+1);
    }
    const handleOk = async () => {
        const num = parseInt(userInput, 10);
        if (!isNaN(num) && num > 0) {
          await handleAdd(num); // 调用处理函数
          setIsModalVisible(false);
          setUserInput('');
          HandleUpdate();
        } else {
          alert('请输入一个有效的数！');
          setUserInput('');
        }
    };
    
    const handleCancel = () => {
    setIsModalVisible(false);
    setUserInput('');
    };

    const handleInputChange = (e) => {
    setUserInput(e.target.value);
    };

    const handleAdd = async (num) => {
      await createBatchKanbanTask(num);
    };

    const [dates, setDates] = useState([new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()]);
    const fetchKanbanTasks = async (start, end) => {
        const Kanban_tasks = await getKanbanTask(start,end);
        setKanban_tasks(Kanban_tasks);
    };
    const fetchProjects = async ()=> {
        const projects = await get_all_projects();
        setProjects(projects);
    }
    useEffect(() => {
        const [start, end] = dates;
        fetchKanbanTasks(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
        fetchProjects();
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key.toLowerCase() === 'a') {
              event.preventDefault(); // 阻止默认行为
              showModal(); // 显示模态框
            }
          };
      
          window.addEventListener('keydown', handleKeyDown);
      
          return () => {
            window.removeEventListener('keydown', handleKeyDown);}
    }, [dates,update]);
    
    const handleKanbanSearch = (start, end) => {
        setDates([start, end]);
        fetchKanbanTasks(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    };
    const handleClick = () => {
        openModal("kanban","","");

    };
     const projectClick = () => {
                openProject("new");

            };
    const handleReset=()=>{
        setDates([new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()]);
        const [start, end] = dates;
        fetchKanbanTasks(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    }

    return (<>
    <div className="container">
        <Navleft></Navleft>
        {/* <Seconddir tags={allTags} taskstitle={allTaskTitles}></Seconddir> */}
        <Navbar tasks={kanbantasks} title={"Kanban"}></Navbar>
        <div className="mainpart">
        <Header></Header>
        <Control taskhandler={handleClick} handleKanbanSearch={handleKanbanSearch} handleReset={handleReset} projecthandler={projectClick}></Control>
        <Kanban kanban_tasks={kanbantasks} HandleUpdate={HandleUpdate} kanban_project={projects}></Kanban>
        </div>
        <Modal title="请批量创建" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="1" value={userInput} onChange={handleInputChange} />
        </Modal>
    </div>
    </>);
}
export default Kanbanpage
