import React, { useState } from 'react';
import DroneMonitor from './components/DroneMonitor';
import './App.css';

function App() {

  const [currentScene, setCurrentScene] = useState(1);

  console.log(currentScene)

  const handleNextScene = () => {
    setCurrentScene((prevScene) => prevScene + 1);
  };

  const handlePrevScene = () => {
    if (currentScene > 1) {
      setCurrentScene((prevScene) => prevScene - 1);
    }
  };  

  return (
    <div className="App">
      <div className="app_container">
        <DroneMonitor currentScene={currentScene} />
        <div className="button-container">
          <button onClick={handlePrevScene}>Previous Scene</button>
          <button onClick={handleNextScene}>Next Scene</button>
        </div>
      </div>
    </div>
  );
}

export default App;