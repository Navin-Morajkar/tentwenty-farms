import React, { useState, useEffect } from "react";

// --- DATA ---
const images = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80",
];

const menuItems = ["About", "News", "Services", "Our Team", "Make Enquiry"];

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* DESKTOP: Links Left / MOBILE: Hidden (Contact moves here) */}
        <div className="nav-left">
          <ul className="desktop-menu">
            {menuItems.map((item) => (
              <li key={item}><a href={`#${item}`}>{item}</a></li>
            ))}
          </ul>
          
          {/* Mobile Contact Button */}
          <button className="contact-btn mobile-only">
            Contact us <span className="arrow">→</span>
          </button>
        </div>

        {/* DESKTOP: Contact Right / MOBILE: Hamburger Right */}
        <div className="nav-right">
          {/* Desktop Contact Button */}
          <button className="contact-btn desktop-only">
            Contact us <span className="arrow">→</span>
          </button>

          {/* Mobile Hamburger */}
          <button 
            className="hamburger mobile-only" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`line ${isOpen ? "open" : ""}`} />
            <div className={`line ${isOpen ? "open" : ""}`} />
            <div className={`line ${isOpen ? "open" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <ul>
          {menuItems.map((item) => (
            <li key={item}><a href={`#${item}`}>{item}</a></li>
          ))}
        </ul>
      </div>

      <style>{`
        /* 
           NAVBAR POSITIONING 
           Floating style with margins as seen in the reference 
        */
        .navbar {
          position: absolute;
          top: 20px; 
          left: 20px;
          right: 20px;
          height: 80px;
          background-color: white;
          z-index: 100;
          display: flex;
          align-items: center;
          /* Optional: subtle shadow for the floating effect */
          /* box-shadow: 0 5px 20px rgba(0,0,0,0.05); */
        }

        .nav-container {
          width: 100%;
          height: 100%;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-left {
          display: flex;
          align-items: center;
        }

        /* --- DESKTOP MENU --- */
        .desktop-menu {
          display: flex;
          gap: 30px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .desktop-menu a {
          text-decoration: none;
          color: #333;
          text-transform: capitalize; /* "About", "News" etc. */
          font-size: 14px;
          letter-spacing: 0.5px;
          font-weight: 400;
          transition: color 0.2s;
        }

        .desktop-menu a:hover {
          color: #888;
        }

        /* --- CONTACT BUTTON --- */
        .contact-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1px solid #ccc;
          padding: 12px 28px;
          font-size: 14px;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #333;
          white-space: nowrap;
        }

        .contact-btn:hover {
          background: #333;
          color: white;
          border-color: #333;
        }

        .arrow {
          font-size: 18px;
          line-height: 1;
          font-weight: 300;
        }

        /* --- HAMBURGER --- */
        .hamburger {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 5px;
        }

        .line {
          width: 24px;
          height: 2px;
          background-color: #333;
          transition: transform 0.3s, opacity 0.3s;
        }

        .line.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .line.open:nth-child(2) { opacity: 0; }
        .line.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        /* --- MOBILE MENU OVERLAY --- */
        .mobile-menu {
          position: absolute;
          top: 100%; /* Push it below the navbar */
          left: 0;
          width: 100%;
          background: white;
          padding: 20px 0;
          border-top: 1px solid #f0f0f0;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          z-index: -1; /* Behind the navbar itself if overlapping */
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu ul {
          list-style: none;
          padding: 0;
          text-align: center;
          margin: 0;
        }

        .mobile-menu li { margin: 15px 0; }
        .mobile-menu a {
          text-decoration: none;
          color: #333;
          font-size: 16px;
        }

        /* --- RESPONSIVE LOGIC --- */
        .mobile-only { display: none; }
        
        @media (max-width: 900px) {
          /* On mobile, we might want to stick to the top or keep floating. 
             Keeping floating but reducing margin for space. */
          .navbar {
            top: 20px; left: 20px; right: 20px;
            height: 70px;
          }
          .nav-container { padding: 0 20px; }
          
          .desktop-menu { display: none; }
          .desktop-only { display: none; }
          .mobile-only { display: flex; } /* Show Hamburger & Left Contact Btn */
        }
      `}</style>
    </nav>
  );
};

