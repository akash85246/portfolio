import React, { useEffect, useRef, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project";
import Skill from "./components/Skill";
import Certificate from "./components/Certificate";
import Activity from "./components/Activity";
import Contact from "./components/Contact";
import Layout from "./layouts/layout";
import SpiderController from "./components/SpiderController";

function App() {
  const [showSpider, setShowSpider] = useState(true);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);

  const isInViewport = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      const homeVisible = isInViewport(homeRef.current);
      const aboutVisible = isInViewport(aboutRef.current);
      setShowSpider(homeVisible || aboutVisible);
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <div className="relative">
        {/* Always render the SpiderController to avoid WebGL context loss */}
        <div
          className={`fixed top-20 -right-96 w-[90vw] h-full -z-10 pointer-events-none transition-opacity duration-300 ${
            showSpider ? "opacity-100" : "opacity-0"
          }`}
          id="robot-canvas"
        >
          <SpiderController key="spider1" />
        </div>

        <div className="relative z-10">
          <div ref={homeRef}>
            <Home />
          </div>
          <div ref={aboutRef}>
            <About />
          </div>
        </div>
      </div>

      {/* Rest of the content */}
      <Project />
      <Skill />
      <Certificate />
      <Activity />
      <Contact />
    </Layout>
  );
}

export default App;