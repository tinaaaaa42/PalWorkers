import React, { useState } from 'react';
import { Project ,Tasks,Tag} from '../Data/data';
function Seconddir(){
    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [active, setactive] = useState(false);
    const [active2, setactive2] = useState(false);
    const [active3, setactive3] = useState(false);
    const [active4, setactive4] = useState(false);
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
    return (
        <div className="Seconddir">
            <h1 className='kanban'>Kanban</h1>
            <div className={`title ${active ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"1")}>Team</div>
            <div className={`expandable-content  teamlist  ${expanded ? 'expanded' : 'collapsed'}`}>
                <div className={`content`} >1</div>
                <div className={`content`} >1</div>
                <div className={`content`} >1</div>
            </div>
            <div className={`title ${active2 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"2")}>Project</div>
            <div className={`expandable-content  projectlist  ${expanded2 ? 'expanded' : 'collapsed'}`}>
                { Project.map(project => (
                    <div className={`content`} key={project.name}>{project.name}</div>
                ))}
            </div>

            <div className={`title ${active3 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"3")}>Tasks</div>
            <div className={`expandable-content  projectlist  ${expanded3 ? 'expanded' : 'collapsed'}`}>
                {Tasks.map(tasks=>(<div className={`content`} key={tasks.name}>{tasks.name}</div>))}
            </div>

            <div className={`title ${active4 ? '':'active'}`} onClick={(e)=>toggleExpanded(e,"4")}>Tag</div>
            <div className={`expandable-content  taglist  ${expanded4 ? 'expanded' : 'collapsed'}`}>
                {Tag.map(tag=>(<div className={`content`} key={tag.name}>{tag.name}</div>))}
            </div>
        </div>
    );
}
export default Seconddir;