import React, { useState } from 'react';
import DroneMonitor from './components/DroneMonitor';
import './App.css';

function App() {
  const scenehighlightArray = [
    { scene: 1, highlight: 0 },
    { scene: 1, highlight: 1 },
    { scene: 1, highlight: 2 },
    { scene: 2, highlight: 0 },
    { scene: 2, highlight: 1 },
    { scene: 2, highlight: 2 }
    // Add more scene and highlight combinations as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextScene = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % scenehighlightArray.length);
  };

  const handlePrevScene = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0) ? scenehighlightArray.length - 1 : prevIndex - 1);
  };

  const currentSceneHighlight = scenehighlightArray[currentIndex];
  const key = `scene-${currentSceneHighlight.scene}-highlight-${currentSceneHighlight.highlight}`;

  return (
    <div className="App">
      <div className="app_container">
          <DroneMonitor key = {key} scene={currentSceneHighlight.scene} highlight={currentSceneHighlight.highlight} />
          <div className="content-wrapper">
          <h2>Current Scene: {currentIndex + 1}</h2>
            <div className="button-container">
              <button onClick={handlePrevScene}>Previous Scene</button>
              <button onClick={handleNextScene}>Next Scene</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;