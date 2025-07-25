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
        className={`fixed top-8 sm:-top-16 md:top-0 lg:top-16 -right-32 sm:-right-52   md:-right-80 lg:-right-96 w-[100vw] md:w-[60rem] lg:w-[90vw] h-full sm:h-[80vh] md:h-full -z-10 pointer-events-none transition-opacity duration-300 `}
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
