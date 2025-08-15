// src/components/cosole.jsx
export default function Console() {
  // Flush frame + styling knobs
  const gap = 0;            // keep 0 to hug the window edges
  const rail = 22;          // thick border
  const radius = 1;         // outer corner rounding

  // Notch styling
  const notchW = 290;       // top/bottom width (left/right use as height)
  const notchD = 27;        // depth (length into page)
  const slope = 1.5;        // trapezium bevel factor

  // Accent tabs near the ends of top/bottom rails
  const tabW = 48;
  const tabH = 18;
  const color = "rgba(10,10,12,0.96)";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      {/* Outer subtle outline */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          border: "1px solid rgba(255,255,255,0.28)",
          filter: "drop-shadow(0 0 0.6px rgba(255,255,255,.35))",
          boxSizing: "border-box",
        }}
      />

      {/* Main thick frame */}
      <div
        className="absolute box-border"
        style={{
          inset: gap,
          border: `${rail}px solid ${color}`,
          borderRadius: radius,
        }}
      />

      {/* Decorative dot grid just under the frame (like the ref). Delete if not needed */}
      <DotGrid inset={gap} rail={rail} />

      {/* Top/Bottom small chamfered tabs (design accents) */}
      <RailTab side="top" inset={gap} rail={rail} w={tabW} h={tabH} color={color} />
      <RailTab side="bottom" inset={gap} rail={rail} w={tabW} h={tabH} color={color} />

      {/* Four centered longer notches */}
      <Notch side="top"    gap={gap} rail={rail} w={notchW} d={notchD} slope={slope} color={color} />
      <Notch side="bottom" gap={gap} rail={rail} w={notchW} d={notchD} slope={slope} color={color} />
      <Notch side="left"   gap={gap} rail={rail} w={notchW} d={notchD} slope={slope} color={color} />
      <Notch side="right"  gap={gap} rail={rail} w={notchW} d={notchD} slope={slope} color={color} />

      {/* Side gray line spines (dot caps, no arrows). Line is slightly shorter than the notch */}
      <SideSpine side="left"  rail={rail} notchD={notchD} />
      <SideSpine side="right" rail={rail} notchD={notchD} />

      {/* Corner ticks */}
      <Corner className="top-1 left-1" />
      <Corner className="top-1 right-1" right />
      <Corner className="bottom-1 left-1" bottom />
      <Corner className="bottom-1 right-1" right bottom />
    </div>
  );
}

