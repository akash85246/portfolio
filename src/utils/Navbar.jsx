import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "Home",
    "About",
    "Project",
    "Skill",
    "Certificate",
    "Activity",
    "Contact",
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/10 backdrop-blur-xs  border-b-[1px] border-white/40  text-white p-4 font-inter">
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="#home"
          className="font-semibold text-xl md:text-3xl leading-none tracking-normal"
        >
          Akash Rajput
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex space-x-5 !text-xs !lg:text-sm uppercase font-light">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:underline  text-lg leading-[100%] tracking-[0] uppercase"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <a
            href="https://akash85246.github.io/Resume/"
            target="_blank"
            className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#E9B0FF] to-[#4D84FA] hover:opacity-80 transition duration-300 uppercase  text-xl md:text-3xl font-semibold"
          >
            Resume
          </a>

          {/* Burger Menu - Mobile Only */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Nav - Excludes Resume */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/90  space-y-4 !text-xs !lg:text-sm uppercase font-light z-40">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-gray-600  px-4 py-4 text-center hover:bg-gray-700 transition"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
