import React, { useState, useRef, useEffect } from "react";

const products = [
  {
    id: 0,
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
    title: "Flora Delight",
    subtitle: "Started in 2017",
    desc: "There's always something happening at Flower Exchange! New products.",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    title: "Sunny Harvest",
    subtitle: "Started in 2015",
    desc: "Fresh from the fields of Tuscany, bringing sunshine to your home.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
    title: "Zen Garden",
    subtitle: "Started in 2019",
    desc: "Traditional Japanese care for the most delicate bonsai arrangements.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    title: "Valley Roses",
    subtitle: "Started in 2012",
    desc: "Award winning roses grown in the nutrient rich soils of Napa.",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
    title: "Dutch Tulip",
    subtitle: "Started in 2010",
    desc: "Importing the finest bulbs directly from trusted growers in Holland.",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    title: "Orchid Haven",
    subtitle: "Started in 2021",
    desc: "Exotic orchids cultivated with precision in our climate controlled greenhouses.",
  },
];

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null); // Ref to track cursor within this area

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);

  // --- CURSOR STATE ---
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // --- MOUSE EVENT HANDLERS ---

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    // 1. Update Custom Cursor Position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
      
      setCursorPos({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    }

    // 2. Handle Drag Logic
    if (!isDragging) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const diff = clientX - startX;
    
    // Resistance at edges
    if ((currentIndex === 0 && diff > 0) || (currentIndex === products.length - 1 && diff < 0)) {
        setDragX(diff * 0.3);
    } else {
        setDragX(diff);
    }
  };

  const handleMouseEnter = () => setShowCursor(true);
  const handleMouseLeave = () => {
    setShowCursor(false);
    handleMouseUp(); // Also stop dragging if we leave
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (dragX < -50) changeSlide(1);
    else if (dragX > 50) changeSlide(-1);
    setDragX(0);
  };

  const changeSlide = (direction) => {
    setCurrentIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next >= products.length) return products.length - 1;
      return next;
    });
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const dragOffset = isDragging ? dragX / 300 : 0;
    const position = diff + dragOffset;
    const absPosition = Math.abs(position);

    if (absPosition > 3) {
      return { opacity: 0, visibility: 'hidden', pointerEvents: 'none' };
    }

    const X_SPACING = 140; 
    const Y_DROP = 40;     
    const ROTATION = 15;   
    const SCALE_CENTER = 1;
    const SCALE_SIDE = 0.9;

    const translateX = position * X_SPACING;
    const translateY = absPosition * Y_DROP;
    let scale = SCALE_CENTER - (absPosition * (SCALE_CENTER - SCALE_SIDE));
    scale = Math.max(scale, SCALE_SIDE);
    const rotate = position * ROTATION;
    const zIndex = 10 - Math.round(absPosition);
    
    let opacity = 1;
    if (absPosition > 2) {
      opacity = 1 - ((absPosition - 2)); 
      if (opacity < 0) opacity = 0;
    }

    return {
      transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
      zIndex: zIndex,
      opacity: opacity,
      visibility: 'visible',
      transition: isDragging ? 'none' : 'transform 1.0s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.0s',
    };
  };

  return (
    <section className="products-section" ref={sectionRef}>
      
      <div className="text-content">
        <h2 className={`section-title ${isVisible ? "animate-scroll" : ""}`} style={{ animationDelay: '0ms' }}>
          Quality Products
        </h2>
        <p className={`section-desc ${isVisible ? "animate-scroll" : ""}`} style={{ animationDelay: '300ms' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div 
        className="carousel-container"
        ref={containerRef}
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown} 
        onTouchMove={handleMouseMove} 
        onTouchEnd={handleMouseUp}
      >
        {/* CUSTOM FLOATING CURSOR */}
        <div 
          className={`custom-cursor-follower ${showCursor ? "active" : ""} ${isDragging ? "grabbing" : ""}`}
          style={{ 
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` 
          }}
        >
          {/* Optional: Add text or icon inside cursor if desired */}
          <div className="cursor-circle">
             {/* Small arrows inside the circle */}
             <span className="arrow-left">&lt;</span>
             <span className="arrow-right">&gt;</span>
          </div>
        </div>

        <div className="cards-wrapper">
          {products.map((product, index) => (
            <div key={product.id} className="card-item" style={getCardStyle(index)}>
              <div className="image-holder">
                <img src={product.img} alt={product.title} />
                {/* REMOVED: The old center drag-cursor SVG is gone */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`info-display ${isVisible ? "visible" : ""}`} key={currentIndex}>
        <p className="client-subtitle animate-text" style={{ animationDelay: '0ms' }}>
          {products[currentIndex].subtitle}
        </p>
        <h3 className="client-name animate-text" style={{ animationDelay: '300ms' }}>
          {products[currentIndex].title}
        </h3>
        <p className="client-desc animate-text" style={{ animationDelay: '600ms' }}>
          {products[currentIndex].desc}
        </p>
      </div>

      <style>{`
        .products-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-color: #fcf7f2;
          padding: 100px 20px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          overflow: hidden;
          font-family: 'Helvetica Neue', sans-serif;
        }

        .text-content { text-align: center; max-width: 600px; margin-bottom: 60px; }
        .section-title { font-size: 42px; font-weight: 400; margin-bottom: 20px; opacity: 0; }
        .section-desc { font-size: 16px; color: #777; line-height: 1.6; opacity: 0; }
        .animate-scroll { animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        .carousel-container {
          position: relative; 
          width: 100%; max-width: 1000px; height: 500px;
          display: flex; justify-content: center; align-items: center; 
          cursor: none; /* Hide default mouse cursor */
          touch-action: pan-y; 
        }

        /* --- CUSTOM CURSOR STYLES --- */
        .custom-cursor-follower {
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 0; /* Wrapper has no size, circle does */
          pointer-events: none; /* Let clicks pass through */
          z-index: 100;
          opacity: 0;
          transition: opacity 0.2s ease;
          /* Important: We handle movement via inline style transform for performance */
        }
        .custom-cursor-follower.active { opacity: 1; }

        .cursor-circle {
          position: absolute;
          top: -40px; left: -40px; /* Center the 80px circle on the mouse point */
          width: 60px; height: 60px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(2px);
          border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          gap: 15px;
          color: #333;
          font-weight: 300;
          font-size: 18px;
          transition: transform 0.2s, background 0.2s;
        }

        /* Scale up slightly when dragging */
        .custom-cursor-follower.grabbing .cursor-circle {
          transform: scale(0.9);
          background: rgba(255, 255, 255, 0.6);
          border-color: rgba(0,0,0,0.4);
        }

        .cards-wrapper { position: relative; width: 320px; height: 450px; }
        .card-item {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          transform-origin: center center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          background: #fff;
          will-change: transform, opacity;
        }
        .image-holder { width: 100%; height: 100%; position: relative; }
        .image-holder img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }

        .info-display { text-align: center; margin-top: 50px; max-width: 400px; opacity: 0; transition: opacity 0.5s ease; }
        .info-display.visible { opacity: 1; }
        .animate-text { opacity: 0; animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        
        .client-subtitle { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin-bottom: 5px; }
        .client-name { font-size: 32px; font-weight: 400; margin-bottom: 15px; color: #111; }
        .client-desc { font-size: 15px; color: #666; line-height: 1.5; }

        @media (max-width: 768px) {
          .section-title { font-size: 32px; }
          .cards-wrapper { width: 260px; height: 380px; }
          /* On mobile, usually better to restore default cursor */
          .carousel-container { cursor: auto; }
          .custom-cursor-follower { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Products;