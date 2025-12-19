import React, { useState } from "react";

const menuItems = ["About", "News", "Services", "Our Team", "Make Enquiry"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* LEFT: Desktop Menu / Mobile Contact */}
          <div className="nav-left">
            <ul className="desktop-menu">
              {menuItems.map((item) => (
                <li key={item}>
                  <a href={`#${item}`}>{item}</a>
                </li>
              ))}
            </ul>

            <button className="contact-btn mobile-only">
              Contact us <span className="arrow">→</span>
            </button>
          </div>

          {/* RIGHT: Desktop Contact / Mobile Hamburger */}
          <div className="nav-right">
            <button className="contact-btn desktop-only">
              Contact us <span className="arrow">→</span>
            </button>

            <button
              className="hamburger mobile-only"
              onClick={() => setIsOpen(!isOpen)}>
              <div className={`line ${isOpen ? "open" : ""}`} />
              <div className={`line ${isOpen ? "open" : ""}`} />
              <div className={`line ${isOpen ? "open" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <ul>
            {menuItems.map((item) => (
              <li key={item}>
                <a href={`#${item}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <style>{`
        .navbar {
          position: absolute;
          top: 30px; 
          left: 30px;
          right: 30px;
          height: 80px;
          background-color: white;
          z-index: 100;
          display: flex;
          align-items: center;
        }

        .nav-container {
          width: 100%;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-left, .nav-right { display: flex; align-items: center; }

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
          text-transform: capitalize;
          font-size: 14px;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }

        .desktop-menu a:hover { color: #888; }

        .contact-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1px solid #ccc;
          padding: 12px 28px;
          font-size: 14px;
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

        .mobile-menu ul {
          list-style: none;
          padding: 0;
          text-align: center;
        }
        .mobile-menu li { margin: 15px 0; }
        .mobile-menu a { text-decoration: none; color: #333; font-size: 16px; }

        .mobile-only { display: none; }
        
        @media (max-width: 900px) {
          .navbar { top: 20px; left: 20px; right: 20px; height: 70px; }
          .nav-container { padding: 0 20px; }
          .desktop-menu, .desktop-only { display: none; }
          .mobile-only { display: flex; }
        }
      `}</style>
    </>
  );
};

export default Header;
