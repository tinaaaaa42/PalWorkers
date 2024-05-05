function Weekcard(props){
    const {title,tag}=props;
    return (<div className="Weekcard">
        <div className="title">{title}</div>
        <div className="tag">{tag}</div>
    </div>);
}
export default Weekcard;