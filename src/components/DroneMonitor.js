import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DroneBlock from './DroneBlock';
import './DroneMonitor.css';

const DroneMonitor = ({ key, scene, highlight, droneData, droneDataFiles, droneVideoFiles, onDataPlayed, taskStarted}) => {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [dataPlayed, setDataPlayed] = useState(false); 
  // const [droneData, setDroneData] = useState({});
  const droneBlocks = new Array(6).fill(null);
  const criticalSituationFolders = ['t1', 't2', 't3'];
  
  // Randomly select one video and data file from each critical situation folder
  // const criticalSituationFiles = criticalSituationFolders.map(folder => {
  //   const fileIndex = Math.floor(Math.random() * 6) + 1;
  //   return {
  //     video: `${process.env.PUBLIC_URL}/assets/critical_situations/${folder}/${fileIndex}.mp4`,
  //     data: `${process.env.PUBLIC_URL}/data/critical_situations/${folder}/${fileIndex}.json`
  //   };
  // });

  // const droneFiles = [];
  // const normalSceneFolder = `${process.env.PUBLIC_URL}/assets/normal_scenes`;
  // for (let i = 1; i <= 3; i++) {
  //   const video = `${normalSceneFolder}/${i}.mp4`;
  //   const dataFile = `${process.env.PUBLIC_URL}/data/normal_scenes/${i}.json`;
  //   droneFiles.push({ video, dataFile });
  // }

  // for (let i = 4; i <= 6; i++) {
  //   const criticalSituationIndex = Math.floor(Math.random() * criticalSituationFiles.length);
  //   const file = criticalSituationFiles[criticalSituationIndex];
  //   criticalSituationFiles.splice(criticalSituationIndex, 1);

  //   const video = file.video;
  //   const dataFile = file.data;
  //   droneFiles.push({ video, dataFile });
  // }


  // Combine the critical situation and normal scene files randomly
  // droneFiles.sort(() => Math.random() - 0.5);
  // console.log('droneFiles:',droneFiles)

  // const droneVideos = droneFiles.map((file) => file.video);
  // const droneDataFiles = droneFiles.map((file) => file.data || file.dataFile);

  // useEffect(() => {
  //   fetch(`${process.env.PUBLIC_URL}/data/scene${scene}/data.json`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDroneData(data);
  //     });
  // }, [scene]);

  const droneNumberDataMap = useMemo(() => droneDataFiles.reduce((map, dataFile, index) => {
    const droneNumber = index + 1;
    const folderName = dataFile.match(/\/(\w+)\/\d+\/data.json$/)[1];
    const folderIndex = criticalSituationFolders.indexOf(folderName);
    map[droneNumber] = {
      dataFile,
      folderName: folderIndex === -1 ? 'normal_scenes' : `t${folderIndex + 1}`
    };
    return map;
  }, {}), [droneDataFiles]);

  const handleTimestampChange = useCallback((droneNumber, timestampIndex) => {
    setCurrentTimestamp((prevTimestamp) => {
      if (timestampIndex > prevTimestamp) {
        return timestampIndex;
      }
      return prevTimestamp;
    });
  
    const allDataPlayed = Object.values(droneData).every((entry, index) => {
      if (entry.status === "fulfilled") {
        return timestampIndex === entry.value.timestamps.length;
      }
      return false;
    });
    // console.log('allDataPlayed',allDataPlayed)
    if (allDataPlayed) {
      onDataPlayed();
    }
  }, [droneData,onDataPlayed]);

  console.log('droneVideoFiles',droneVideoFiles)
    
  return (
    <div className="drone-monitor-container">
      {/* <div className="file-list">
        <h3>Loaded Drone Data:</h3>
        <ul>
          {droneDataFiles.map((dataFile, index) => (
            <li key={index}>{`${index + 1}. ${dataFile}/data.json`}</li>
          ))}
        </ul>
      </div> */}
      <div className="container">
        {Object.keys(droneData).length === 0 ? (
          <p>Loading...</p>
        ) : (
          droneBlocks.map((_, index) => (
           <DroneBlock
              droneData={droneData[String(index + 1)].value}
              video={droneVideoFiles[index]}
              droneNumber={index + 1}
              highlightStatus={highlight}
              onTimestampChange={handleTimestampChange}
              isFrozen={!taskStarted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DroneMonitor;




