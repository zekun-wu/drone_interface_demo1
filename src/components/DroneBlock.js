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

const DroneBlock = ({ droneData, video }) => {
    const [latestData, setLatestData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    console.log('droneData:',droneData)
  
    useEffect(() => {
        if (droneData && droneData.timestamps && droneData.timestamps.length > 0) {
          const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % droneData.timestamps.length);
          }, 200); // Change the interval duration as needed
          return () => clearInterval(timer); // Clean up the timer when the component unmounts
        }
      }, [droneData]);
      
    console.log('currentIndex:',currentIndex)
    
    useEffect(() => {
        if (droneData && droneData.timestamps && droneData.timestamps.length > 0) {
          setLatestData(droneData.timestamps[currentIndex]);
        }
      }, [droneData, currentIndex]);

    const getIconValue = (iconKey) => {
        console.log('iconKey',iconKey)
        console.log(iconKey,':',latestData[iconKey])
        if (latestData && iconKey in latestData) {
            if( iconKey=='rotor' || iconKey=='camera' )  {
                if (latestData[iconKey]==1){
                    return 'working';
                }
                else{
                    return 'not working'
                }
            }
            else if(iconKey=='landing' ){
                if (latestData[iconKey]==1){
                    return 'possible';
                }
                else{
                    return 'not possible'
                }
            }
            else if( iconKey=='warning'){
                if (latestData[iconKey]==1){
                    return '';
                }
                else{
                    return '<10m'
                }
            }
            else if(iconKey=='wind'){
                return latestData[iconKey].toFixed(1)+'m/s'
            }
            else if(iconKey=='battery'){
                return latestData[iconKey].toFixed(2)*100+'%'
            }
            else if(iconKey=='altitude'){
                return -1*latestData[iconKey].toFixed(2)*100+'m'
            }
            else if(iconKey=='distance'){
                return latestData[iconKey].toFixed(0)+'m'
            }            
        return '';
        }
    };
  
    const icons = [
      { name: 'rotor', icon: rotorIcon },
      { name: 'camera', icon: cameraIcon },
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
      { name: 'wind', icon: windIcon },
      { name: 'landing', icon: landingIcon },
      { name: 'warning', icon: warningIcon },
      { name: 'speed', icon: speedIcon },
      { name: 'battery', icon: batteryIcon },
      { name: 'altitude', icon: altitudeIcon },
      { name: 'distance', icon: distanceIcon },
    ];
  
    return (
        <div className="drone-block">
          <div className="icon-container">
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
                      }}
                  ></div>
                  <span className="icon-text">{getIconValue(iconData.name)}</span>
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
                      }}
                  ></div>
                  <span className="icon-text">{getIconValue(iconData.name)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="camera-view">
            <video className="video" src={video} autoPlay loop muted />
          </div>
        </div>
      );
}  
  
  export default DroneBlock;