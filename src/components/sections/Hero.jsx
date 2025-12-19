// src/components/sections/Hero.jsx
import React, { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80",
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatingIndex, setAnimatingIndex] = useState(null);

  const ANIMATION_DURATION = 800;
  const AUTOPLAY_DURATION = 5000;

  const handleNext = () => {
    if (animatingIndex !== null) return;
    const nextIndex = (activeIndex + 1) % images.length;
    setAnimatingIndex(nextIndex);

    setTimeout(() => {
      setActiveIndex(nextIndex);
      setAnimatingIndex(null);
    }, ANIMATION_DURATION);
  };

  useEffect(() => {
    if (animatingIndex !== null) return;
    const timer = setTimeout(handleNext, AUTOPLAY_DURATION);
    return () => clearTimeout(timer);
  }, [activeIndex, animatingIndex]);

  // Derived Values
  const btnBaseIndex = (activeIndex + 1) % images.length;
  const btnOverlayIndex =
    animatingIndex !== null ? (animatingIndex + 1) % images.length : null;
  const currentNum = String(activeIndex + 1).padStart(2, "0");
  const totalNum = String(images.length).padStart(2, "0");

  return (
    <div className="hero-carousel">
      {/* Hero Text */}
      <div className="hero-text-container">
        <h4 className="subtitle">Welcome To TenTwenty Farms</h4>
        <h1 className="title">
          From Our Farms
          <br />
          To Your Hands
        </h1>
      </div>

      {/* Images */}
      <div className="carousel-wrapper">
        <img
          src={images[activeIndex]}
          alt="Active"
          className="carousel-image base-image"
        />
        {animatingIndex !== null && (
          <img
            src={images[animatingIndex]}
            alt="Incoming"
            className="carousel-image overlay-image"
            style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="controls-container">
        <button
          key={activeIndex}
          className="next-button-container"
          onClick={handleNext}
          disabled={animatingIndex !== null}>
          <div className="next-image-content">
            <img
              src={images[btnBaseIndex]}
              alt="Next Base"
              className="next-thumbnail base-image"
            />
            {btnOverlayIndex !== null && (
              <img
                src={images[btnOverlayIndex]}
                alt="Next Overlay"
                className="next-thumbnail overlay-image"
                style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
              />
            )}
            <div className="next-text-overlay">
              <span>Next</span>
            </div>
          </div>
          <svg className="progress-svg" viewBox="0 0 100 100">
            <defs>
              <path
                id="borderPath"
                d="M 50 2 L 98 2 L 98 98 L 2 98 L 2 2 L 50 2"
              />
            </defs>
            <use href="#borderPath" className="static-border-path" />
            <use
              href="#borderPath"
              className="progress-border-path"
              style={{ animationDuration: `${AUTOPLAY_DURATION}ms` }}
            />
          </svg>
        </button>
        <div className="page-indicator">
          <div className="number-wrapper">
            <span key={currentNum} className="current-num animate-up">
              {currentNum}
            </span>
          </div>
          <div className="indicator-line"></div>
          <span className="total-num">{totalNum}</span>
        </div>
      </div>

      <style>{`
        /* UPDATED: Position Relative allows it to sit in the flow, so Products sits below it */
        .hero-carousel {
          position: relative; 
          width: 100%;
          height: 100vh;
          background-color: #f4f4f4;
          overflow: hidden;
        }

        /* The rest of your existing CSS remains exactly the same... */
        .hero-text-container { position: absolute; top: 50%; left: 10%; transform: translateY(-50%); z-index: 10; color: white; text-shadow: 0 2px 10px rgba(0,0,0,0.3); pointer-events: none; }
        .subtitle { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; font-weight: 400; }
        .title { font-size: 64px; line-height: 1.1; font-weight: 300; margin: 0; }
        .carousel-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .carousel-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
        .base-image { z-index: 1; transform: scale(1.15); }
        .overlay-image { z-index: 2; animation-name: wipeAndZoomIn; animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); animation-fill-mode: forwards; }
        @keyframes wipeAndZoomIn { from { clip-path: inset(50% 0 50% 0); transform: scale(1); } to { clip-path: inset(0 0 0 0); transform: scale(1.15); } }
        .controls-container { position: absolute; bottom: 60px; left: 10%; display: flex; align-items: center; gap: 30px; z-index: 20; }
        .next-button-container { position: relative; width: 80px; height: 80px; padding: 0; border: none; background: transparent; cursor: pointer; transition: transform 0.2s ease; }
        .next-button-container:hover { transform: scale(1.05); }
        .next-image-content { position: absolute; top: 6px; left: 6px; width: calc(100% - 12px); height: calc(100% - 12px); overflow: hidden; }
        .next-thumbnail { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
        .next-text-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; text-transform: uppercase; z-index: 5; }
        .progress-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 6; pointer-events: none; filter: drop-shadow(0 0 2px rgba(0,0,0,0.5)); }
        .static-border-path { fill: none; stroke: rgba(255, 255, 255, 0.3); stroke-width: 1; }
        .progress-border-path { fill: none; stroke: #ffffff; stroke-width: 3; stroke-linecap: square; stroke-dasharray: 400; stroke-dashoffset: 400; animation-name: fillPath; animation-timing-function: linear; animation-fill-mode: forwards; }
        @keyframes fillPath { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
        .page-indicator { display: flex; align-items: center; color: white; font-size: 18px; font-weight: 300; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .indicator-line { width: 40px; height: 1px; background-color: rgba(255, 255, 255, 0.6); margin: 0 15px; }
        .total-num { opacity: 0.7; }
        .number-wrapper { height: 22px; overflow: hidden; position: relative; display: inline-block; }
        .current-num { display: block; }
        .animate-up { animation: slideUpNum 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUpNum { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @media (max-width: 768px) { .title { font-size: 40px; } .subtitle { font-size: 12px; } .hero-text-container { left: 20px; width: 90%; } .controls-container { bottom: 40px; left: 20px; } }
      `}</style>
    </div>
  );
};

export default Hero;
