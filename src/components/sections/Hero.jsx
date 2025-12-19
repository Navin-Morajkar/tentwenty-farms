import { useEffect, useState } from "react";
import { heroSlides } from "../../constants/heroSlides";

const AUTO_PLAY_INTERVAL = 3000;

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = heroSlides[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={currentSlide.image}
        alt={currentSlide.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 h-full">
        <div className="mx-auto max-w-7xl px-6 h-full flex flex-col justify-center">
          <p className="text-sm text-white mb-4">{currentSlide.subtitle}</p>

          <h1 className="text-white text-4xl md:text-6xl leading-tight whitespace-pre-line">
            {currentSlide.title}
          </h1>
        </div>
      </div>

      {/* NEXT BUTTON (bottom-left) */}
      <div className="absolute bottom-10 left-6 md:left-16 z-20">
        <button
          onClick={handleNext}
          className="flex items-center gap-4 text-white text-sm">
          <span className="border border-white px-6 py-4">Next</span>
        </button>
      </div>
    </section>
  );
}
