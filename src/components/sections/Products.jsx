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

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);

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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const diff = clientX - startX;

    // Resistance logic at edges
    if (
      (currentIndex === 0 && diff > 0) ||
      (currentIndex === products.length - 1 && diff < 0)
    ) {
      setDragX(diff * 0.3);
    } else {
      setDragX(diff);
    }
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
      return { opacity: 0, visibility: "hidden", pointerEvents: "none" };
    }

    const X_SPACING = 140;
    const Y_DROP = 40;
    const ROTATION = 15;
    const SCALE_CENTER = 1;
    const SCALE_SIDE = 0.9;

    const translateX = position * X_SPACING;
    const translateY = absPosition * Y_DROP;
    let scale = SCALE_CENTER - absPosition * (SCALE_CENTER - SCALE_SIDE);
    scale = Math.max(scale, SCALE_SIDE);
    const rotate = position * ROTATION;
    const zIndex = 10 - Math.round(absPosition);

    let opacity = 1;
    if (absPosition > 2) {
      opacity = 1 - (absPosition - 2);
      if (opacity < 0) opacity = 0;
    }

    return {
      transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
      zIndex: zIndex,
      opacity: opacity,
      visibility: "visible",
      transition: isDragging
        ? "none"
        : "transform 1.0s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.0s",
    };
  };

  return (
    <section className="products-section" ref={sectionRef}>
      <div className="text-content">
        <h2 className={`section-title ${isVisible ? "animate-title" : ""}`}>
          Quality Products
        </h2>
        <p className={`section-desc ${isVisible ? "animate-desc" : ""}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div
        className="carousel-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}>
        <div className="cards-wrapper">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="card-item"
              style={getCardStyle(index)}>
              <div className="image-holder">
                <img src={product.img} alt={product.title} />
                {index === currentIndex && (
                  <div
                    className={`drag-cursor ${isDragging ? "grabbing" : ""}`}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#25D366"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#25D366"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INFO DISPLAY */}
      {/* 
         We add key={currentIndex} here. 
         This forces React to re-mount the inner elements when the slide changes,
         triggering the CSS animation every time.
      */}
      <div
        className={`info-display ${isVisible ? "visible" : ""}`}
        key={currentIndex}>
        <p
          className="client-subtitle animate-text"
          style={{ animationDelay: "0ms" }}>
          {products[currentIndex].subtitle}
        </p>
        {/* Increased delay from 100ms to 300ms */}
        <h3
          className="client-name animate-text"
          style={{ animationDelay: "300ms" }}>
          {products[currentIndex].title}
        </h3>
        {/* Increased delay from 200ms to 600ms */}
        <p
          className="client-desc animate-text"
          style={{ animationDelay: "600ms" }}>
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
        .section-title { font-size: 42px; font-weight: 400; margin-bottom: 20px; opacity: 0; transform: translateY(20px); transition: all 0.8s ease; }
        .section-desc { font-size: 16px; color: #777; line-height: 1.6; opacity: 0; transform: translateY(20px); transition: all 0.8s ease 0.2s; }
        .animate-title, .animate-desc { opacity: 1; transform: translateY(0); }

        .carousel-container {
          position: relative; 
          width: 100%; max-width: 1000px; height: 500px;
          display: flex; justify-content: center; align-items: center; 
          cursor: grab;
          touch-action: pan-y; 
        }
        .carousel-container:active { cursor: grabbing; }

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

        .drag-cursor {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 60px; height: 60px; 
          background: rgba(255, 255, 255, 0.85); 
          backdrop-filter: blur(4px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1); 
          pointer-events: none;
          transition: transform 0.2s;
        }
        .drag-cursor.grabbing { transform: translate(-50%, -50%) scale(1.1); }

        /* --- INFO DISPLAY ANIMATION --- */
        .info-display { 
          text-align: center; 
          margin-top: 50px; 
          max-width: 400px; 
          /* We control visibility via the parent scroll observer, but inner animation via key */
          opacity: 0; 
          transition: opacity 0.5s ease;
        }
        .info-display.visible { opacity: 1; }
        
        /* The individual text elements start hidden and animate in */
        .animate-text {
    opacity: 0;
    /* Changed 0.6s to 1.2s for a slow, elegant rise */
    animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      /* Optional: Increase distance slightly for a longer "float" up */
      transform: translateY(30px); 
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
        
        .client-subtitle { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin-bottom: 5px; }
        .client-name { font-size: 32px; font-weight: 400; margin-bottom: 15px; color: #111; }
        .client-desc { font-size: 15px; color: #666; line-height: 1.5; }

        @media (max-width: 768px) {
          .section-title { font-size: 32px; }
          .cards-wrapper { width: 260px; height: 380px; }
        }
      `}</style>
    </section>
  );
};

export default Products;
