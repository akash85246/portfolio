import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#DC143C] text-white py-6 px-4 mt-12 orbitron">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center md:text-left">
          &copy; {currentYear} Akash Rajput. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-4 text-white">
          <a
            href="https://github.com/akash85246"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/akash-rajput-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:akash.rajput.dev@gmail.com"
            className="hover:text-blue-400 transition"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;