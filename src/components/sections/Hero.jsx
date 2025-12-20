import React, { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
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

  const btnBaseIndex = (activeIndex + 1) % images.length;
  const btnOverlayIndex = animatingIndex !== null ? (animatingIndex + 1) % images.length : null;
  const currentNum = String(activeIndex + 1).padStart(2, "0");
  const totalNum = String(images.length).padStart(2, "0");

  return (
    <div className="relative w-full h-screen bg-[#f4f4f4] overflow-hidden">
      
      {/* Hero Text */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 z-10 text-[#EEF4F9] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] pointer-events-none max-md:left-5 max-md:w-[90%]">
        <h4 className="text-[16px] max-md:text-[12px] mb-4 font-normal font-sans ">
          Welcome To TenTwenty Farms
        </h4>
        <h1 className="text-[64px] max-md:text-[40px] leading-none font-normal m-0 font-sans">
          From Our Farms
          <br />
          To Your Hands
        </h1>
      </div>

      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={images[activeIndex]}
          alt="Active"
          className="absolute inset-0 w-full h-full object-cover z-1 scale-[1.15]"
        />
        {animatingIndex !== null && (
          <img
            src={images[animatingIndex]}
            alt="Incoming"
            className="absolute inset-0 w-full h-full object-cover z-2 overlay-image"
            style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
          />
        )}
      </div>

      {/* Controls Container */}
      <div className="absolute bottom-15 left-[10%] flex items-center gap-7.5 z-20 max-md:bottom-10 max-md:left-5">
        
        {/* Next Button with Progress */}
        <button
          key={activeIndex}
          className="relative w-20 h-20 p-0 border-none bg-transparent cursor-pointer transition-transform duration-200 hover:scale-105 disabled:cursor-default"
          onClick={handleNext}
          disabled={animatingIndex !== null}
        >
          <div className="absolute inset-1.5 overflow-hidden">
            <img
              src={images[btnBaseIndex]}
              alt="Next Base"
              className="absolute inset-0 w-full h-full object-cover z-1"
            />
            {btnOverlayIndex !== null && (
              <img
                src={images[btnOverlayIndex]}
                alt="Next Overlay"
                className="absolute inset-0 w-full h-full object-cover z-2 overlay-image"
                style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
              />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-[14px] uppercase z-5">
              <span>Next</span>
            </div>
          </div>

          {/* SVG Progress Border */}
          <svg className="absolute inset-0 w-full h-full z-6 pointer-events-none drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]" viewBox="0 0 100 100">
            <path
              id="borderPath"
              d="M 50 2 L 98 2 L 98 98 L 2 98 L 2 2 L 50 2"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            <path
              d="M 50 2 L 98 2 L 98 98 L 2 98 L 2 2 L 50 2"
              className="progress-border-path"
              style={{ animationDuration: `${AUTOPLAY_DURATION}ms` }}
            />
          </svg>
        </button>

        {/* Page Indicator */}
        <div className="flex items-center text-white text-[18px] font-light tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          <div className="h-5.5 overflow-hidden relative inline-block">
            <span key={currentNum} className="block animate-up">
              {currentNum}
            </span>
          </div>
          <div className="w-10 h-px bg-white/60 mx-3.5"></div>
          <span className="opacity-70">{totalNum}</span>
        </div>
      </div>

      <style>{`
        .overlay-image { 
          animation: wipeAndZoomIn cubic-bezier(0.65, 0, 0.35, 1) forwards; 
        }

        @keyframes wipeAndZoomIn { 
          from { clip-path: inset(50% 0 50% 0); transform: scale(1); } 
          to { clip-path: inset(0 0 0 0); transform: scale(1.15); } 
        }

        .progress-border-path { 
          fill: none; 
          stroke: #ffffff; 
          stroke-width: 3; 
          stroke-linecap: square; 
          stroke-dasharray: 400; 
          stroke-dashoffset: 400; 
          animation: fillPath linear forwards; 
        }

        @keyframes fillPath { 
          from { stroke-dashoffset: 400; } 
          to { stroke-dashoffset: 0; } 
        }

        .animate-up { 
          animation: slideUpNum 0.5s cubic-bezier(0.16, 1, 0.3, 1); 
        }

        @keyframes slideUpNum { 
          from { transform: translateY(100%); opacity: 0; } 
          to { transform: translateY(0); opacity: 1; } 
        }
      `}</style>
    </div>
  );
};

export default Hero;