import React, { useState, useEffect } from 'react';
import DroneBlock from './DroneBlock';
import './DroneMonitor.css';

const DroneMonitor = ({currentScene}) => {

  const [droneData, setDroneData] = useState({});


  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/scene${currentScene}/data.json`)
      .then((response) => response.json())
      .then((data) => {
        setDroneData(data);
      });
  }, [currentScene]);

  const droneBlocks = new Array(8).fill(null);

  const droneVideos = new Array(8)
    .fill(null)
    .map(
      (_, index) =>
        `${process.env.PUBLIC_URL}/assets/scene${currentScene}/drone${index + 1}_.mp4`,
    );


  return (
    <div className="container">
      {droneBlocks.map((_, index) => (
        <DroneBlock key={index} droneData={droneData[String(index + 1)]} video={droneVideos[index]} />
      ))}
    </div>
  );
};

export default DroneMonitor;