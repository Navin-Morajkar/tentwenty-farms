import React, { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const LOAD_DURATION = 2500; // Adjusted for testing, you can change back to 100000
  const EXIT_DURATION = 800;

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const nextProgress = Math.min((elapsed / LOAD_DURATION) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, EXIT_DURATION);
        }, 200);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 w-full h-screen bg-[#111] z-9999 flex flex-col items-center justify-center text-[#e0e0e0] transition-transform duration-800 ease-[cubic-bezier(0.7,0,0.3,1)] ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      
      {/* BACKGROUND RAYS */}
      <div className="rays-container">
        <div className="rays"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-10">
          <p className="welcome-text font-sans text-[14px] tracking-[4px] font-light mb-2.5">
            WELCOME TO
          </p>
          <h1 className="brand-text font-sans text-[32px] md:text-[48px] font-light tracking-[-1px] m-0">
            TENTWENTY FARMS
          </h1>
        </div>

        {/* PROGRESS SECTION */}
        <div className="relative w-60 md:w-75 h-15 flex flex-col items-center justify-center">
          <svg 
            className="w-full h-full overflow-visible" 
            viewBox="0 0 400 60" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 10,30 Q 100,10 200,30 T 390,30" 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="2" 
            />

            <path 
              d="M 10,30 Q 100,10 200,30 T 390,30" 
              fill="none" 
              stroke="white" 
              strokeWidth="2"
              pathLength="100" 
              strokeDasharray="100"
              style={{ strokeDashoffset: 100 - progress }}
              strokeLinecap="round"
            />
          </svg>

          {/* Percentage Text */}
          <div className="absolute top-full mt-2.5 text-xs text-gray-400 tracking-[1px] font-sans">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      <style>{`
        .welcome-text {
          opacity: 0;
          animation: fadeIn 1s ease forwards 0.2s;
        }

        .brand-text {
          opacity: 0;
          animation: scaleUpFade 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards 0.5s;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUpFade {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .rays-container {
          position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          z-index: 0; opacity: 0.1; pointer-events: none;
          animation: rotateRays 60s linear infinite;
        }
        .rays {
          width: 100%; height: 100%;
          background: repeating-conic-gradient(from 0deg, transparent 0deg, transparent 2deg, rgba(255, 255, 255, 0.5) 2.5deg, transparent 3deg);
          mask-image: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%);
        }
        @keyframes rotateRays { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Preloader;