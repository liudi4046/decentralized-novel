import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {cameraUtils} from "./assets/hand_modules2/camera_utils";
import {drawingUtils} from "./assets/hand_modules2/drawing_utils";
import {hands as Hands2} from "./assets/hand_modules2/hands";
import {controlUtils} from "./assets/hand_modules2/control_utils";

cameraUtils();
drawingUtils();
controlUtils();
Hands2();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
