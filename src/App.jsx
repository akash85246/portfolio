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
  return (
    <Layout>
      <div
        className={`fixed top-16 -right-96 w-[90vw] h-full -z-10 pointer-events-none transition-opacity duration-300 `}
        id="robot-canvas"
      >
        <SpiderController key="spider1" />
      </div>

      <Home />

      <About />

      <Project />
      <Skill />
      <Certificate />
      <Activity />
      <Contact />
    </Layout>
  );
}

export default App;
