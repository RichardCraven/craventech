import React, { useState, useRef } from 'react'
import './App.css';
import Papaya from "./components/papaya"
import SidePanel from "./components/side-panel"
import "./styles/main.scss"
import "./styles/layout.scss"

const App = () => {
  const attributes = ['designer', 'devops', 'architect', 'developer']
  const [papayaout, setPapaya] = useState(false)

  const [headerOnTop, setOnTop] = useState(true)
  const [headerToRight, setToRight] = useState(false)

  const toggleHeaderPosition = (under) => {
        if(under){
            setOnTop(false)
        } else { 
            setOnTop(true)
        }
  }
  const toggleHeaderRight = () => {
    setOnTop(true)
    setToRight(!headerToRight)
  }
  const togglePapaya = () => {
    console.log('toggling papaya', papayaout)
    setPapaya(!papayaout)
  }

  return (
    <div className="main-panel main-background">
      <h1 className="splash-header" 
      style={{
      zIndex: headerOnTop ? 1000 : 1000,
      right: headerToRight ? '20px' : 'calc(100% - 495px)'
      }}
      >Richard Craven
      </h1>
      <Papaya attributes={attributes} papayaout={papayaout}></Papaya>
      <SidePanel toggleHeaderToRight={toggleHeaderRight} togglePapaya={togglePapaya} toggleHeaderPosition={toggleHeaderPosition} portfolio={'123'}></SidePanel>
    </div>
  );
}

export default App;
