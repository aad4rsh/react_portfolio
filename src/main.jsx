import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RotatingOrbit from './components/organisms/RotatingOrbit.jsx'
import StarfieldBackground from './components/organisms/StarfieldBackground.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StarfieldBackground>
      <RotatingOrbit />
    </StarfieldBackground>
  </StrictMode>
)
