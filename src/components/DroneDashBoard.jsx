import React, { useState, useEffect } from 'react';
import './DroneDashBoard.css';

function DroneStats(props) {
  const { droneStats } = props;
  console.log(props.droneStats.timestamps.length)
  const [currentTime, setCurrentTime] = useState(0);

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(currentTime => (currentTime + 1) % props.droneStats.timestamps.length);
    }, 40);

    return () => clearInterval(intervalId);
  }, [props.droneStats.timestamps.length]);

  // Render the parameters for the current timestamp
  const currentParams = props.droneStats.timestamps[currentTime];
  return (
    <div className="dashboard">
        <div className="dashboard-icon">
          <div className="dashboard-icon-label">Time</div>  
          <div className="dashboard-icon-label">{currentParams.time.toFixed(2)}</div>  
        </div>        
        <div className="dashboard-icon">
          <div className="dashboard-icon-label">X Value</div>  
          <div className="dashboard-icon-label">{currentParams.x_val.toFixed(2)}</div>  
        </div>    
        <div className="dashboard-icon">
          <div className="dashboard-icon-label">Y Value</div>  
          <div className="dashboard-icon-label">{currentParams.y_val.toFixed(2)}</div>  
        </div>    
        <div className="dashboard-icon">
          <div className="dashboard-icon-label">Z Value</div>  
          <div className="dashboard-icon-label">{currentParams.z_val.toFixed(2)}</div>  
        </div>    
        <div className="dashboard-icon">
          <div className="dashboard-icon-label">Pitch</div>  
          <div className="dashboard-icon-label">{currentParams.pitch.toFixed(2)}</div>  
        </div>    
        <div className="dashboard-icon">
          <div className="dashboard-icon-label">Roll</div>  
          <div className="dashboard-icon-label">{currentParams.roll.toFixed(2)}</div>  
        </div>    
        <div className="dashboard-icon">
          <div className="dashboard-icon-label">Yaw</div>  
          <div className="dashboard-icon-label">{currentParams.yaw.toFixed(2)}</div>  
        </div>    
    </div> 
   );
}

export default DroneStats;
