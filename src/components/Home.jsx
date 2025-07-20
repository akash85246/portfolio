import SpiderController from "./SpiderController";
import RobotModel from "./RobotModel";




function Home() {
  return (
    <section className="relative !h-[90vh] text-white p-l-16">
      {/* Vertical Side Social Links */}
      <div className="absolute left-12 top-2/3 transform -translate-y-1/2 flex flex-col !gap-70">
        <a href="https://github.com/akash85246" className="transform -rotate-90 origin-left tracking-widest !text-xl font-bold">
          GITHUB
        </a>
        <a href="https://www.linkedin.com/in/akash-rajput-dev/" className="transform -rotate-90 origin-left tracking-widest !text-xl font-bold">
          LINKEDIN
        </a>
      </div>

      {/* Main Content */}
      <div className="ml-28 flex flex-col justify-around h-full text-center">
        <div className="flex flex-col items-start justify-center font-orbitron">
          <h1 className="text-5xl md:text-8xl font-extrabold text-cyan-400 text-center w-full font-orbitron orbitron">
            Hi, I'm Akash Rajput
          </h1>
          <p className="text-md md:text-xl mt-4 text-gray-300 text-center w-full">
            Aspiring Software Developer | Full Stack Enthusiast | AI Learner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="flex flex-col items-center justify-center text-center h-full gap-16">
            <div className="mt-12 text-left text-[#DC143C] text-3xl font-semibold space-y-2">
              <p>PART HUMAN, PART MACHINE </p>
              <p>FULLY PASSIONATE ABOUT BUILDING.</p>
              <p>TURNING SPARKS OF IDEAS</p>
              <p>INTO DIGITAL REALITIES.</p>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 pr-20 w-full  text-center orbitron">
              <div>
                <p className="text-7xl font-bold">12K</p>
                <p className="text-lg font-semibold">VIEWS</p>
              </div>
              <div>
                <p className="text-7xl font-bold">40+</p>
                <p className="text-lg font-semibold">COMMITS</p>
              </div>
            </div>
          </div>
          <div
            className="absolute -right-60 top-5 w-[70vw] h-full -z-10"
            id="robot-canvas"
          >
            <SpiderController />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
