import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between bg-white px-6 py-4">
          <div className="flex items-center gap-8">
            <button className="md:hidden border border-black px-4 py-2 text-sm flex items-center gap-2">
              Contact us →
            </button>

            <ul className="hidden md:flex items-center gap-8 text-sm">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#news">News</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#team">Our Team</a>
              </li>
              <li>
                <a href="#enquiry">Make Enquiry</a>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex border border-black px-6 py-2 text-sm items-center gap-2">
              Contact us →
            </button>

            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu">
              <div className="space-y-1">
                <span className="block h-[2px] w-6 bg-black"></span>
                <span className="block h-[2px] w-6 bg-black"></span>
                <span className="block h-[2px] w-6 bg-black"></span>
              </div>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white px-6 py-4">
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#news">News</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#team">Our Team</a>
              </li>
              <li>
                <a href="#enquiry">Make Enquiry</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
