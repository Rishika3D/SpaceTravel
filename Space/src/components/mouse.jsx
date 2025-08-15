import React, { useState, useEffect } from "react";

const Mouse = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const long = ((x / window.innerWidth) * 360 - 180).toFixed(2);
  const lat = (90 - (y / window.innerHeight) * 180).toFixed(2);

  return (
    <div className="flex gap-4 text-sm font-mono">
      <p>LAT: {long}°</p>
      <p>LON: {lat}°</p>
    </div>
  );
};

export default Mouse;
