import React, { useState, useEffect } from 'react';
import './DroneMonitor.css';
import rotorIcon from './icons/rotor.png';
import cameraIcon from './icons/camera.png';
import weatherIcon from './icons/weather.png';

import sunIcon from './icons/weather/sun.png';
import rainIcon from './icons/weather/rain.png';
import snowIcon from './icons/weather/snow.png';
import fogIcon from './icons/weather/fog.png';

import windIcon from './icons/wind.png';
import landingIcon from './icons/landing.png';
import warningIcon from './icons/warning.png';
import speedIcon from './icons/speed.png';
import batteryIcon from './icons/battery.png';
import altitudeIcon from './icons/altitude.png';
import distanceIcon from './icons/distance.png';

const DroneBlock = ({ droneData, video, droneNumber }) => {
    const [latestData, setLatestData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [videoDuration, setVideoDuration] = useState(null);

    // useEffect(() => {
    //   const videoElement = document.querySelector('.video');
    //   if (videoElement) {
    //     videoElement.addEventListener('loadedmetadata', () => {
    //       setVideoDuration(videoElement.duration);
    //     });
    //   }
    //   return () => {
    //     if (videoElement) {
    //       videoElement.removeEventListener('loadedmetadata', () => {});
    //     }
    //   };
    // }, []);
  
    useEffect(() => {
      if (droneData && droneData.timestamps && droneData.timestamps.length > 0) {
        console.log('droneData.timestamps.length',droneData.timestamps.length)
        const timer = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 >= droneData.timestamps.length) {
              clearInterval(timer); // Stop the timer when reaching the end
              return prevIndex;
            }
            return prevIndex + 1;
          });
        }, (1000 * 40) / droneData.timestamps.length);
        return () => clearInterval(timer); // Clean up the timer when the component unmounts
      }
    }, [droneData]);
      
    
    useEffect(() => {
        if (droneData && droneData.timestamps && droneData.timestamps.length > 0) {
          setLatestData(droneData.timestamps[currentIndex]);
        }
      }, [droneData, currentIndex]);

    const getIconValue = (iconKey) => {
        if (latestData && iconKey in latestData) {
            if( iconKey=='rotor' || iconKey=='camera' )  {
                if (latestData[iconKey]==1){
                    return {value:'working',highlight:false};
                }
                else{
                    return {value:'not working',highlight:true};
                }
            }
            else if(iconKey=='landing' ){
                if (latestData[iconKey]==1){
                  return { value: 'possible', highlight: false };
                }
                else{
                  return { value: 'not possible', highlight: true };
                }
            }
            else if( iconKey=='warning'){
                if (latestData[iconKey]==1){
                  return { value: '', highlight: false };
                }
                else{
                  return { value: '<10m', highlight: true };
                }
            }
            else if(iconKey=='wind'){
              return { value: latestData[iconKey].toFixed(1) + 'm/s', highlight: false };
            }
            else if(iconKey=='battery'){
              if ((latestData[iconKey]*100).toFixed(0)>10){
                return { value: (latestData[iconKey]*100).toFixed(0) + '%', highlight: false };
              }
              else{
                return { value: (latestData[iconKey]*100).toFixed(0) + '%', highlight: true };
              }
            }
            else if(iconKey=='altitude'){
              return { value: (-1 * latestData[iconKey] * 100).toFixed(0)  + 'm', highlight: false };
            }
            else if(iconKey=='distance'){
              return { value: latestData[iconKey].toFixed(0) + 'm', highlight: false };
            }
            else if(iconKey=='speed'){
              return { value: (100 * latestData[iconKey]).toFixed(1) + 'm/s', highlight: false };
            }
            else if (iconKey === 'weather') {
              switch (latestData[iconKey]) {
                case 0:
                  return { value: 'Sunny', highlight: false };
                case 1:
                  return { value: 'Snowy', highlight: false };
                case 2:
                  return { value: 'Rainy', highlight: false }; // Highlight when rainy
                case 3:
                  return { value: 'Foggy', highlight: false };
                default:
                  return { value: '', highlight: false };
              }
            }
          }    
      return {value:'',highlight:false};
    };
  
    const icons = [
      { name: 'rotor', icon: rotorIcon, highlight:false },
      { name: 'camera', icon: cameraIcon, highlight:false },
      {
        name: 'weather',
        icon: weatherIcon, // Keep the original icon as fallback
        getIcon: (value) => {
          switch (value) {
            case 0:
              return sunIcon;
            case 1:
              return snowIcon;
            case 2:
              return rainIcon;
            case 3:
              return fogIcon;
            default:
              return weatherIcon;
          }
        },
      },
      { name: 'wind', icon: windIcon, highlight:false },
      { name: 'landing', icon: landingIcon, highlight:false },
      { name: 'warning', icon: warningIcon, highlight:false },
      { name: 'speed', icon: speedIcon, highlight:false },
      { name: 'battery', icon: batteryIcon, highlight:false },
      { name: 'altitude', icon: altitudeIcon, highlight:false },
      { name: 'distance', icon: distanceIcon, highlight:false },
    ];
  
    return (
        <div className="drone-block">
            <div className="top-row-icons">
              {icons.slice(0, 6).map((iconData, index) => (
                <div key={index} className="icon-wrapper">
                <div
                  className="icon"
                  title={`${iconData.name}: ${latestData[iconData.name] || 0}`}
                  style={{
                    backgroundImage: `url(${
                    iconData.getIcon
                    ? iconData.getIcon(latestData[iconData.name])
                    : iconData.icon
                    })`,
                    border: getIconValue(iconData.name).highlight ? '2px solid red' : 'none',
                  }}
                ></div>
                <span className="icon-text">{getIconValue(iconData.name).value}</span>
            </div>
            ))}
            </div>
            <div className="left-column-icons">
              {icons.slice(6).map((iconData, index) => (
                <div key={index} className="icon-wrapper">
                <div
                  className="icon"
                  title={`${iconData.name}: ${latestData[iconData.name] || 0}`}
                  style={{
                    backgroundImage: `url(${
                      iconData.getIcon
                        ? iconData.getIcon(latestData[iconData.name])
                        : iconData.icon
                    })`,
                    border: getIconValue(iconData.name).highlight ? '2px solid red' : 'none',
                  }}
                ></div>
                <span className="icon-text">{getIconValue(iconData.name).value}</span>
              </div>
              ))}
          </div>
          <div className="camera-view">
            <div className="camera-view-text">{`Drone ${droneNumber}`}</div>
            <video className="video" src={video} autoPlay muted />
          </div>
        </div>
      );
}  
  
  export default DroneBlock;