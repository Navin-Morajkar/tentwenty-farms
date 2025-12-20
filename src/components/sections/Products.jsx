import { useState, useRef, useEffect } from "react";
import { products } from "../../constants/products";

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
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
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
      setCursorPos({ x: clientX - rect.left, y: clientY - rect.top });
    }
    if (!isDragging) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const diff = clientX - startX;
    setDragX(
      (currentIndex === 0 && diff > 0) ||
        (currentIndex === products.length - 1 && diff < 0)
        ? diff * 0.3
        : diff
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (dragX < -50) changeSlide(1);
    else if (dragX > 50) changeSlide(-1);
    setDragX(0);
  };

  const changeSlide = (direction) => {
    setCurrentIndex((prev) =>
      Math.max(0, Math.min(products.length - 1, prev + direction))
    );
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const dragOffset = isDragging ? dragX / 300 : 0;
    const position = diff + dragOffset;
    const absPosition = Math.abs(position);

    if (absPosition > 3)
      return { opacity: 0, visibility: "hidden", pointerEvents: "none" };

    const X_SPACING = isMobile ? 125 : 140;
    const Y_DROP = isMobile ? 50 : 40;
    const ROTATION = 15;

    return {
      transform: `translateX(${position * X_SPACING}%) translateY(${
        absPosition * Y_DROP
      }px) scale(${Math.max(1 - absPosition * 0.1, 0.9)}) rotate(${
        position * ROTATION
      }deg)`,
      zIndex: 10 - Math.round(absPosition),
      opacity: absPosition > 2 ? Math.max(0, 1 - (absPosition - 2)) : 1,
      visibility: "visible",
      transition: isDragging
        ? "none"
        : "transform 1.0s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.0s",
    };
  };

  return (
    <section
      className="relative w-full min-h-screen bg-[#fcf7f2] py-[100px] px-5 flex flex-col items-center justify-center overflow-hidden font-sans"
      ref={sectionRef}>
      <div className="text-center max-w-[600px] mb-[60px]">
        <h2
          className={`text-[42px] max-md:text-[32px] font-normal mb-5 opacity-0 ${
            isVisible ? "animate-scroll" : ""
          }`}>
          Quality Products
        </h2>
        <p
          className={`text-base text-[#777] leading-relaxed opacity-0 ${
            isVisible ? "animate-scroll" : ""
          }`}
          style={{ animationDelay: "300ms" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div
        className="relative w-full max-w-250 h-125 flex justify-center items-center cursor-none max-md:cursor-auto touch-pan-y"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setShowCursor(true)}
        onMouseLeave={() => {
          setShowCursor(false);
          handleMouseUp();
        }}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}>
        {/* CUSTOM CURSOR */}
        <div
          className={`absolute top-0 left-0 w-0 h-0 pointer-events-none z-[100] transition-opacity duration-200 max-md:hidden ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
          }}>
          <div
            className={`absolute -top-10 -left-10 w-[60px] h-[60px] border border-black/20 bg-white/30 backdrop-blur-[2px] rounded-full flex justify-center items-center gap-[15px] text-[#333] font-light text-[18px] transition-[transform,background] duration-200 ${
              isDragging ? "scale-90 bg-white/60 border-black/40" : ""
            }`}>
            <span>&lt;</span>
            <span>&gt;</span>
          </div>
        </div>

        <div className="relative w-[320px] h-[450px] max-md:w-[210px] max-md:h-[300px]">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="absolute inset-0 origin-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white will-change-[transform,opacity]"
              style={getCardStyle(index)}>
              <div className="w-full h-full relative">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`info-container ${isVisible ? "visible" : ""}`}
        key={currentIndex}>
        <p className="product-subtitle">{products[currentIndex].subtitle}</p>
        <h3 className="product-title font-sans">
          {products[currentIndex].title}
        </h3>
        <p className="product-desc">{products[currentIndex].desc}</p>
      </div>

      <style>{`
        .animate-scroll, .animate-text {
          animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .info-container {
          text-align: center;
          margin-top: 50px;
          max-width: 400px;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .info-container.visible {
          opacity: 1;
        }
        
        .product-subtitle {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #555;
          margin-bottom: 5px;
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 0.1s;
        }

        .product-title {
          font-size: 32px;
          font-weight: 400;
          margin-bottom: 15px;
          color: #111;
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 0.3s;
        }

        .product-desc {
          font-size: 15px;
          color: #666;
          line-height: 1.5;
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 0.5s;
        }
        .animate-scroll { 
          animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
        }
      `}</style>
    </section>
  );
};

export default Products;
