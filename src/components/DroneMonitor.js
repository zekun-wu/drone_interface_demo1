import React, { useState, useEffect } from 'react';
import DroneBlock from './DroneBlock';
import './DroneMonitor.css';

const DroneMonitor = ({ key, scene, highlight }) => {
  const [droneData, setDroneData] = useState({});
  const droneBlocks = new Array(6).fill(null);
  const criticalSituationFolders = ['t1', 't2', 't3'];
  
  // Randomly select one video and data file from each critical situation folder
  const criticalSituationFiles = criticalSituationFolders.map(folder => {
    const fileIndex = Math.floor(Math.random() * 6) + 1;
    return {
      video: `${process.env.PUBLIC_URL}/assets/critical_situations/${folder}/${fileIndex}.mp4`,
      data: `${process.env.PUBLIC_URL}/data/critical_situations/${folder}/${fileIndex}.json`
    };
  });

  const droneFiles = [];
  const normalSceneFolder = `${process.env.PUBLIC_URL}/assets/normal_scenes`;
  for (let i = 1; i <= 3; i++) {
    const video = `${normalSceneFolder}/${i}.mp4`;
    const dataFile = `${process.env.PUBLIC_URL}/data/normal_scenes/${i}.json`;
    droneFiles.push({ video, dataFile });
  }

  for (let i = 4; i <= 6; i++) {
    const criticalSituationIndex = Math.floor(Math.random() * criticalSituationFiles.length);
    const file = criticalSituationFiles[criticalSituationIndex];
    criticalSituationFiles.splice(criticalSituationIndex, 1);

    const video = file.video;
    const dataFile = file.data;
    droneFiles.push({ video, dataFile });
  }


    // Combine the critical situation and normal scene files randomly
    droneFiles.sort(() => Math.random() - 0.5);

    console.log('droneFiles:',droneFiles)

    const droneVideos = droneFiles.map((file) => file.video);
    const droneDataFiles = droneFiles.map((file) => file.data || file.dataFile);

    useEffect(() => {
      fetch(`${process.env.PUBLIC_URL}/data/scene${scene}/data.json`)
        .then((response) => response.json())
        .then((data) => {
          setDroneData(data);
        });
    }, [scene]);
  
    
    return (
      <div className="drone-monitor-container">
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
      </div>
    );
};

export default DroneMonitor;




