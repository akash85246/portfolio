import { Link, animateScroll as scroll } from "react-scroll";
import { useState } from "react";

export default function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-10 flex justify-center md:px-32 sm:px-20 px-16 bg-black ">
      <div className="text-white flex bg-slate-500 py-3 px-10 mt-0.5 justify-between rounded-3xl sm:text-xl sm:font-semibold xl:h-14 sm:h-16 text-xs h-10 w-full items-center">
        <section
          className="xl:text-3xl xl:text-left xl:mx-0 w-full md:text-4xl sm:text-3xl text-xl flex xl:justify-between justify-center items-center"
          style={{ fontFamily: "Fleur De Leah", fontStyle: "cursive" }}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="decoration-dashed underline  items-center cursor-pointer"
          >
            Portfolio
          </Link>
        </section>

        <section className="relative xl:p-0 xl:bg-slate-500 xl:mx-0 xl:left-0 xl:h-auto xl:w-auto xl:top-0 xl:shadow-none lg:left-36 md:left-36 bg-slate-300 sm:p-7 p-2  rounded-full sm:left-32 sm:h-20 sm:w-20 h-10 w-10 left-24  z-10 shadow-slate-700 shadow-xl ">
          <div className="xl:hidden z-20">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {!isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          <div
            className={`xl:flex items-center  ${
              isMenuOpen
                ? "flex xl:flex-row xl:bg-slate-500 xl:p-0 xl:ml-0 xl:mt-0  flex-col bg-slate-200 p-14 py-5 md:-ml-60 -ml-24 mt-2 rounded-2xl  md:gap-4 gap-1 bg-opacity-50 backdrop-blur-md "
                : "hidden"
            }`}
          >
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white xl:px-2 xl:py-0.5 xl:bg-slate-500 hover:bg-slate-400 rounded-full transition-colors xl:w-24 text-center xl:text-xl md:text-2xl sm:text-xl text-lg md:p-4 sm:p-3 p-2 hover:underline hover:decoration-double hover:bg-opacity-50"
            >
              Home
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white xl:px-2 xl:py-0.5 xl:bg-slate-500 hover:bg-slate-400 rounded-full transition-colors xl:w-24 text-center xl:text-xl md:text-2xl sm:text-xl text-lg md:p-4 sm:p-3 p-2 hover:underline hover:decoration-double hover:bg-opacity-50"
            >
              About
            </Link>
            <Link
              to="education"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white xl:px-2 xl:py-0.5 xl:bg-slate-500 hover:bg-slate-400 rounded-full transition-colors xl:w-32 text-center xl:text-xl md:text-2xl sm:text-xl text-lg md:p-4 sm:p-3 p-2 hover:underline hover:decoration-double hover:bg-opacity-50"
            >
              Education
            </Link>
            <Link
              to="skill"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white xl:px-2 xl:py-0.5 xl:bg-slate-500 hover:bg-slate-400 rounded-full transition-colors xl:w-24 text-center xl:text-xl md:text-2xl sm:text-xl text-lg md:p-4 sm:p-3 p-2 hover:underline hover:decoration-double hover:bg-opacity-50"
            >
              Skills
            </Link>
            <Link
              to="work"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white xl:px-2 xl:py-0.5 xl:bg-slate-500 hover:bg-slate-400 rounded-full transition-colors xl:w-24 text-center xl:text-xl md:text-2xl sm:text-xl text-lg md:p-4 sm:p-3 p-2 hover:underline hover:decoration-double hover:bg-opacity-50"
            >
              Work
            </Link>
            <Link
              to="resume"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white xl:px-2 xl:py-0.5 xl:bg-slate-500 hover:bg-slate-400 rounded-full transition-colors xl:w-24 text-center xl:text-xl md:text-2xl sm:text-xl text-lg md:p-4 sm:p-3 p-2 hover:underline hover:decoration-double hover:bg-opacity-50"
            >
              Resume
            </Link>
            <Link
              to="service"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white xl:px-2 xl:py-0.5 xl:bg-slate-500 hover:bg-slate-400 rounded-full transition-colors xl:w-24 text-center xl:text-xl md:text-2xl sm:text-xl text-lg md:p-4 sm:p-3 p-2 hover:underline hover:decoration-double hover:bg-opacity-50"
            >
              Service
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="text-white xl:px-2 xl:py-0.5 xl:bg-slate-500 hover:bg-slate-400 rounded-full transition-colors xl:w-24 text-center xl:text-xl md:text-2xl sm:text-xl text-lg md:p-4 sm:p-3 p-2 hover:underline hover:decoration-double hover:bg-opacity-50"
            >
              Contact
            </Link>
          </div>
        </section>
      </div>
    </nav>
  );
}
