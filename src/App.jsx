import React from 'react';
import StarfieldBackground from './components/organisms/StarfieldBackground';
import RotatingOrbit from './components/organisms/RotatingOrbit';
import './App.css';
import HeroText from './components/molecules/text';
import RightText from './components/molecules/RightText';

function App() {
  return (
    <div className="app-container">
      {/* Background and Orbit Scene */}
      <StarfieldBackground>
        <RotatingOrbit />
      </StarfieldBackground>
      <HeroText />
      <RightText />


    
        
      </div>

  );
}

export default App;