/* Centered trapezium notch for each side */
function Notch({ side, gap, rail, w, d, slope = 0.9, color }) {
  const bevel = Math.max(6, rail * slope);

  if (side === "top") {
    return (
      <>
        {/* Main shape */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: gap,
            width: w,
            height: rail + d,
            background: color,
            clipPath: `polygon(0 0, 100% 0, calc(100% - ${bevel}px) 100%, ${bevel}px 100%)`,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        />
        {/* Inner highlight line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            top: gap,
            width: w,
            height: rail + 1,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            clipPath: `polygon(0 0, 100% 0, calc(100% - ${bevel}px) 100%, ${bevel}px 100%)`,
          }}
        />
      </>
    );
  }

  if (side === "bottom") {
    return (
      <>
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: gap,
            width: w,
            height: rail + d,
            background: color,
            clipPath: `polygon(${bevel}px 0, calc(100% - ${bevel}px) 0, 100% 100%, 0 100%)`,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: gap,
            width: w,
            height: rail + 1,
            borderBottom: "1px solid rgba(0,0,0,0.35)",
            clipPath: `polygon(${bevel}px 0, calc(100% - ${bevel}px) 0, 100% 100%, 0 100%)`,
          }}
        />
      </>
    );
  }

  if (side === "left") {
    return (
      <>
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: gap,
            width: rail + d,
            height: w,
            background: color,
            clipPath: `polygon(0 0, 100% ${bevel}px, 100% calc(100% - ${bevel}px), 0 100%)`,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: gap,
            width: rail + 1,
            height: w,
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            clipPath: `polygon(0 0, 100% ${bevel}px, 100% calc(100% - ${bevel}px), 0 100%)`,
          }}
        />
      </>
    );
  }

  // right
  return (
    <>
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          right: gap,
          width: rail + d,
          height: w,
          background: color,
          clipPath: `polygon(100% 0, 0 ${bevel}px, 0 calc(100% - ${bevel}px), 100% 100%)`,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          right: gap,
          width: rail + 1,
          height: w,
          borderRight: "1px solid rgba(0,0,0,0.35)",
          clipPath: `polygon(100% 0, 0 ${bevel}px, 0 calc(100% - ${bevel}px), 100% 100%)`,
        }}
      />
    </>
  );
}

/* Chamfered “tab” near the ends of the top/bottom rails */
function RailTab({ side, inset, rail, w, h, color }) {
  const offset = 90; // distance from each corner
  const chamfer = Math.max(8, rail * 0.8);

  if (side === "top") {
    return (
      <>
        <div
          className="absolute"
          style={{
            top: inset,
            left: offset,
            width: w,
            height: h,
            background: color,
            clipPath: `polygon(0 0, 100% 0, calc(100% - ${chamfer}px) 100%, 0 100%)`,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />
        <div
          className="absolute"
          style={{
            top: inset,
            right: offset,
            width: w,
            height: h,
            background: color,
            clipPath: `polygon(${chamfer}px 100%, 0 0, 100% 0, 100% 100%)`,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />
      </>
    );
  }

  // bottom tabs (mirror)
  return (
    <>
      <div
        className="absolute"
        style={{
          bottom: inset,
          left: offset,
          width: w,
          height: h,
          background: color,
          clipPath: `polygon(0 0, calc(100% - ${chamfer}px) 0, 100% 100%, 0 100%)`,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: inset,
          right: offset,
          width: w,
          height: h,
          background: color,
          clipPath: `polygon(${chamfer}px 0, 0 100%, 100% 100%, 100% 0)`,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
    </>
  );
}

/* Low-contrast dot grid under the rail for that UI texture */
function DotGrid({ inset, rail }) {
  const pad = inset + rail + 4; // slightly under the inner edge
  const dot = "radial-gradient(circle at center, rgba(255,255,255,0.16) 1px, transparent 1.5px)";
  return (
    <>
      {/* top band */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: pad,
          height: 50,
          backgroundImage: dot,
          backgroundSize: "14px 14px",
          opacity: 0.25,
        }}
      />
      {/* bottom band */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: pad,
          height: 50,
          backgroundImage: dot,
          backgroundSize: "14px 14px",
          opacity: 0.18,
        }}
      />
      {/* left band */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: pad,
          width: 50,
          backgroundImage: dot,
          backgroundSize: "14px 14px",
          opacity: 0.18,
        }}
      />
      {/* right band */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          right: pad,
          width: 50,
          backgroundImage: dot,
          backgroundSize: "14px 14px",
          opacity: 0.18,
        }}
      />
    </>
  );
}

/* Small L-shaped corner ticks */
function Corner({ className = "", right = false, bottom = false }) {
  const bar = "bg-white/85";
  return (
    <span className={`absolute w-[20px] h-[20px] ${className}`}>
      <span
        className={`absolute ${bar}`}
        style={{
          width: "14px",
          height: "2px",
          ...(right ? { right: 0 } : { left: 0 }),
          ...(bottom ? { bottom: 0 } : { top: 0 }),
        }}
      />
      <span
        className={`absolute ${bar}`}
        style={{
          width: "2px",
          height: "14px",
          ...(right ? { right: 0 } : { left: 0 }),
          ...(bottom ? { bottom: 0 } : { top: 0 }),
        }}
      />
    </span>
  );
}

/* Slim gray vertical line aligned to the side notch depth (slightly shorter)
   Rounded dot caps, NO arrows */
/* Slim gray vertical line aligned to the side notch depth (slightly shorter)
   Rounded dot caps, NO arrows, with vertical offset control */
   function SideSpine({ side = "left", rail = 22, notchD = 27 }) {
    const barOffset = Math.max(6, Math.round(rail * 1));   // distance from side edge inward
    const lineWidth = 2;                                   // gray line thickness
    const dotRadius = 3;                                   // dot cap radius
    const margin = -70;                                    // shorter than notch by this on both ends
  
    // Nudge the whole spine up/down (px). Positive moves DOWN.
    const offsetY = 12;
  
    // Line total length: a bit smaller than the notch depth
    const lineLength = Math.max(0, notchD - margin * 2);
    // Total container height includes dots + line + margins
    const containerHeight = lineLength + (dotRadius * 2) * 2 + (margin * 2);
  
    // Attach to requested side
    const attach = side === "left" ? { left: barOffset } : { right: barOffset };
  
    // Center the whole assembly on the side notch center
    const centerOffsetFromEdge = rail + notchD / 2;
  
    const gray = "rgba(200,200,200,0.28)";
    const grayShadow = "rgba(0,0,0,0.35)";
  
    return (
      <div
        className="absolute pointer-events-none"
        style={{
          ...attach,
          top: `calc(50% - ${centerOffsetFromEdge}px + ${notchD / 2 - containerHeight / 2}px + ${offsetY}px)`,
          height: containerHeight,
          width: Math.max(lineWidth, dotRadius * 2),
        }}
      >
        {/* Vertical gray line */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: margin + dotRadius * 2,
            height: lineLength,
            width: lineWidth,
            background: gray,
            borderRadius: lineWidth,
            boxShadow: `0 0 0.5px ${grayShadow} inset`,
          }}
        />
  
        {/* Top dot cap */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: margin,
            width: dotRadius * 2,
            height: dotRadius * 2,
            borderRadius: dotRadius,
            background: gray,
            boxShadow: `0 0 0.5px ${grayShadow} inset`,
          }}
        />
  
        {/* Bottom dot cap */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: margin,
            width: dotRadius * 2,
            height: dotRadius * 2,
            borderRadius: dotRadius,
            background: gray,
            boxShadow: `0 0 0.5px ${grayShadow} inset`,
          }}
        />
      </div>
    );
  }
  