// --- HERO CAROUSEL COMPONENT ---
const Carousel = () => {
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
  const btnOverlayIndex = animatingIndex !== null 
    ? (animatingIndex + 1) % images.length 
    : null;

  const formatNumber = (num) => String(num).padStart(2, '0');
  const currentNum = formatNumber(activeIndex + 1);
  const totalNum = formatNumber(images.length);

  return (
    <div className="hero-section">
      
      {/* 1. Navbar Overlay */}
      <Navbar />

      {/* 2. Hero Text Overlay */}
      <div className="hero-text-container">
        <h4 className="subtitle">Welcome To TenTwenty Farms</h4>
        <h1 className="title">From Our Farms<br />To Your Hands</h1>
      </div>

      {/* 3. Carousel Images */}
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

      {/* 4. Controls (Bottom Left) */}
      <div className="controls-container">
        
        {/* Next Button */}
        <button
          key={activeIndex} 
          className="next-button-container"
          onClick={handleNext}
          disabled={animatingIndex !== null}
        >
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
            <div className="next-text-overlay"><span>Next</span></div>
          </div>

          <svg className="progress-svg" viewBox="0 0 100 100">
            <defs>
              <path id="borderPath" d="M 50 2 L 98 2 L 98 98 L 2 98 L 2 2 L 50 2" />
            </defs>
            <use href="#borderPath" className="static-border-path" />
            <use 
              href="#borderPath" 
              className="progress-border-path" 
              style={{ animationDuration: `${AUTOPLAY_DURATION}ms` }}
            />
          </svg>
        </button>

        {/* Page Indicator */}
        <div className="page-indicator">
          <div className="number-wrapper">
            <span key={currentNum} className="current-num animate-up">{currentNum}</span>
          </div>
          <div className="indicator-line"></div>
          <span className="total-num">{totalNum}</span>
        </div>

      </div>

      <style>{`
        /* --- MAIN LAYOUT --- */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh; /* Full viewport height */
          background-color: #f4f4f4;
          overflow: hidden;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        /* --- HERO TEXT --- */
        .hero-text-container {
          position: absolute;
          top: 50%;
          left: 10%; /* Starts 10% from left */
          transform: translateY(-50%);
          z-index: 10;
          color: white;
          /* Subtle text shadow for readability over images */
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          pointer-events: none; 
          max-width: 80%;
        }

        .subtitle {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 16px;
          font-weight: 400;
        }

        .title {
          font-size: 64px;
          line-height: 1.1;
          font-weight: 300;
          margin: 0;
        }

        /* --- CAROUSEL IMAGES --- */
        .carousel-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .carousel-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .base-image { z-index: 1; transform: scale(1.15); }
        .overlay-image {
          z-index: 2;
          animation-name: wipeAndZoomIn;
          animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
          animation-fill-mode: forwards;
        }

        @keyframes wipeAndZoomIn {
          from { clip-path: inset(50% 0 50% 0); transform: scale(1); }
          to { clip-path: inset(0 0 0 0); transform: scale(1.15); }
        }

        /* --- CONTROLS (Button + Indicator) --- */
        .controls-container {
          position: absolute;
          bottom: 60px;
          left: 10%; /* Matches hero text alignment */
          display: flex;
          align-items: center;
          gap: 30px;
          z-index: 20;
        }

        .next-button-container {
          position: relative;
          width: 80px; 
          height: 80px;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .next-button-container:hover { transform: scale(1.05); }

        .next-image-content {
          position: absolute;
          top: 6px; left: 6px;   
          width: calc(100% - 12px); height: calc(100% - 12px);
          overflow: hidden; 
        }

        .next-thumbnail {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }

        .next-text-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.3);
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: bold; font-size: 14px;
          text-transform: uppercase; z-index: 5;
        }

        .progress-svg {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 6; pointer-events: none;
          filter: drop-shadow(0 0 2px rgba(0,0,0,0.5));
        }

        .static-border-path { fill: none; stroke: rgba(255, 255, 255, 0.3); stroke-width: 1; }
        .progress-border-path {
          fill: none; stroke: #ffffff; stroke-width: 3; 
          stroke-linecap: square; stroke-dasharray: 400; stroke-dashoffset: 400; 
          animation-name: fillPath; animation-timing-function: linear; animation-fill-mode: forwards;
        }
        @keyframes fillPath { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }

        /* --- PAGE INDICATOR --- */
        .page-indicator {
          display: flex;
          align-items: center;
          color: white;
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 1px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .indicator-line {
          width: 40px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.6);
          margin: 0 15px;
        }

        .total-num { opacity: 0.7; }
        .number-wrapper { height: 22px; overflow: hidden; position: relative; display: inline-block; }
        .current-num { display: block; }
        .animate-up { animation: slideUpNum 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUpNum {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* --- RESPONSIVE TYPOGRAPHY --- */
        @media (max-width: 768px) {
          .title { font-size: 40px; }
          .subtitle { font-size: 12px; }
          
          /* Adjust layout for smaller screens */
          .hero-text-container { left: 20px; width: 90%; }
          .controls-container { bottom: 40px; left: 20px; }
        }
      `}</style>
    </div>
  );
};

export default Carousel;