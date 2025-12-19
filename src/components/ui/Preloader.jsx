import React, { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Configuration
  const LOAD_DURATION = 2500; // Time to reach 100% (ms)
  const EXIT_DURATION = 800;  // Time for slide-up animation (ms)

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      // Calculate 0 to 100 based on time elapsed
      const nextProgress = Math.min((elapsed / LOAD_DURATION) * 100, 100);
      
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Animation Complete: Wait a moment, then exit
        setTimeout(() => {
          setIsExiting(true);
          // Actual unmount after the CSS transition finishes
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
    <div className={`preloader-container ${isExiting ? "fade-out" : ""}`}>
      
      {/* BACKGROUND RAYS (Optional, kept for style) */}
      <div className="rays-container">
        <div className="rays"></div>
      </div>

      <div className="content-wrapper">
        <div className="text-section">
          <p className="welcome-text">WELCOME TO</p>
          <h1 className="brand-text">
            TENTWENTY FARMS
          </h1>
        </div>

        {/* PROGRESS SECTION */}
        <div className="progress-container">

          <svg 
            className="progress-svg" 
            viewBox="0 0 400 60" 
            preserveAspectRatio="none"
          >
            {/* Background Track (Faint Line) */}
            <path 
              d="M 10,30 Q 100,10 200,30 T 390,30" 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="2" 
            />

            {/* Active Progress Line */}
            <path 
              d="M 10,30 Q 100,10 200,30 T 390,30" 
              fill="none" 
              stroke="white" 
              strokeWidth="2"
              pathLength="100" 
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              strokeLinecap="round"
            />
          </svg>

          {/* Percentage Text */}
          <div className="progress-text">
            {Math.round(progress)}%
          </div>
        </div>

      </div>

      <style>{`
        .preloader-container {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100vh;
          background-color: #111;
          z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          color: #e0e0e0;
          transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1);
        }
        
        .preloader-container.fade-out {
          transform: translateY(-100%);
        }

        /* TYPOGRAPHY */
        .text-section { text-align: center; margin-bottom: 40px; }
        
        .welcome-text {
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 14px; letter-spacing: 4px; font-weight: 300;
          margin-bottom: 10px; opacity: 0;
          animation: fadeIn 1s ease forwards 0.2s;
        }

        .brand-text {
          font-family: 'Didot', 'Times New Roman', serif;
          font-size: 48px; font-weight: 300; letter-spacing: -1px; margin: 0;
          opacity: 0;
          animation: scaleUpFade 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards 0.5s;
        }

        .special-a { font-style: italic; margin-left: -2px; }
        .spacer { width: 10px; }

        /* PROGRESS BAR AREA */
        .progress-container {
          position: relative;
          width: 300px;
          height: 60px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }

        .progress-svg {
          width: 100%;
          height: 100%;
          overflow: visible; /* Allows line caps to show */
        }

        .progress-text {
          position: absolute;
          top: 100%; /* Below the line */
          margin-top: 10px;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          color: #888;
        }

        /* KEYFRAMES */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUpFade {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* RAYS BACKGROUND */
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

        /* CONTENT WRAPPER */
        .content-wrapper { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; }

        @media (max-width: 768px) {
          .brand-text { font-size: 32px; }
          .progress-container { width: 240px; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;