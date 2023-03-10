import React, { useState, useEffect } from 'react';
import DroneDashBoard from './components/DroneDashBoard';
import DroneScreen from './components/DroneScreen';
import axios from 'axios';

const App = () => {
  const [droneStats, setDroneStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('data/data.json');
        const jsonData = await response.json();
        setDroneStats(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // console.log(droneStats)

  return (
    // <div>
    //   {data ? (
    //     <div className="flex">
    //       {/* <DroneDashBoard data={data} /> */}
    //       <DroneScreen/>
    //     </div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <div style={{ position:'relative',display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '1rem' }}>
      {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DroneDashBoard droneStats={droneStats} />
        )}
      </div> 
      <div style={{ position: 'relative', flex: 1 }}>
        <DroneScreen/>
      </div>
    </div>
  );
};

export default App;
