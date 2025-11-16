import React from "react";
import { Linkedin, Mail } from "lucide-react";

import github from "../assets/Icons/github.svg";
import Contact from "./Contact";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="grid grid-cols-2 px-10  py-6  text-white font-inter bg-[#121212]/60 backdrop-blur-md shadow-lg   ">
        <div className="p-4 md:p-4 lg:p-8 flex flex-col items-center = gap-4">
          <h2 className="text-base md:text-xl lg:text-2xl text-white font-semibold">
            Technologies I Work With
          </h2>

          <p className="text-white/70 text-[0.8rem] sm:text-xs  md:text-sm text-center">
            A collection of tools, frameworks, and platforms I use to build
            fast, scalable, and production-ready applications across frontend,
            backend, and cloud.
          </p>

          <ul
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 
               gap-y-4 gap-x-6 mt-8 
               text-center text-white/80 text-sm md:text-base w-full"
          >
            {/* Core */}
            <li>React</li>
            <li>Node.js</li>
            <li>Tailwind CSS</li>

            <li>Express.js</li>
            <li>JavaScript</li>
            <li>jQuery</li>

            {/* Backend + DB */}
            <li>MongoDB</li>
            <li>PostgreSQL</li>
            <li>Supabase</li>

            {/* DevOps + Cloud */}
            <li>AWS</li>
            <li>Jenkins</li>
            <li>Docker</li>

            {/* Templating */}
            <li>EJS</li>
            <li>REST APIs</li>
            <li>Git / GitHub</li>
          </ul>
        </div>
        <div>
          {" "}
          <Contact />
        </div>
      </div>
      <footer
        className=" bg-[linear-gradient(90deg,#E9B0FF_0%,#4D84FA_100%)] text-white py-6 px-4 font-inter"
        id="footer"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-200 text-center md:text-left">
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
              <img src={github} alt="GitHub" className="w-5 h-5" />
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
    </>
  );
}

export default Footer;
