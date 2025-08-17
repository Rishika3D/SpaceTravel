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

  // Convert screen coords to lat/lon style
  const long = ((x / window.innerWidth) * 360 - 180).toFixed(2);
  const lat = (90 - (y / window.innerHeight) * 180).toFixed(2);

  return (
    <div
      className="flex gap-4 text-sm font-mono"
      style={{
        fontFamily: "'Orbitron', sans-serif", // space-themed font
        color: "#00ffea", // neon cyan for sci-fi vibe
        textShadow: "0 0 4px #00ffea, 0 0 8px #00ffea", // subtle glow
        letterSpacing: "0.5px",
      }}
    >
      <p>LAT: {lat}°</p>
      <p>LON: {long}°</p>
    </div>
  );
};

export default Mouse;
