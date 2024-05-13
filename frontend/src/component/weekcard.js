import React, { useState } from 'react';
function Weekcard(props){
    const {title,tag}=props;
    const [isDel, setIsDel] = useState(false);
    const handleClick = () => {
        let myseitch=1-isDel;
        setIsDel(myseitch);
      };
    return (<div className="Weekcard">
        <div className="colorandcontent">
            <div className="colorbar" style={{color:`blue`}}></div>
            <div className={`detail ${isDel ? 'Isdelete' : ''}`}>
                <div className="line">
                    <div className="title">{title}</div>
                    <div className="delete iconfont icon-lajixiang" onClick={handleClick}></div>
                </div>
                <div className="tag">{tag}</div>
            </div>
        </div>
        
        
    </div>);
}
export default Weekcard;