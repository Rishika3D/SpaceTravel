import React from 'react'
import { useState, useEffect } from 'react'

const mouse = () => {
    const [x, setX]= useState(window.innerWidth);
    const [y, setY]= useState(window.innerHeight);

    useEffect(()=>{
        const handleMouseMove=(e)=>{
            setX(e.clientX);
            setY(e.clientY);

            window.addEventListener("mouseover", handleMouseMove);

            return ()=> window.removeEventListener("mouseover", handleMouseMove)
        }
    },[])
    const long = ((x / window.innerWidth) * 360 - 180).toFixed(2); 
  const lat = (90 - (y / window.innerHeight) * 180).toFixed(2);
  return (
    <div>
        <p>LAT: {long}°</p>
        <p>LON: {lat}°</p>
    </div>
  )
}

export default mouse