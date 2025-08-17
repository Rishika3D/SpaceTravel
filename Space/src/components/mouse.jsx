import React, { useState, useEffect } from "react";

const Mouse = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onMove = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const w = typeof window !== "undefined" ? window.innerWidth : 1;
  const h = typeof window !== "undefined" ? window.innerHeight : 1;

  // Map mouse to geographic degrees
  // Lon: -180..180 (left -> -180, right -> +180)
  // Lat:  +90..-90 (top -> +90, bottom -> -90)
  const lonDeg = ((x / w) * 360 - 180).toFixed(2);
  const latDeg = (90 - (y / h) * 180).toFixed(2);

  return (
    <div
      className="flex items-center gap-3 font-mono select-none"
      style={{
        color: "rgba(255,255,255,0.9)",
        fontSize: "11px",
        letterSpacing: "0.6px",
        lineHeight: 1.1,
        pointerEvents: "none",
      }}
    >
      <span>LAT.</span>
      <span>{latDeg}°</span>
      <span style={{ opacity: 0.6 }}>//</span>
      <span>LON.</span>
      <span>{lonDeg}°</span>
    </div>
  );
};

export default Mouse;
