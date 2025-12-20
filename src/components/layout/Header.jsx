import { useState } from "react";

const menuItems = ["About", "News", "Services", "Our Team", "Make Enquiry"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-7.5 left-7.5 right-7.5 h-20 bg-white z-100 flex items-center max-[900px]:top-5 max-[900px]:left-5 max-[900px]:right-5 max-[900px]:h-17.5">
        <div className="w-full px-10 flex items-center justify-between max-[900px]:px-5">
          
          {/* LEFT: Desktop Menu / Mobile Contact */}
          <div className="flex items-center">
            <ul className="hidden min-[901px]:flex gap-7.5 m-0 p-0 list-none">
              {menuItems.map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    className="text-[#333] capitalize text-sm tracking-[0.5px] no-underline transition-colors duration-200 hover:text-[#888]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Contact Button */}
            <button className="flex min-[901px]:hidden items-center gap-3 bg-transparent border border-[#ccc] px-7 py-3 text-sm cursor-pointer transition-all duration-300 ease-in-out text-[#333] whitespace-nowrap hover:bg-[#333] hover:text-white hover:border-[#333]">
              Contact us <span className="text-lg">→</span>
            </button>
          </div>

          {/* RIGHT: Desktop Contact / Mobile Hamburger */}
          <div className="flex items-center">
            {/* Desktop Contact Button */}
            <button className="hidden min-[901px]:flex items-center gap-3 bg-transparent border border-[#ccc] px-7 py-3 text-sm cursor-pointer transition-all duration-300 ease-in-out text-[#333] whitespace-nowrap hover:bg-[#333] hover:text-white hover:border-[#333]">
              Contact us <span className="text-lg">→</span>
            </button>

            {/* Hamburger Button */}
            <button
              className="flex min-[901px]:hidden flex-col gap-1.5 p-1.25 bg-none border-none cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className={`line ${isOpen ? "open" : ""}`} />
              <div className={`line ${isOpen ? "open" : ""}`} />
              <div className={`line ${isOpen ? "open" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <ul className="list-none p-0 text-center">
            {menuItems.map((item) => (
              <li key={item} className="my-3.75">
                <a href={`#${item}`} className="no-underline text-[#333] text-base">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <style>{`
        .line {
          width: 24px;
          height: 2px;
          background-color: #333;
          transition: transform 0.3s, opacity 0.3s;
        }

        .line.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .line.open:nth-child(2) { opacity: 0; }
        .line.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: white;
          padding: 20px 0;
          border-top: 1px solid #f0f0f0;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          z-index: -1;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </>
  );
};

export default Header;