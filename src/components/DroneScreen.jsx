import React from 'react';
import birdview from '../assets/birdview_.mp4';
import drone1 from '../assets/drone1_.mp4';
import './DroneScreen.css';

const DroneScreen = () => {
  
    return (
      <div>
          <div className='video-container'>
            <video src={drone1} width="160" height="120" autoPlay loop muted type='video/mp4' style={{ position: 'relative', top:"10px"}}/>
              <div className="overlay-text-1">
                <p>Drone 1</p>
              </div>
          </div>
          <div className='video-container'>
            <video src={birdview} width="640" height="480" autoPlay loop muted type='video/mp4' style={{ position: 'relative', bottom:"-100px"}} />
              <div className="overlay-text-bv">
                <p>BirdView</p>
              </div>
          </div>

      </div>
    );
}  

export default DroneScreen;

