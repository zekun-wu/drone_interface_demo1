import React, { useState, useEffect } from 'react';
import DroneBlock from './DroneBlock';
import './DroneMonitor.css';

const DroneMonitor = ({ key, scene, highlight }) => {
  const [droneData, setDroneData] = useState({});
  const droneBlocks = new Array(8).fill(null);
  const droneVideos = new Array(8)
    .fill(null)
    .map(
      (_, index) =>
        `${process.env.PUBLIC_URL}/assets/scene${scene}/drone${index + 1}_.mp4`,
    );

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/scene${scene}/data.json`)
      .then((response) => response.json())
      .then((data) => {
        setDroneData(data);
      });
  }, [scene]);

  return (
    <div className="container">
      {droneBlocks.map((_, index) => (
        <DroneBlock
          key={index}
          droneData={droneData[String(index + 1)]}
          video={droneVideos[index]}
          droneNumber={index + 1}
          highlight={highlight}
        />
      ))}
    </div>
  );
};

export default DroneMonitor;




