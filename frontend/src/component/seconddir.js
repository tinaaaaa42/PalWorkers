import React, { useState } from 'react';
import { Projects ,Tasks,Tag,WeekTasks,DayTasks} from '../Data/data';
import { useLocation, useNavigate } from 'react-router-dom';
function Seconddir(){
    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [active, setactive] = useState(false);
    const [active2, setactive2] = useState(false);
    const [active3, setactive3] = useState(false);
    const [active4, setactive4] = useState(false);
    const isGroupProjects = Projects.filter((project) => project.grouptag === "isgroup");
    const sortedProjects = isGroupProjects.slice().sort((a, b) => a.groupid - b.groupid);
    const toggleExpanded = (e,id) => {
        if(id==="1"){
            setExpanded(!expanded);
            setactive(!active);
        }
        if(id==="2"){
            setExpanded2(!expanded2);
            setactive2(!active2);
        }
        if(id==="3"){
            setExpanded3(!expanded3);
            setactive3(!active3);
        }
        if(id==="4"){
            setExpanded4(!expanded4);
            setactive4(!active4);
        }
        
    };
    const location = useLocation();
    const navigate = useNavigate();
    const renderTitle = () => {
        if(location.pathname.startsWith('/project')){
            return <>
            <div className='Projecttitle'><h1 className='project'>Project</h1>
            <button onClick={() => navigate('/')}>back</button></div>
            </>;
        }
        switch (location.pathname) {
        case '/week':
            return <h1 className='week'>Week</h1>;
        case '/day':
            return <h1 className='day'>Day</h1>;
        case '/':
            return <h1 className='kanban'>Kanban</h1>;
        default:
            return <h1>Page Not Found</h1>;
        }
    };
    const renderCatelog=()=>{
        if (location.pathname.startsWith('/project')) {
            const projectid =  parseInt(location.pathname.split('/')[2], 10); // 获取匹配到的参数值
            const project = Projects.find((project) => project.id === projectid);
            return (<>
            <div className={`title ${active3 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"3")}>Tasks</div>
            <div className={`expandable-content  projectlist  ${expanded3 ? 'expanded' : 'collapsed'}`}>
                {project.Tasks.map(tasks=>(<div className={`content`} key={tasks.title}>{tasks.title}</div>))}
            </div>
            <div className={`title ${active4 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"4")}>Tag</div>
            <div className={`expandable-content  taglist  ${expanded4 ? 'expanded' : 'collapsed'}`}>
                {project.Tasks.map(task=>(<div className={`content`} key={task.title}>{task.tag}</div>))}
            </div>
            </>)
        }
        switch (location.pathname) {
            case '/week':
                return (<>
                <div className={`title ${active3 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"3")}>Tasks</div>
                <div className={`expandable-content  projectlist  ${expanded3 ? 'expanded' : 'collapsed'}`}>
                    {WeekTasks.map(tasks=>(<div className={`content`} key={tasks.title}>{tasks.title}</div>))}
                </div>
                <div className={`title ${active4 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"4")}>Tag</div>
                <div className={`expandable-content  taglist  ${expanded4 ? 'expanded' : 'collapsed'}`}>
                    {WeekTasks.map(tasks=>(<div className={`content`} key={tasks.title}>{tasks.tag}</div>))}
                </div>
                </>);
            case '/':
                return (<>
                    <div className={`title ${active ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"1")}>Team</div>
                    <div className={`expandable-content  teamlist  ${expanded ? 'expanded' : 'collapsed'}`}>
                        {sortedProjects.map((project) => (
                            <div className={`content`} key={project.title}>Group{project.groupid}</div>
                        ))}
                    </div>
                    <div className={`title ${active2 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"2")}>Project</div>
                    <div className={`expandable-content  projectlist  ${expanded2 ? 'expanded' : 'collapsed'}`}>
                        { Projects.map(project => (
                            <div className={`content`} key={project.title}>{project.title}</div>
                        ))}
                    </div>
                    <div className={`title ${active3 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"3")}>Tasks</div>
                    <div className={`expandable-content  projectlist  ${expanded3 ? 'expanded' : 'collapsed'}`}>
                        {Tasks.map(tasks=>(<div className={`content`} key={tasks.title}>{tasks.title}</div>))}
                    </div>
                    <div className={`title ${active4 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"4")}>Tag</div>
                    <div className={`expandable-content  taglist  ${expanded4 ? 'expanded' : 'collapsed'}`}>
                        {Tag.map(tag=>(<div className={`content`} key={tag.name}>{tag.name}</div>))}
                    </div>
                    </>);
              case '/day':
                  return (<>
                    <div className={`title ${active3 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"3")}>Tasks</div>
                   <div className={`expandable-content  projectlist  ${expanded3 ? 'expanded' : 'collapsed'}`}>
                        {DayTasks.map(tasks=>(<div className={`content`} key={tasks.title}>{tasks.title}</div>))}
                          </div>
                              <div className={`title ${active4 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"4")}>Tag</div>
                                       <div className={`expandable-content  taglist  ${expanded4 ? 'expanded' : 'collapsed'}`}>
                                    {DayTasks.map(tasks=>(<div className={`content`} key={tasks.title}>{tasks.tag}</div>))}
                          </div>
                            </>);
            default:
                return <h1>Page Not Found</h1>;
            }
    }

    return (
        <div className="Seconddir">
            {renderTitle()}
            {renderCatelog()}
        </div>
    );
}
export default Seconddir;