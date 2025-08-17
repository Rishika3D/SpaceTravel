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

  // Normalized 0..1 with 4 decimals to mirror the screenshot feel
  const nx = (x / w).toFixed(4);
  const ny = (y / h).toFixed(4);

  return (
    <div
      className="flex items-center gap-3 font-mono select-none"
      style={{
        color: "rgba(255,255,255,0.9)",   // soft white
        fontSize: "11px",                 // small & compact
        letterSpacing: "0.6px",           // light tracking like UI HUD
        lineHeight: 1.1,
        pointerEvents: "none",
        // optional: very soft baseline dots impression
        // textDecoration: "underline dotted rgba(255,255,255,0.08)",
        // textUnderlineOffset: "6px",
      }}
    >
      <span>X.</span>
      <span>{nx}</span>
      <span style={{ opacity: 0.6 }}>//</span>
      <span>Y.</span>
      <span>{ny}</span>
    </div>
  );
};

export default Mouse;
