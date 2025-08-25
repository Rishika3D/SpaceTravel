import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    if (!tickerRef.current) return;

    const textWidth = tickerRef.current.scrollWidth / 2; // half since we duplicate

    gsap.to(tickerRef.current, {
      x: `-=${textWidth}`,
      duration: 15, // faster (adjust as needed)
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % textWidth}px`, // seamless wrap
      },
    });
  }, []);

  return (
    <div className="relative group perspective w-full h-screen">
      {/* Video Background */}
      <video
        src="background.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full rounded-2xl object-cover transform transition-transform duration-500 group-hover:rotate-x-6 group-hover:rotate-y-6"
      />

      {/* Shooting star overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shooting-star"></div>
        <div className="shooting-star delay-500"></div>
        <div className="shooting-star delay-1000"></div>
      </div>

      {/* Scrolling Text Ticker */}
      <div className="absolute top-[10vh] left-0 w-full overflow-hidden">
        <div
          ref={tickerRef}
          className="flex whitespace-nowrap text-[7vw] tracking-[1.2rem] text-white font-bold"
          style={{ fontFamily: "Orbitron, Nevera, sans-serif" }}
        >
          {/* Duplicate text for infinite loop */}
          <span className="px-[3vw]">Explore the cosmos</span>
          <span className="px-[3vw]">Explore the cosmos</span>
          <span className="px-[3vw]">Explore the cosmos</span>
          <span className="px-[3vw]">Explore the cosmos</span>
          <span className="px-[3vw]">Explore the cosmos</span>
          <span className="px-[3vw]">Explore the cosmos</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
