"use client"

import React from 'react'
import { useState, useEffect } from 'react'

const Clock = () => {
  const[time, setTime] = useState(new Date());
  const[running, setRunning] = useState(true);
  
  useEffect(() => {
    if(!running) return;
    const interval = setInterval(() => {
      setTime(new Date());
    },1000);

    return () => clearInterval(interval);
  }, [running]);
  
  return (
    <div>
      <p>{time.toLocaleString()}</p>
      <button onClick={() => setRunning(prev => !prev)}>
        {running ? "pause" : "start"}
      </button>
    </div>
  )
}

export default Clock