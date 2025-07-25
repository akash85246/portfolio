import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

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
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-sm border-b border-b-gray-300 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <a href="#home" className="flex items-center space-x-2">
            <img src="/redLogo.svg" alt="Logo" className="w-6 h-6" />
            <span className="text-base font-bold whitespace-nowrap">
              Akash Rajput
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex space-x-5 !text-xs !lg:text-sm uppercase font-light">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="/resume.pdf"
            download
            className="flex items-center justify-center gap-1 px-3 py-1 transition !text-sm"
          >
            <DownloadIcon className="!w-4 !h-4" />
            Resume
          </a>

          {/* Burger Menu - Mobile Only */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
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
