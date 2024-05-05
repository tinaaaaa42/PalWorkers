const progressStyle = (percentage) => ({
    width: `${percentage}%`, 
    backgroundColor: percentage >= 100 ? '#78d700' : '#ff9f48',  
  });
function ProgressBar({ percentage }) {
    return (
      <div className="Progressbar" >
        <div style={progressStyle(percentage)}></div>
      </div>
    );
}
export default ProgressBar;  