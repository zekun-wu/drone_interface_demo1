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

const DroneBlock = ({ droneData, video, droneNumber,highlight }) => {


    const [latestData, setLatestData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      if (droneData && droneData.timestamps && droneData.timestamps.length > 0) {
        const timer = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 >= droneData.timestamps.length) {
              clearInterval(timer);
              return prevIndex;
            }
            return prevIndex + 1;
          });
        }, (1000 * 40) / droneData.timestamps.length);
        return () => clearInterval(timer); 
      }
    }, [droneData]);
      
    
    useEffect(() => {
        if (droneData && droneData.timestamps && droneData.timestamps.length > 0) {
          setLatestData(droneData.timestamps[currentIndex]);
        }
      }, [droneData, currentIndex]);

      const getIconValue = (iconKey) => {
        if (latestData && iconKey in latestData) {
          if (iconKey === 'rotor' || iconKey === 'camera') {
            if (latestData[iconKey] === 1) {
              return { value: 'working', highlight: false };
            } else {
              return { value: 'not working', highlight: getHighlightStyle(iconKey) };
            }
          } else if (iconKey === 'landing') {
            if (latestData[iconKey] === 1) {
              return { value: 'possible', highlight: false };
            } else {
              return { value: 'not possible', highlight: getHighlightStyle(iconKey) };
            }
          } else if (iconKey === 'warning') {
            if (latestData[iconKey] === 1) {
              return { value: '', highlight: false };
            } else {
              return { value: '<10m', highlight: getHighlightStyle(iconKey) };
            }
          } else if (iconKey === 'wind') {
            return { value: latestData[iconKey].toFixed(1) + 'm/s', highlight: null};
          } else if (iconKey === 'battery') {
            if ((latestData[iconKey] * 100).toFixed(0) > 10) {
              return { value: (latestData[iconKey] * 100).toFixed(0) + '%', highlight: null};
            } else {
              return { value: (latestData[iconKey] * 100).toFixed(0) + '%', highlight: getHighlightStyle(iconKey) };
            }
          } else if (iconKey === 'altitude') {
            return { value: (-1 * latestData[iconKey] * 100).toFixed(0) + 'm', highlight: null };
          } else if (iconKey === 'distance') {
            return { value: latestData[iconKey].toFixed(0) + 'm', highlight:null };
          } else if (iconKey === 'speed') {
            return { value: (100 * latestData[iconKey]).toFixed(1) + 'm/s', highlight: null };
          } else if (iconKey === 'weather') {
            switch (latestData[iconKey]) {
              case 0:
                return { value: 'Sunny', highlight: false };
              case 1:
                return { value: 'Snowy', highlight: false };
              case 2:
                return { value: 'Rainy', highlight: false };
              case 3:
                return { value: 'Foggy', highlight: false };
              case 4:
                return { value: 'Extreme', highlight: getHighlightStyle(iconKey) };                
              default:
                return { value: '', highlight: false };
            }
          }
        }
        return { value: '', highlight: false };
      };

      const getHighlightStyle = (iconKey) => {
        switch (highlight) {
          case 1:
            return iconKey === 'weather' && latestData[iconKey] !== 4? false: 1; // Red border for all icons except weather
          case 2:
            return iconKey === 'weather' && latestData[iconKey] !== 4 ? false : 2; // Yellow background for all icons except weather
          default:
            return false;
        }
      };
  
    const icons = [
      { name: 'rotor', icon: rotorIcon },
      // { name: 'camera', icon: cameraIcon },
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
      // { name: 'wind', icon: windIcon },
      { name: 'landing', icon: landingIcon },
      { name: 'warning', icon: warningIcon },
      { name: 'speed', icon: speedIcon },
      { name: 'battery', icon: batteryIcon },
      { name: 'altitude', icon: altitudeIcon },
      { name: 'distance', icon: distanceIcon },
    ];
  
    return (
      <div className="drone-block">
        <div className="camera-view">
          <div className="camera-view-text">{`Drone ${droneNumber}`}</div>
          <video className="video" src={video} autoPlay muted />
        </div>
        <div className="icon-row">
          {icons.slice(0, 4).map((iconData, index) => (
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
                  border: getIconValue(iconData.name).highlight===1 ? '2px solid red' : 'none',
                  backgroundColor: getIconValue(iconData.name).highlight === 2 ? 'yellow' : 'none',
                }}
              ></div>
              <span className="icon-text">{getIconValue(iconData.name).value}</span>
            </div>
          ))}
        </div>
        <div className="icon-row">
          {icons.slice(4).map((iconData, index) => (
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
                  border: getIconValue(iconData.name).highlight===1 ? '2px solid red' : 'none',
                  backgroundColor: getIconValue(iconData.name).highlight === 2 ? 'yellow' : 'none',
                }}
              ></div>
              <span className="icon-text">{getIconValue(iconData.name).value}</span>
            </div>
          ))}
        </div>
      </div>
    );
}  
  
export default DroneBlock;