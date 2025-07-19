import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project";
import Skill from "./components/Skill";
import Certificate from "./components/Certificate";
import Activity from "./components/Activity";
import Contact from "./components/Contact";
import Layout from "./layouts/layout";

function App() {
  return (
    <Layout>
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
